import React from 'react'
import renderer from 'react-test-renderer';
import { Error } from '..';

const message = 'Ошибочка'

test('render correct 500', () => {
    const component = renderer.create(<Error />);
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})

test('render correct 400', () => {
    const component = renderer.create(
        <Error
            code={400}
            message={message}
        />
    );
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})

test('render correct 404', () => {
    const component = renderer.create(
        <Error
            code={404}
            message={message}
        />
    );
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})