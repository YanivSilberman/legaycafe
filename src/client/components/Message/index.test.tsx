import * as React from 'react';
import * as ReactShallowRenderer from 'react-test-renderer/shallow'
import Component from './index';

describe('Message component test',() => {
  const renderer = ReactShallowRenderer.createRenderer();

  it('component loads', () => {
    const msg = {
      _id: "",
      text: "",
      user: "",
      createdAt: ""
    };

    expect(renderer.render(
      <Component
        index={1}
        userId="123"
        lastUser="345"
        avatar="123"
        classes={{}}
        {...msg}
      />
    )).toMatchSnapshot()
  })

});
