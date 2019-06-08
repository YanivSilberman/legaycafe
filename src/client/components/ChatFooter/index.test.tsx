import * as React from 'react';
import * as ReactShallowRenderer from 'react-test-renderer/shallow'
import Component from './index';

describe('ChatFooter component test',() => {
  it('component loads', () => {
    const renderer = ReactShallowRenderer.createRenderer();

    expect(renderer.render(
      <Component
        setIsWaitingOnMessage={() => null}
        waitingOnMessage={false}
        userId={"1234"}
      />
    )).toMatchSnapshot()
  })
});
