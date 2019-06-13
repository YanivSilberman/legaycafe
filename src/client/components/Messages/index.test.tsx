import * as React from 'react';
import * as ReactShallowRenderer from 'react-test-renderer/shallow'
import Component from './index';

describe('Messages component test',() => {
  const renderer = ReactShallowRenderer.createRenderer();

  it('component loads', () => {
    expect(renderer.render(
      <Component
        messages={[]}
        usersTyping={[]}
        subscribeToNewMessages={() => null}
        isMoreMessages={false}
        moreMessages={() => null}
        loading={false}
        userId="test"
        client={{}}
        users={{}}
        classes={{}}
        chat="chat"
      />
    )).toMatchSnapshot()
  })
});
