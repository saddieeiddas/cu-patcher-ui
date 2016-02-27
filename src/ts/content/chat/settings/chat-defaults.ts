/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */



export const prefixes = {
  display: 'cse-chat-settings:chat-display:',
  rooms: 'cse-chat-settings:chat-rooms:',
}

export const display = {
  embedImages: {
    key: 'embed-images',
    type:'boolean',
    default: true,
    title: 'Embed images',
    description: 'Display embedded images when a user posts a link to an image from a whitelisted host?'
  },
  embedVideos: {
    key: 'embed-videos',
    type:'boolean',
    default: true,
    title: 'Embed videos',
    description: 'Display embedded videos and vines when a user posts a youtube, vimeo, vine link?'
  },
  showEmoticons: {
    key: 'show-emoticons',
    type:'boolean',
    default: true,
    title: 'Show emoticons',
    description: 'Sometimes words just don`t say enough.'
  },
  timestamps: {
    key: 'timestamps',
    type:'boolean',
    default: false,
    title: 'Timestamps',
    description: 'Show a timestamp on each message?'
  },
  joinParts: {
    key: 'join-parts',
    type:'boolean',
    default: false,
    title: 'joinParts',
    description: 'Show join and part messages when a user enter or leaves a channel?'
  },
};

export const rooms = [
  '_global'
]

export function initLocalStorage() {
  // Init each of the settings groups here
  
  for (let key in display) {
    let option = (display as any)[key];
    let v = JSON.parse(localStorage.getItem(`${prefixes.display}${option.key}`));
    if (v == null) localStorage.setItem(`${prefixes.display}${option.key}`, option.default);
  }
}

export default {
  'chat-display': display,
}
