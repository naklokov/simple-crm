import { noop } from "lodash";
import { LinksType } from "../../../../constants";
import { getFetchParams, getMappedOptions, isScrollBottom } from "../utils";

test("getMappedOptions", () => {
  const rows = [
    {
      id: 1,
      title: "First",
    },
    {
      id: 2,
      title: "Second",
    },
  ];

  expect(getMappedOptions(rows, "id", "title")).toEqual([
    { label: 1, value: "First" },
    { label: 2, value: "Second" },
  ]);

  expect(getMappedOptions([], "id", "title")).toEqual([]);
});

test("isScrollBottom false", () => {
  const scrollHeight = 500;

  const targetStub = {
    currentTarget: {
      scrollTop: 0,
      offsetHeight: 200,
      scrollHeight,
      addEventListener: noop,
      dispatchEvent: () => true,
      removeEventListener: noop,
    },
  } as any;

  expect(isScrollBottom(targetStub)).toBe(false);
});

test("isScrollBottom on border", () => {
  const scrollHeight = 500;

  const targetStub = {
    currentTarget: {
      scrollTop: 0,
      offsetHeight: 350,
      scrollHeight,
      addEventListener: noop,
      dispatchEvent: () => true,
      removeEventListener: noop,
    },
  } as any;

  expect(isScrollBottom(targetStub)).toBe(true);
});

test("isScrollBottom true", () => {
  const scrollHeight = 500;

  const targetStub = {
    currentTarget: {
      scrollTop: 0,
      offsetHeight: 400,
      scrollHeight,
      addEventListener: noop,
      dispatchEvent: () => true,
      removeEventListener: noop,
    },
  } as any;

  expect(isScrollBottom(targetStub)).toBe(true);
});

test("getFetchParams filled", () => {
  const links = {
    self: {
      href: "/url?query=123&param=2",
    },
  } as LinksType;

  const titleField = "id";
  const searched = "sss";

  expect(getFetchParams(searched, titleField, links)).toEqual({
    url: "/url",
    query: 'entityData=JLIKE=(id,"%sss%");123',
    params: {
      param: "2",
    },
  });
});

test("getFetchParams without search in query", () => {
  const links = {
    self: {
      href: "/url?query=123&param=2",
    },
  } as LinksType;

  const titleField = "id";
  const searched = "";

  expect(getFetchParams(searched, titleField, links)).toEqual({
    url: "/url",
    query: "123",
    params: {
      param: "2",
    },
  });
});

test("getFetchParams without query", () => {
  const links = {
    self: {
      href: "/url?param=2",
    },
  } as LinksType;

  const titleField = "id";
  const searched = "";

  expect(getFetchParams(searched, titleField, links)).toEqual({
    url: "/url",
    query: "",
    params: {
      param: "2",
    },
  });
});

test("getFetchParams without query and params", () => {
  const links = {
    self: {
      href: "/url",
    },
  } as LinksType;

  const titleField = "id";
  const searched = "";

  expect(getFetchParams(searched, titleField, links)).toEqual({
    url: "/url",
    query: "",
    params: {},
  });
});
