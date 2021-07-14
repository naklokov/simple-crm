import { ColumnProps } from "../../../../constants";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchDictionary } from "../fetch";

const mock = new MockAdapter(axios);

test("fetchDictionary", async () => {
  const dispatch = jest.fn();
  mock.onGet("/profiles").reply(200, "profilesData");

  await fetchDictionary("/profiles", "profile", dispatch);

  expect(dispatch).toHaveBeenCalledWith({
    payload: {
      profile: "profilesData",
    },
    type: "app/setDictionaries",
  });
});
