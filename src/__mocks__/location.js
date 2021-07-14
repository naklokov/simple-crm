const oldWindowLocation = window.location;

delete window.location;

window.location = Object.defineProperties(
  {},
  {
    ...Object.getOwnPropertyDescriptors(oldWindowLocation),
    assign: {
      configurable: true,
      value: jest.fn(),
    },
  }
);
