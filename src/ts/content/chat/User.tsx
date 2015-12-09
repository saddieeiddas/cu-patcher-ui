/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import * as events from '../../core/events';

export class UserInfo {
  roomName: string;
  name: string;
  constructor(roomName: string, name: string) {
    this.roomName = roomName;
    this.name = name;
  }
}

export interface UserState {
}
export interface UserProps {
  info: UserInfo;
  key: number;
  selected?: boolean;
}

export class User extends React.Component<UserProps, UserState> {
  constructor(props: UserProps) {
    super(props);
  }
  render() {
    let classes : string[] = [ 'chat-info-user' ];
    if (this.props.selected) classes.push('chat-info-user-selected');
    return (
      <div className={classes.join(' ')} onClick={this.PM.bind(this)}>
        {this.props.info.name}
      </div>
    );
  }
  PM() : void {
    events.fire('cse-chat-private-message', this.props.info.name);
  }
}
