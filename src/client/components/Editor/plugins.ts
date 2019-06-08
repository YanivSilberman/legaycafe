// All used plugins

import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js-linkify-plugin/lib/plugin.css';

import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';

export const linkifyPlugin = createLinkifyPlugin();
export const emojiPlugin = createEmojiPlugin();

export default [
  linkifyPlugin,
  emojiPlugin
];
