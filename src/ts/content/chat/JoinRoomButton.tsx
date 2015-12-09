/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import RoomId from './RoomId';
import { chatType } from './ChatMessage';

export interface JoinRoomButtonState {
}

export interface JoinRoomButtonProps {
  key: string;
  join: (roomId: RoomId) => void;
}

export default class JoinRoomButton extends React.Component<JoinRoomButtonProps, JoinRoomButtonState> {
  render() {
    return (
      <div
        className="chat-room-join-button"
        onClick={this.promptRoom.bind(this)}>+ Join Room</div>
      );
  }

  promptRoom() : void {
    const room = window.prompt('Room?');
    this.props.join(new RoomId(room, chatType.GROUP));
  }
}
