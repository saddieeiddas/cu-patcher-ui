/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const SHOW_CHAT = 'cse-patcher/locations/SHOW_CHAT';

export function showChat(shouldShow: boolean = true) {
  return {
    type: SHOW_CHAT,
    showChat: shouldShow
  };
}

export function hideChat() {
  return {
    type: SHOW_CHAT,
    showChat: false
  };
}

const initialState = {
  showChat: false
}

export default function reducer(state: any = initialState, action: any = {}) {
  switch(action.type) {
    case SHOW_CHAT: return Object.assign({}, state, {showChat: action.showChat});
    default: return state;
  }
}
