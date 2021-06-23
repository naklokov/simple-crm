import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchDictionary } from "../fetch";

const mock = new MockAdapter(axios);

test("fetchDictionary", async () => {
  const dispatch = jest.fn();

  const data = "profilesData";
  const name = "profile";
  const url = "/profiles";

  mock.onGet(url).reply(200, data);

  await fetchDictionary(url, name, dispatch);

  expect(dispatch).toHaveBeenCalledWith({
    payload: {
      data,
      name,
    },
    type: "app/setDictionaries",
  });
});
