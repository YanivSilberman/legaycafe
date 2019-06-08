import * as React from 'react';
import * as ReactShallowRenderer from 'react-test-renderer/shallow'
import Component from './index';

describe('ChatHeader component test',() => {
  it('component loads', () => {
    const renderer = ReactShallowRenderer.createRenderer();

    expect(renderer.render(
      <Component
        allUsers={[]}
      />
    )).toMatchSnapshot()
  })
});
