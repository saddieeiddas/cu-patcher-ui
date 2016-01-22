/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import ChatLine from './ChatLine';
import RoomId from './RoomId';

export class ChatTextState {
}

export interface ChatTextProps {
  messages: JSX.Element[];
  currentRoom: RoomId;
}

const AUTOSCROLL_FUZZYNESS : number = 12;

class ChatText extends React.Component<ChatTextProps, ChatTextState> {
  scrollTop: number = undefined;
  currentRoom: RoomId = undefined;
  constructor(props: ChatTextProps) {
    super(props);
    this.state = new ChatTextState();
  }
  scroll() : void {
    const chatBox : any = this.refs['chatbox'];
    if (chatBox.lastElementChild) {
      if (this.scrollTop === undefined || (this.scrollTop - chatBox.scrollTop) <= AUTOSCROLL_FUZZYNESS) {
        chatBox.lastElementChild.scrollIntoView();
        this.scrollTop = chatBox.scrollTop;      
      }      
    }
  }
  componentDidUpdate() {
    this.scroll();
  }
  componentDidMount() {
    this.scroll();
  }
  newRoom() : void {
    this.currentRoom = this.props.currentRoom;
    this.scrollTop = undefined;
  }
  render() {
    let content : JSX.Element = undefined;
    if (this.props.currentRoom) {
      if (!this.currentRoom || !this.props.currentRoom.same(this.currentRoom)) {
        this.newRoom();
      }
    }
    return (
      <div ref="chatbox" className="chat-text allow-select-text">
      {this.props.messages}
      </div>
    );
  }
}

export default ChatText;
