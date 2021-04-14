import uuid from "uuid";

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("1"),
}));

beforeEach(() => {
  jest.spyOn(uuid, "v4").mockReturnValue("1");
});
