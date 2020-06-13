import React from 'react';
import renderer from 'react-test-renderer';
import { App } from '..';

test('renders learn react link', () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON()

  expect(tree).toMatchSnapshot()
});


