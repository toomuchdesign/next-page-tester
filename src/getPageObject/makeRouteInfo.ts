import {
  extractPagePathParamsType,
  ROUTE_PARAMS_TYPES,
} from './pagePathParser';
import { parseRoute, parseQueryString, stringifyQueryString } from '../utils';
import type { PageParams, RouteInfo } from '../commonTypes';

export function makeRouteInfo({
  route,
  pagePath,
  routeRegexCaptureGroups,
}: {
  route: string;
  pagePath: string;
  routeRegexCaptureGroups?: Record<string, string>;
}): RouteInfo {
  const { urlObject, detectedLocale } = parseRoute({ route });
  const { pathname, search } = urlObject;
  const params = makeParamsObject({
    pagePath,
    routeRegexCaptureGroups,
  });
  const query = parseQueryString({ queryString: search });

  return {
    route,
    params,
    query,
    pagePath,
    resolvedUrl:
      pathname +
      stringifyQueryString({
        object: { ...params, ...query },
        leadingQuestionMark: true,
      }),
    detectedLocale,
    urlObject,
  };
}

function makeParamsObject({
  pagePath,
  routeRegexCaptureGroups,
}: {
  pagePath: string;
  routeRegexCaptureGroups?: Record<string, string>;
}) {
  const params = {} as PageParams;
  const pagePathParams = extractPagePathParamsType({
    pagePath,
  });

  if (routeRegexCaptureGroups) {
    for (const [key, value] of Object.entries(routeRegexCaptureGroups)) {
      if (value !== undefined) {
        const paramType = pagePathParams[key];
        if (
          paramType === ROUTE_PARAMS_TYPES.CATCH_ALL ||
          paramType === ROUTE_PARAMS_TYPES.OPTIONAL_CATCH_ALL
        ) {
          params[key] = value.split('/');
        } else {
          params[key] = value;
        }
      }
    }
  }
  return params;
}
