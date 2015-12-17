/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import * as events from '../../core/events';
import Chat from './Chat';

export class ChatWindowState {
  visible: boolean;
  closing: boolean;
}

export class ChatWindowProps {
}

class ChatWindow extends React.Component<ChatWindowProps, ChatWindowState> {
  constructor(props: ChatWindowProps) {
    super(props);
    this.state = this.initState();
    this.hideChat = this.hideChat.bind(this);
  }

  initState() : ChatWindowState {
    return { visible: false, closing: false };
  }

  componentDidMount() {
    events.on('show-chat', () => {
      this.setState({ visible: true } as any);
    });    
  }

  // Render chat container
  render() {
    const classes : string[] = [ ];
    if (this.state.visible) {
      classes.push('animated', this.state.closing ? 'bounceOutRight' : 'bounceInRight');
    }
    classes.push(this.state.visible ? 'chat-visible' : 'chat-hidden');
    return (
      <div id="chat-window" className={ classes.join(' ') }>
        { this.state.visible ? <Chat hideChat={ this.hideChat } /> : undefined }
      </div>
    );
  }

  hideChat() : void {
    this.setState({ closing: true } as any);  // trigger closing animation
    setTimeout(() => {
      // close complete, now invisible
      this.setState({ closing: false, visible: false });
    },500);
  }
}

export default ChatWindow;
