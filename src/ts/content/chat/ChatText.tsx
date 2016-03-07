/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import ChatLine from './ChatLine';
import RoomId from './RoomId';
import ChatRoomInfo from './ChatRoomInfo';

export class ChatTextState {
}

export interface ChatTextProps {
  room: ChatRoomInfo;
}

const AUTOSCROLL_FUZZYNESS : number = 12;

class ChatText extends React.Component<ChatTextProps, ChatTextState> {
  SCROLLBACK_PAGESIZE: number = 50;
  scrollTop: number = undefined;
  scrollPosFromBottom: number = undefined;
  currentRoom: RoomId = undefined;
  constructor(props: ChatTextProps) {
    super(props);
    this.state = new ChatTextState();
    this.handleScroll = this.handleScroll.bind(this);
  }
  scroll() : void {
    const chatBox : any = this.refs['chatbox'];
    if (this.scrollPosFromBottom) {
      this.scrollTop = chatBox.scrollTop = chatBox.scrollHeight - this.scrollPosFromBottom;
      this.scrollPosFromBottom = undefined;
    }
    else if (chatBox.lastElementChild) {
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
    this.watchScroll();
  }
  componentWillUnmount() {
    this.unwatchScroll();
  }
  watchScroll() {
    const el: HTMLDivElement = this.refs['chatbox'] as HTMLDivElement;
    el.addEventListener("scroll", this.handleScroll);
  }
  handleScroll(e: MouseEvent) {
    const lazy: HTMLDivElement = this.refs['lazyload'] as HTMLDivElement;
    if (lazy) {
      const el: HTMLDivElement = this.refs['chatbox'] as HTMLDivElement;
      if (el.scrollTop < lazy.offsetHeight) {
        // lazy load rest of content
        this.scrollPosFromBottom = el.scrollHeight - el.scrollTop;
        this.props.room.nextScrollbackPage();
        this.forceUpdate();
      }
    }
  }
  unwatchScroll() {
    const el: HTMLElement = this.refs['chatbox'] as HTMLElement;
    el.removeEventListener("scroll", this.handleScroll);
  }
  newRoom() : void {
    this.currentRoom = this.props.room.roomId;
    this.scrollTop = undefined;
  }
  render() {
    const room : ChatRoomInfo = this.props.room;
    let messages : JSX.Element[];
    let content : JSX.Element = undefined;
    let lazy : JSX.Element = undefined;
    if (room) {
      if (!this.currentRoom || !room.roomId.same(this.currentRoom)) {
        this.newRoom();
      }
      if (room.scrollback > 0) {
        lazy = <div ref="lazyload" className="chat-lazyload" style={{ height: room.scrollback + 'em' }}></div>;
      }
      if (room.messages) {
        messages = room.messages.slice(room.scrollback);
      }
    }
    return (
      <div ref="chatbox" className="chat-text allow-select-text">
      {lazy}
      {messages}
      </div>
    );
  }
}

export default ChatText;
