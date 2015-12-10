/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import * as events from '../../core/events';
import { UserInfo } from './User';

export interface ChatInputState {
}
export interface ChatInputProps {
  label: string;
  send: (text: string) => void;
  slashCommand: (command: string) => void;
}

class ChatInput extends React.Component<ChatInputProps, ChatInputState> {
  _privateMessageHandler : any;
  constructor(props: ChatInputProps) {
    super(props);
    this._privateMessageHandler = events.on('cse-chat-private-message', (name: string) => {
      this.privateMessage(name);
    });
    this.enterToSend = this.enterToSend.bind(this);
  }
  componentWillUnmount() {
    if (this._privateMessageHandler) {
      events.off(this._privateMessageHandler);
    }
  }
  getInputNode() : any {
    return React.findDOMNode(this.refs['new-text'])
  }
  render() {
    return (
      <div className="chat-input input-field">
        <label htmlFor="chat-text">Say something!</label>
        <input id="chat-text" ref="new-text" onKeyUp={this.enterToSend} type="text"/>
      </div>
    );
  }
  enterToSend(e:any) : void {
    if (e.keyCode === 13) {
      this.send();
    }
  }
  send() : void {
    const input : any = this.getInputNode();
    const value: string = input.value.trim();
    if (value[0] === '/') {
      this.props.slashCommand(value.substr(1));
    } else {
      this.props.send(value);
    }
    input.value = '';
    input.focus();
  }
  privateMessage(name: string) : void {
    const input: any = this.getInputNode();
    input.value = '/w ' + name + ' ';
    input.focus();
  }
}

export default ChatInput;
