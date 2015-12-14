/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import { chatType, ChatMessage } from './ChatMessage';
import * as events from '../../core/events';
import URLRegExp from './URLRegExp';

export interface ChatLineState {
}

export interface ChatLineProps {
  message: ChatMessage;
  key: number;
}

export default class ChatLine extends React.Component<ChatLineProps, ChatLineState> {
  constructor(props: ChatLineProps) {
    super(props);
  }
  fixupLink(url: string) : string {
    if (url.startsWith('www.')) {
      url = 'http://' + url;
    }
    return url;
  }
  makeLinks(text: string) : JSX.Element[] {
    const re: RegExp = URLRegExp.create();
    const html: JSX.Element[] = [];
    let next: number = 0;
    let match: RegExpExecArray;
    let key: number = 0;
    for (match = re.exec(text); match; match = re.exec(text)) {
      if (match.index > next) {
        html.push(<span key={key++} className="chat-line-message">{text.substr(next, match.index - next)}</span>);
      }
      html.push(<a key={key++} className="chat-line-message" target="_blank" href={this.fixupLink(match[0])}>{match[0]}</a>);
      next = match.index + match[0].length;
    }
    if (next < text.length) {
      html.push(<span key={key++} className="chat-line-message">{text.substr(next)}</span>);
    }
    return html;
  }
  render() {
    let element: any;
    switch(this.props.message.type) {
      case chatType.AVAILABLE:
        element = (
          <div className="chat-line">
            <span className="chat-line-entry">{this.props.message.nick} entered the room</span>
          </div>
        );
        break;
      case chatType.UNAVAILABLE:
        element = (
          <div className="chat-line">
            <span className="chat-line-exit">{this.props.message.nick} left the room</span>
          </div>
        );
        break;
      case chatType.GROUP:
        element = (
          <div className="chat-line">
            <span className="chat-line-nick" onClick={this.PM.bind(this)}>{this.props.message.nick}:</span>
            {this.makeLinks(this.props.message.text)}
          </div>
        );
        break;
      case chatType.PRIVATE:
        element = (
          <div className="chat-line chat-private">
            <span className="chat-line-nick">{this.props.message.nick}:</span>
            {this.makeLinks(this.props.message.text)}
          </div>
        );
        break;
      case chatType.SYSTEM:
      case chatType.BROADCAST:
        element = (
          <div className="chat-line">
            <span className="chat-line-system">{this.props.message.text}</span>
          </div>
        );
        break;
      default:
        element = (
          <div className="chat-line">
            <span className="chat-line-system">[ Unrecognised chat message type ]</span>
            <span className="chat-line-message">{JSON.stringify(this.props.message)}</span>
          </div>
        );
    }
    return element;
  }
  PM() : void {
    events.fire('cse-chat-private-message', this.props.message.nick);
  }
}
