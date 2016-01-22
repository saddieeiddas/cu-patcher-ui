/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as events from '../../core/events';
import { CSEChat, Config } from '../../chat/CSEChat';
import { ChatMessage, chatType } from './ChatMessage';
import { UserInfo } from './User';
import ChatRoomInfo from './ChatRoomInfo';
import RoomId from './RoomId';
import ChatActions from '../../chat/ChatActions';
import ChatStore from '../../chat/ChatStore';
import messageType from '../../chat/messageType';

class ChatSession {

  rooms: ChatRoomInfo[] = [];
  currentRoom: RoomId = undefined;
  reconnecting: boolean = false;
  connected: boolean = false;
  me: string = "me";
  latency: number;

  constructor() {
    ChatActions.connect.completed.listen(this.onconnect,this);
    ChatActions.connect.failed.listen(this.onconnectFail,this);
    ChatActions.connect.disconnected.listen(this.ondisconnected,this);
    ChatActions.ping.listen(this.onPing, this);
    ChatStore.listen(this.onchat.bind(this))
  }

  onPing(ping:any) {
    this.latency = (Date.now() - ping.now);
    events.fire('chat-session-update', this);
  }

  connect() {
    if (!this.connected) {
      ChatActions.connect(
        () => { return window.prompt('Username?'); },
        () => { return window.prompt('Password?'); }
      );      
    }
  }

  onconnect(chat: CSEChat) : void {
    // TODO: if no rooms yet, this won't work.
    this.me = chat.config.getNick();
    this.broadcast(new ChatMessage(chatType.SYSTEM, '', '', 'Connected to chat server.'));
    this.connected = true;
    this.reconnecting = false;
  }

  onconnectFail() {
    // if failed to connect and we are trying to re-connect, we should 
    // retry
    if (this.reconnecting) {
      // connectFail while reconnecting, try again
      this.reconnect();
    }
  }

  ondisconnected() {
    this.broadcast(new ChatMessage(chatType.SYSTEM, '', '', 'Disconnected from chat server.'));
    this.reconnect();
  }

  reconnect() {
    this.reconnecting = true;

    // Build list of rooms to re-connect to
    const rooms : string[] = [];
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].roomId.type === chatType.GROUP) {
        rooms.push(this.rooms[i].roomId.name);
        this.rooms[i].players = 0;
      }
    }
    // Reconnect in 1s
    setTimeout(() => { ChatActions.connect.reconnect(rooms); }, 10000);
  }

  simulateDisconnect() {
    ChatActions.connect.disconnect();
    ChatActions.connect.disconnected();
  }

  onchat(args: any) : void {
    console.log(JSON.stringify(args));
    switch(args.type) {
      case messageType.AVAILIBLE:
      case messageType.UNAVAILIBLE:
        this.presence(args.type, new UserInfo(args.roomName, args.sender.sender));
        break;
      case messageType.MESSAGE_CHAT:
      case messageType.MESSAGE_GROUP:
        this.recv(
          new ChatMessage(
            args.type === messageType.MESSAGE_CHAT ? chatType.PRIVATE : chatType.GROUP,
            args.roomName,
            args.sender.sender,
            args.message,
            args.time
          )
        );
        break;
      case messageType.NONE:
        this.recv(new ChatMessage(chatType.SYSTEM, '', '', 'Unrecognised message type ' + args.type));
        break;
    }
  }

  // Broadcast a message to all rooms
  broadcast(message: ChatMessage) : void {
    message.type = chatType.BROADCAST;
    // send message to current tab
    const rooms = this.rooms;
    if (rooms.length) {
      for (let i = 0; i < rooms.length; i++) {
        rooms[i].add(message);
      }
      events.fire('chat-session-update', this);
    } else {
      // TODO: What to do here?
      console.log(JSON.stringify(message));
    }
  }

  // Receive a message from a room or user.
  recv(message: ChatMessage) : void {
    // check for a broadcast message (private message sent by "")
    if (message.type === chatType.PRIVATE && message.nick === "") {
      this.broadcast(message);
    } else {
      const roomId = new RoomId(message.roomName, message.type);
      const room : ChatRoomInfo = this.getRoom(roomId);
      room.push(message);  // increments unread
      if (!this.currentRoom) {
        this.currentRoom = roomId;
      }
      if (this.currentRoom.same(roomId)) {
        room.seen();
      }
      events.fire('chat-session-update', this);
    }
  }

  // Deal with presence messages
  presence(type: number, user: UserInfo) : void {
    // find the room this user is in, don't create room unless this is an available presence
    const roomId = new RoomId(user.roomName, chatType.GROUP);
    const room : ChatRoomInfo = this.getRoom(roomId, type === messageType.AVAILIBLE);
    if (room) {
      // enter or leave
      if (type === messageType.AVAILIBLE) {
        room.addUser(user);
        room.add(new ChatMessage(chatType.AVAILABLE, '', user.name));      
      } else {
        room.removeUser(user);
        room.add(new ChatMessage(chatType.UNAVAILABLE, '', user.name));      
      }
      events.fire('chat-session-update', this);
    }
  }

  setCurrentRoom(roomId: RoomId) : void {
    this.currentRoom = roomId;
    events.fire('chat-session-update', this);
  }

  findRoom(roomId: RoomId) : ChatRoomInfo {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].roomId.same(roomId)) {
        return this.rooms[i];
      }
    }
  }

  getRoom(roomId: RoomId, add: boolean = true) : ChatRoomInfo {
    let room : ChatRoomInfo = this.findRoom(roomId);
    if (!room && add) {
      room = new ChatRoomInfo(roomId);
      this.rooms.push(room);
    }
    return room;
  }

  deleteRoom(roomId: RoomId) : ChatRoomInfo {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].roomId.same(roomId)) {
        const room = this.rooms[i];
        this.rooms.splice(i,1);
        return room;
      }
    }
  }

  send(text: string, roomName: string) : void {
    ChatActions.sendMessageToRoom(text, roomName);
  }

  sendMessage(text: string, user: string) : void {
    ChatActions.sendMessageToUser(text, user);
    const roomId = new RoomId(user, chatType.PRIVATE);
    const message = new ChatMessage(chatType.PRIVATE, user, this.me, text);
    this.getRoom(roomId).add(message);
    events.fire('chat-session-update', this);
  }

  joinRoom(roomId: RoomId) : void {
    if (!this.findRoom(roomId)) {
      ChatActions.joinRoom(roomId.name);
    }
    this.getRoom(roomId).seen();
    this.setCurrentRoom(roomId);
  }

  leaveRoom(roomId: RoomId) : void {
    const room = this.deleteRoom(roomId);
    if (room) {
      switch(roomId.type) {
        case chatType.GROUP:
          ChatActions.leaveRoom(roomId.name);
          break;
        case chatType.PRIVATE:
          // no-op
          break;
      }
      if (roomId.same(this.currentRoom)) {
        if (this.rooms.length) {
          this.currentRoom = this.rooms[0].roomId;
        } else {
          this.currentRoom = undefined;
        }
      }
      events.fire('chat-session-update', this);
    }
  }
}

export default ChatSession;
