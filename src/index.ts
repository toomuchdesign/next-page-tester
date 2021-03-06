export * from './pure';

import { initTestHelpers } from './pure';

// if we're running in a test runner that supports afterEach
// then we'll automatically init test helpers and run cleanup afterEach test
// this ensures that tests run in isolation from each other
// if you don't like this then either import the `pure` module
// or set the NPT_SKIP_AUTO_SETUP env variable to 'true'.
if (!process.env.NPT_SKIP_AUTO_SETUP) {
  initTestHelpers();
}
