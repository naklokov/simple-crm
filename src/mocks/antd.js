jest.mock("antd", () => {
  const antd = jest.requireActual("antd");

  const message = {
    error: jest.fn(),
  };

  return {
    ...antd,
    message,
  };
});
