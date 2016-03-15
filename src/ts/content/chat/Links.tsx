/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import Whitelist from './URLWhitelist';
import URLRegExp from './URLRegExp';
import {prefixes, display} from './settings/chat-defaults';

function _fixupLink(url: string) : string {
  if (url.indexOf('www.') == 0) {
    url = 'http://' + url;
  }
  return url;
}

function fromText(text: string, keygen:() => number) : JSX.Element[] {
  const embedImages: boolean = JSON.parse(localStorage.getItem(`${prefixes.display}${display.embedImages.key}`));
  const embedVideos: boolean = JSON.parse(localStorage.getItem(`${prefixes.display}${display.embedVideos.key}`));

  const videoMatch: string = embedVideos ? Whitelist.isVideo(text) : null;
  const vineMatch: string = embedVideos ? Whitelist.isVine(text) : null;
  const href : string = _fixupLink(text);

  // Video link (youtube)
  if (videoMatch) {
    return [
      <a key={keygen()} className="chat-line-message" target="_blank" href={href}>
        <iframe className='chat-line-video' src={videoMatch} allowFullScreen></iframe>
      </a>
    ];
  }
  
  // Vine link (vine)
  else if (vineMatch) {
    return [
      <a key={keygen()} className="chat-line-message" target="_blank" href={href}>
        <iframe className='chat-line-vine' src={vineMatch}></iframe>
        <script src="https://platform.vine.co/static/scripts/embed.js"></script>
      </a>
    ];
  } 

  // Image link (whitelisted)
  else if (embedImages && Whitelist.isImage(text) && Whitelist.ok(text)) {
    return [
      <a key={keygen()} className="chat-line-message" target="_blank" href={href}>
        <img className='chat-line-image' src={text} title={text}/>
      </a>
    ];
  } 

  // all other links
  return [ <a key={keygen()} className="chat-line-message" target="_blank" href={href}>{text}</a> ];
}

function createRegExp() : RegExp {
  return URLRegExp.create();
}

export default {
  fromText,
  createRegExp
}
