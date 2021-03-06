/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

export class ChatConfig {
  SCROLLBACK_BUFFER_SIZE: number = 1024;
  constructor() {
    this.load();
  }
  load() : void {
    // TODO : Waiting for patcher UI chat settings details
  }
}

export const chatConfig = new ChatConfig();
