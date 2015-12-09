
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as  Reflux from 'reflux';
import * as React from 'react';

const ChatActions : any = Reflux.createActions({
  'connect': {children: ['completed', 'failed', 'disconnected', 'disconnect', 'reconnect']},
  'sendMessageToRoom': {children: ['completed', 'failed']},
  'sendMessageToUser': {children: ['completed', 'failed']},
  'joinRoom': {children: ['completed', 'failed']},
  'leaveRoom': {children: ['completed', 'failed']},
  'ping': {}
});

export default ChatActions;
