import * as React from 'react';
import * as ReactShallowRenderer from 'react-test-renderer/shallow'
import Component from './index';

describe('Messages component test',() => {
  const renderer = ReactShallowRenderer.createRenderer();

  it('component loads', () => {
    expect(renderer.render(
      <Component
        users={{}}
        userId="123"
        waitingOnMessage={false}
      />
    )).toMatchSnapshot()
  })
});
