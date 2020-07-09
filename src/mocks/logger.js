export const logger = jest.fn();

export const info = jest.fn();
export const error = jest.fn();
export const warn = jest.fn();

const mock = jest.fn().mockImplementation(() => {
  return { info, error, warn };
});

export default mock;
