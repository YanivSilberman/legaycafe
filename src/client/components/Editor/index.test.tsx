import * as React from 'react';
import * as ReactShallowRenderer from 'react-test-renderer/shallow'
import Component from './index';

const defaultProps = {
  editorState: {},
  setEditorState: () => null,
  onFocus: () => null,
  onBlur: () => null,
  readOnly: false,
  text: "test",
  classes: {}
}

describe('Editor component test',() => {
  const renderer = ReactShallowRenderer.createRenderer();

  it('component loads for editing', () => {
    expect(renderer.render(
      <Component
        {...defaultProps}
      />
    )).toMatchSnapshot()
  })

  it('component loads read only', () => {
    expect(renderer.render(
      <Component
        readOnly
        text="test 123"
      />
    )).toMatchSnapshot()
  })

});
