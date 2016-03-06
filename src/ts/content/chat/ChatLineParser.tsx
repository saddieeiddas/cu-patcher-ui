/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import { ChatTextParser, ChatTextParserToken } from './ChatTextParser';
import Emoji from './Emoji';
import URLRegExp from './URLRegExp';
import Whitelist from './URLWhitelist';

import {prefixes, display} from './settings/chat-defaults';

class ChatLineParser {
  _key: number = 0;

  static LINK: number = ChatTextParser.TEXT + 1;
  static EMOJI: number = ChatTextParser.TEXT + 2;
  
  // Settings from Patcher Options
  _embedImages: boolean = JSON.parse(localStorage.getItem(`${prefixes.display}${display.embedImages.key}`));
  _embedVideos: boolean = JSON.parse(localStorage.getItem(`${prefixes.display}${display.embedVideos.key}`));
  _showEmoticons: boolean = JSON.parse(localStorage.getItem(`${prefixes.display}${display.showEmoticons.key}`));

  _fixupLink(url: string) : string {
    if (url.indexOf('www.') == 0) {
      url = 'http://' + url;
    }
    return url;
  }

  _parseLink(text: string) : JSX.Element[] {
    const videoMatch: string = this._embedVideos ? Whitelist.isVideo(text) : null;
    const vineMatch: string = this._embedVideos ? Whitelist.isVine(text) : null;
    const href : string = this._fixupLink(text);

    // Video link (youtube)
    if (videoMatch) {
      return [
        <a key={this._key++} className="chat-line-message" target="_blank" href={href}>
          <iframe className='chat-line-video' src={videoMatch} allowFullScreen></iframe>
        </a>
      ];
    } 
    
    // Vine link (vine)
    else if (vineMatch) {
      return [
        <a key={this._key++} className="chat-line-message" target="_blank" href={href}>
          <iframe className='chat-line-vine' src={vineMatch}></iframe>
          <script src="https://platform.vine.co/static/scripts/embed.js"></script>
        </a>
      ];
    } 

    // Image link (whitelisted)
    else if (this._embedImages && Whitelist.isImage(text) && Whitelist.ok(text)) {
      return [
        <a key={this._key++} className="chat-line-message" target="_blank" href={href}>
          <img className='chat-line-image' src={text} title={text}/>
        </a>
      ];
    } 

    // all other links
    return [ <a key={this._key++} className="chat-line-message" target="_blank" href={href}>{text}</a> ];
  }
  
  _parseEmoji(text: string) : JSX.Element[] {
    const emoji : string = Emoji.fromText(text);
    if (emoji) {
      return [<span key={this._key++} className={'chat-emoticon emote-' + emoji}></span>];
    }
  }

  _parseText(text: string) : JSX.Element[] { 
    return [ <span key={this._key++} className="chat-line-message">{text}</span> ];
  }
  
  parseAction(text: string): JSX.Element[] {
    const html: JSX.Element[] = [];
    const content : JSX.Element[] = this.parse(text.substr(4).trim());
    html.push(<span key={this._key++} className="chat-line-action">&lt;{content}&gt;</span>);
    return html;
  }

  isAction(text: string) : boolean {
     return text.toLowerCase().substr(0, 4) === '/me ';
  }

  parse(text: string): JSX.Element[] {
    const tokens : ChatTextParserToken[] = [
      { token: ChatLineParser.LINK,  expr: URLRegExp.create() },      
    ];
    if (this._showEmoticons) {
      tokens.push({ token: ChatLineParser.EMOJI, expr: Emoji.createRegExp() });
    }
    const parser : ChatTextParser = new ChatTextParser(tokens);
    return parser.parse(text, (token: number, text: string) => {
      switch(token) {
        case ChatLineParser.LINK:  return this._parseLink(text);
        case ChatLineParser.EMOJI: return this._parseEmoji(text);
      }
      // treat everything else as just text
      return this._parseText(text);
    });
  }

}

export default ChatLineParser;
