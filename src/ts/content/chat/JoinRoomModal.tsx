/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

export interface JoinRoomModalProps {
  closeModal: () => void;
  joinRoom: (roomName: string) => void;
}

export interface JoinRoomModalState {
}

class JoinRoomModal extends React.Component<JoinRoomModalProps, JoinRoomModalState> {

  constructor(props: JoinRoomModalProps) {
    super(props);
  }

  componentDidMount() {
    const input : HTMLInputElement = this.refs['roomInput'] as HTMLInputElement;
    const join : HTMLInputElement = this.refs['join'] as HTMLInputElement;
    join.disabled = true;
    input.addEventListener('keyup', (ev: KeyboardEvent) => {
      join.disabled = input.value.length === 0;
      if (input.value.length > 0 && ev.keyCode === 13) {
        this.props.joinRoom(input.value);
      }
    });
  }

  joinRoom = () => {
    var input : HTMLInputElement = this.refs['roomInput'] as HTMLInputElement;
    this.props.joinRoom(input.value);
  }

  render() {
    return (
      <div className="join-room-modal">
        <div className="input-field">
          <input id="room" type="text" ref="roomInput"/>
          <label htmlFor="room">Room Name</label>
        </div>
        <button className="wave-effects btn-flat" onClick={this.joinRoom} ref="join">JOIN ROOM</button>
        <button className="wave-effects btn-flat" onClick={this.props.closeModal} >CANCEL</button>
      </div>
    )
  }
}

export default JoinRoomModal;
