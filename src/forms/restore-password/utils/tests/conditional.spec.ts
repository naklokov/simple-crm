import { checkToken } from "../conditional";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { urls } from "../../../../constants";
import * as logger from "../../../../utils/remote-logger";

const mock = new MockAdapter(axios);
test("check token success", async () => {
  const setLoadingSpy = jest.fn();
  mock.onPost(urls.restorePassword.check).reply(200, {});
  await checkToken("123", jest.fn(), setLoadingSpy);

  expect(setLoadingSpy).toHaveBeenNthCalledWith(1, true);
  expect(setLoadingSpy).toHaveBeenNthCalledWith(2, false);
});
