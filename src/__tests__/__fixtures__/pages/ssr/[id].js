import { sleep } from '../../../../utils';

export default function ssr_$id$(props) {
  return `/ssr/[id] - props: ${props}`;
}

export async function getServerSideProps({ query, params }) {
  await sleep(1);
  return {
    props: {
      query,
      params,
    },
  };
}
