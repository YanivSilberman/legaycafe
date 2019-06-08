import * as React from 'react';
import * as ReactShallowRenderer from 'react-test-renderer/shallow'
import Component from './index';

describe('Editor component test',() => {
  const renderer = ReactShallowRenderer.createRenderer();

  it('component loads for editing', () => {
    expect(renderer.render(
      <Component
        editorState={{}}
        setEditorState={() => null}
        onFocus={() => null}
        onBlur={() => null}
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
