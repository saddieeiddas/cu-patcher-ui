/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import ChatLine from './ChatLine';
import User, {UserInfo} from './User';
import {ChatMessage, chatType} from './ChatMessage';
import {chatConfig} from './ChatConfig';
import RoomId from './RoomId';

class ChatRoomInfo {
  messages: JSX.Element[] = [];
  users: JSX.Element[] = [];
  key: number = 0;
  roomId: RoomId;
  type: chatType;
  players: number = 0;
  unread: number = 0;
  scrollback: number = 0;
  scrollbackPageSize: number;
  scrollbackThreshold: number;
  constructor(roomId: RoomId, scrollbackThreshold: number = 50, scrollbackPageSize: number = 50) {
    this.roomId = roomId;
    this.scrollbackThreshold = scrollbackThreshold;
    this.scrollbackPageSize = scrollbackPageSize;
  }
  public addUser(user: UserInfo) : void {
    this.users.push(<User key={this.key++} info={user}/>);
    this.players ++;
  }
  public removeUser(user: UserInfo) : void {
    const users: JSX.Element[] = this.users;
    for (let i = 0; i < users.length; i++) {
      if (users[i].props.info.name === user.name) {
        users.splice(i,1);
        this.players --;
        break;
      }
    }
  }
  public add(message: ChatMessage) : void {
    this.messages.push(
      <ChatLine key={this.key++} message={message}/>
    );
    message.checkIsNewDay(this.messages.length > 1 ? this.messages[this.messages.length - 2].props.message.when : undefined);
    // manage scrollback buffer size
    if (this.messages.length > chatConfig.SCROLLBACK_BUFFER_SIZE) {
      this.messages.shift();
    }
  }
  public push(message: ChatMessage) : void {
    this.add(message);
    this.unread ++;
  }
  public seen() : void {
    this.unread = 0;
  }
  public startScrollback() : void {
    if (this.messages.length > this.scrollbackThreshold) { 
      this.scrollback = this.messages.length - this.scrollbackThreshold;
    } else {
      this.scrollback = 0;
    }
  }
  public cancelScrollback() : void {
    this.scrollback = 0;
  }
  public nextScrollbackPage() : void {
    if (this.scrollbackPageSize > this.scrollback) {
      this.cancelScrollback();
    } else {
      this.scrollback -= this.scrollbackPageSize;
    }
  }
}

export default ChatRoomInfo;
