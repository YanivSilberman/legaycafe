import 'jsdom-global/register';
import * as React from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { MockedProvider } from 'react-apollo/test-utils';
import * as ReactRenderer from 'react-test-renderer';
import * as ReactShallowRenderer from 'react-test-renderer/shallow';
import * as chai from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import jsdom from 'jsdom';
import wait from 'waait';

import Component from './index';
import { createMessageGql, toggleUserTypingGql } from '../../store/gql/mutations';

const defaultProps = {
  isEmpty: false,
  userId:"userid",
  toggleUserTypingMutation: () => null,
  classes: {},
  chat: "chat123"
}

const editorState = EditorState.createWithContent(ContentState.createFromText('Hello'))

const mocks = [
  {
    request: {
      query: createMessageGql,
      variables: {
        userId: "userid",
        text: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        chat: "chat123"
      },
    },
    result: {
      data: {
        createMessage: {
          __typename: "Message",
          _id: 'msg123',
          text: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        },
      },
    },
  }
];


describe('ChatFooter component test',() => {
  it('component loads', () => {
    const renderer = ReactShallowRenderer.createRenderer();

    expect(renderer.render(
      <Component {...defaultProps} />
    )).toMatchSnapshot()
  })

  it('Disabled on click', async () => {
    const wrapper = mount((
      <MockedProvider mocks={mocks}>
        <Component {...defaultProps} />
      </MockedProvider>
    ));

    wrapper.setState({
      editorState: EditorState.createWithContent(ContentState.createFromText('Hello'))
    });

    await wait(0);
    wrapper.find('button').simulate('click');

    await wait(0);
    chai.expect(wrapper.find('button').props().disabled).to.equal(true);
  })
});
