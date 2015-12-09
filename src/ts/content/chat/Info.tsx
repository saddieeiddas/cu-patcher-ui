/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import Tabs from './Tabs';
import Rooms from './Rooms';
import ChatRoomInfo from './ChatRoomInfo';
import JoinRoomButton from './JoinRoomButton';
import ChatSession from './ChatSession';
import Users from './Users';
import RoomId from './RoomId';

export class InfoState {
  currentTab: string = "rooms";
}
export interface InfoProps {
  chat: ChatSession;
  currentRoom: RoomId;
  selectRoom: (roomId: RoomId) => void;
  leaveRoom: (roomId: RoomId) => void;
}

export default class Info extends React.Component<InfoProps, InfoState> {
  state: InfoState = new InfoState();
  render() {
    let content : JSX.Element[] = [];
    switch(this.state.currentTab) {
      case 'settings':
        break;
      case 'users':
        content.push(<Users key="users" room={this.props.chat.getRoom(this.props.currentRoom)}/>);
        break;
      case 'rooms': default:
        content.push(
          <Rooms
            key="rooms" 
            rooms={this.props.chat.rooms}
            current={this.props.currentRoom}
            select={this.props.selectRoom}
            leave={this.props.leaveRoom}
          />
        );
        content.push(<JoinRoomButton key="join-button" join={this.props.selectRoom}/>);
        break;
    }
    return (
      <div className="chat-info">
        <Tabs current={this.state.currentTab} select={this.select.bind(this)}/>
        {content}
      </div>
    );
  }
  select(tab: string) : void {
    if (this.state.currentTab !== tab) {
      this.setState({ currentTab: tab });
    }
  }
}
