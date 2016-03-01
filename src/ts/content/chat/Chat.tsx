/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import * as events from '../../core/events';
import ChatSession from './ChatSession';
import ChatRoomInfo from './ChatRoomInfo';
import { ChatMessage, chatType } from './ChatMessage';
import SlashCommand from './SlashCommand';
import RoomId from './RoomId';

import Info from './Info';
import Content from './Content';

export interface ChatState {
  chat: ChatSession;
  now: number;
}

export interface ChatProps {
  hideChat: () => void;
}

class Chat extends React.Component<ChatProps, ChatState> {
  public name = 'chat';
  _eventHandlers: any[] = [];
  constructor(props: ChatProps) {
    super(props);
    this.state = this.initialState();

    // handle updates to chat session
    this._eventHandlers.push(events.on('chat-session-update', this.update));
  }
  
  initialState(): ChatState {
    return {
      chat: (window as any)['_cse_chat_session'] || new ChatSession(),
      now: 0
    }
  }

  // Get current tab
  getCurrentRoom = () : ChatRoomInfo => {
    return this.state.chat.getRoom(this.state.chat.currentRoom);
  }

  // Send a message to the current room, named room (not implemented) or user (not implemneted)
  send = (roomId: RoomId, text: string) : void => {
    switch (roomId.type) {
      case chatType.GROUP:
        this.state.chat.send(text, roomId.name);
        break;
      case chatType.PRIVATE:
        this.state.chat.sendMessage(text, roomId.name);
        break;
    } 
  }

  update = (chat : ChatSession) : void => {
    this.setState({ chat: chat, now: Date.now() } as any);
  }

  selectRoom = (roomId: RoomId) : void => {
    this.state.chat.joinRoom(roomId);
  }

  leaveRoom = (roomId: RoomId) : void => {
    this.state.chat.leaveRoom(roomId);
  }

  slashCommand = (command: string) : boolean => {
    const cmd = new SlashCommand(command);
    return cmd.exec(this.state.chat);
  }

  close = () : void => {
    (window as any)["_cse_chat_session"] = this.state.chat;
    this.props.hideChat();
  }
  
  disconnect = () : void => {
    this.state.chat.simulateDisconnect();
  }
  
  componentWillMount() : void {
    // hook up to chat 
    this.state.chat.connect();
  }
  componentDidMount() : void {
    if (!this.state.chat.currentRoom) {
      const roomId = new RoomId('_modsquad', chatType.GROUP);
      this.state.chat.setCurrentRoom(roomId);
    }
  }

  componentWillUnmount() {
    this._eventHandlers.forEach((value: any) => {
      events.off(value);
    });
  }

  // Render chat
  render() {
    return (
      <div id={this.name} className="cse-chat chat-container no-select">
        <div className="chat-disconnect" onClick={this.disconnect}>{this.state.chat.latency}</div>
        <div className="chat-frame">
          <Info
            chat={this.state.chat} 
            currentRoom={this.state.chat.currentRoom} 
            selectRoom={this.selectRoom}
            leaveRoom={this.leaveRoom}
            />
          <Content
            currentRoom={this.state.chat.currentRoom}
            messages={this.state.chat.currentRoom ? this.getCurrentRoom().messages : undefined}
            send={this.send}
            slashCommand={this.slashCommand}
            />
        </div>
        <div className="chat-close" onClick={this.close}></div>
      </div>
    );
  }
}

export default Chat;
