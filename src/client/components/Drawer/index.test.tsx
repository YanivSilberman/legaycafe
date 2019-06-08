import * as React from 'react';
import * as ReactShallowRenderer from 'react-test-renderer/shallow'
import Component from './index';

describe('Drawer component test',() => {
  it('component loads', () => {
    const renderer = ReactShallowRenderer.createRenderer();

    const User = {
      _id:"id",
      avatar:"",
      firstName:"",
      lastName:""
    }

    expect(renderer.render(
      <Component
        allUsers={[]}
        {...User}
      />
    )).toMatchSnapshot()
  })
});
