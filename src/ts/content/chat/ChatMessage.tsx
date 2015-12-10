/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

enum chatType {
  AVAILABLE = 1,
  UNAVAILABLE = 2,
  PRIVATE = 3,
  GROUP = 4,
  SYSTEM = 5,
  BROADCAST = 6,
}

class ChatMessage {
  public type: number;
  public roomName: string;
  public nick: string;
  public text: string;
  public isCSE: boolean;
  constructor(type: number, roomName: string, nick: string = null, text: string = null, isCSE: boolean = false) {
    this.type = type;
    this.roomName = roomName.toLowerCase();
    this.nick = nick.toLowerCase();
    this.text = text;
    this.isCSE = isCSE;
  }
}

export {
  ChatMessage,
  chatType
}
