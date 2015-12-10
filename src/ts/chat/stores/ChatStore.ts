/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import ChatActions from '../actions/ChatActions';
import CSEChat from '../util/CSEChat';
import Config from '../util/Config';
import * as React from 'react';
import * as Reflux from 'reflux';
import messageType from '../constants/messageType';

const ChatStore : any = Reflux.createStore({
  name: 'ChatStore',
  chat: <CSEChat> null,
  connected: false,
  updated: 0,
  errorListener: null,

  listenables: [ ChatActions ],

  // ChatAction.connect(...)
  onConnect: function(
    username:string|(()=>string), 
    password:string|(()=>string), 
    nick:string, 
    rooms:string[] = [ '_global', '_it', '_modsquad' ])
  {
    this.connected = false;
    this.updated = 0;
    this.config = new Config(username, password, nick);

    this.connect(rooms);
  },

  connect: function(rooms: string[]) {

    if (this.chat) {
      console.warn("ChatActions.connect() called when already connected.");
      return;
    }

    this.chat = new CSEChat(this.config);

    this.errorListener = this.chat.on('error', (err:any) => {
      const connected: boolean = this.connected;
      this.onConnectError(err);
      if (!connected) {
        // if not connected when we got the error, connect failed
        ChatActions.connect.failed(err);
      } else {
        // if connected when got the error, signal we were disconnected
        ChatActions.connect.disconnected();
      }
    });

    this.chat.once('online', () => {
      ChatActions.connect.completed(this.chat);
      this.connected = true;
      this._initializeEvents();
      rooms.forEach((room:string) => {
        this.chat.joinRoom(room + this.config.serviceAddress);
      });
    });

    this.chat.connect();
  },

  onConnectReconnect: function(rooms: string[]) {
    this.connect(rooms);
  },

  onConnectDisconnect: function() {
    if (this.chat) {
      this.chat.removeListener(this.errorListener);
      this.chat.disconnect();
      this.chat = null;
    }
    this.connected = false;
  },

  // ChatAction.sendMessageToRoom(...)
  onSendMessageToRoom: function(message:string, roomName:string) {
    if (!this.chat || !this.connected) {
      console.warn("ChatActions.sendMessageToRoom() called when not connected.");
      return;
    }
    this.chat.sendMessageToRoom(message,roomName);
  },

  // ChatAction.sendMessageToUser(...)
  onSendMessageToUser: function(message:string, userName:string) {
    if (!this.chat || !this.connected) {
      console.warn("ChatActions.sendMessageToUser() called when not connected.");
      return;
    }
    this.chat.sendMessageToUser(message,userName);
  },

  onJoinRoom: function(roomName: string) {
    if (!this.chat) {
      console.warn("ChatActions.joinRoom() called when not connected.");
      return;
    }
    this.chat.joinRoom(roomName + this.chat.config.serviceAddress);
  },

  onLeaveRoom: function(roomName: string) {
    if (!this.chat) {
      console.warn("ChatActions.leaveRoom() called when not connected.");
      return;
    }
    this.chat.leaveRoom(roomName + this.chat.config.serviceAddress);
  },

  onConnectError: function(error:string) {
    this.onConnectDisconnect();
  },

  _trigger: function(message:any) {
    this.trigger(message);
    this.updated = Date.now();
  },

  _initializeEvents: function() {
    
    this.chat.on('presence', (presence:any) => {
      this._trigger(presence);
    });

    this.chat.on('message', (message:any) => {
      this._trigger(message);
    });

    this.chat.on('groupmessage', (message:any) => {
      this._trigger(message);
    });

    this.chat.on('ping', (ping:any) => {
      ChatActions.ping(ping);
    });
  }
});

export default ChatStore;
