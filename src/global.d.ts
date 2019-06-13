interface User {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface Message {
  _id: string;
  text: string;
  createdAt: string;
  user: string;
}

interface Chat {
  _id: string;
  users: string;
}

declare module "draft-js-plugins-editor" {
  export type PluginsEditorProps = Draft.EditorProps | {
    plugins: any,
  }

  export default class PluginsEditor
    extends React.Component<PluginsEditorProps, Draft.EditorState> {}
  export function createEditorStateWithText(text: string): PluginsEditor;
  export function composeDecorators(...func: any[]): (...args: any[]) => any;
}

declare module "draft-js-emoji-plugin" {
  function createEmojiPlugin(config?: object): any;
  export type EmojiSuggestions = any;
  export default createEmojiPlugin;
}

declare module "*.css" {
  const styles: { [className: string]: string };
  export default styles;
}
