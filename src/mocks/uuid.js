jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => "1"),
  };
});
