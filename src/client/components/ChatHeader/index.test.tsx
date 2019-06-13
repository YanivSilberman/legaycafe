import * as React from 'react';
import * as ReactShallowRenderer from 'react-test-renderer/shallow'
import Component from './index';

/*
selectUsers={[]}
classes={{}}
usersTyping={[]}
subscribeToUserTyping={() => null}
*/

describe('ChatHeader component test',() => {
  it('component loads', () => {
    const renderer = ReactShallowRenderer.createRenderer();

    expect(renderer.render(
      <Component
        chat="chat"
      />
    )).toMatchSnapshot()
  })

  // when typing, shows indicators
});
