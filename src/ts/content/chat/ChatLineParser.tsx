/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import { ChatTextParser, ChatTextParserToken } from './ChatTextParser';
import Emoji from './Emoji';
import Links from './Links';
import {prefixes, display} from './settings/chat-defaults';

class ChatLineParser {
  _key: number = 0;

  _showEmoticons: boolean = JSON.parse(localStorage.getItem(`${prefixes.display}${display.showEmoticons.key}`));

  static LINK: number = ChatTextParser.TEXT + 1;
  static EMOJI: number = ChatTextParser.TEXT + 2;
  
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
    const keygen = () : number => { return this._key++; }; 
    const tokens : ChatTextParserToken[] = [
      { token: ChatLineParser.LINK,  expr: Links.createRegExp() },      
    ];
    if (this._showEmoticons) {
      tokens.push({ token: ChatLineParser.EMOJI, expr: Emoji.createRegExp() });
    }
    const parser : ChatTextParser = new ChatTextParser(tokens);
    return parser.parse(text, (token: number, text: string) => {
      switch(token) {
        case ChatLineParser.LINK:  return Links.fromText(text, keygen);
        case ChatLineParser.EMOJI: return Emoji.fromText(text, keygen);
      }
      // treat everything else as just text
      return this._parseText(text);
    });
  }

}

export default ChatLineParser;
