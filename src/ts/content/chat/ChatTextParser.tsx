/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

interface ChatTextParserToken {
  expr: RegExp,
  token: number;
}

class ChatTextParser {
  static TEXT: number = 0;
  tokens: ChatTextParserToken[];
  constructor(tokens: ChatTextParserToken[]) {
    this.tokens = tokens;
  }
  public parse(text: string, callback: (token: number, text: string) => JSX.Element[], index: number = 0): JSX.Element[] {
    let html : JSX.Element[] = [];
    let insert : JSX.Element[];
    let section : string;
    let re : RegExp;
    let match: RegExpExecArray;
    let next: number;
    
    if (this.tokens.length > index) {
      re = this.tokens[index].expr;
      next = 0;
      
      // find all matches for this token
      for (match = re.exec(text); match; match = re.exec(text)) {
        // parse text before match
        if (match.index > next) {
          section = text.substr(next, match.index - next);
          insert = this.parse(section, callback, index + 1);
          html = html.concat(insert);                        
        }

        // parse the match
        insert = callback(this.tokens[index].token, match[0]);
        if (!insert) {
          // text didn't match after all, parse again
          insert = this.parse(match[0], callback, index + 1);
        }
        html = html.concat(insert);                                            

        // track where we are up to                
        next = match.index + match[0].length;
      }
      
      // parse trailing text
      if (next < text.length) {
        section = text.substr(next);
        insert = this.parse(section, callback, index + 1);
        html = html.concat(insert); 
      }
      
      return html;
    }
    
    // no more tokens, just treat as text
    return callback(ChatTextParser.TEXT, text);
  }
}

export {
  ChatTextParserToken,
  ChatTextParser
};
export default ChatTextParser;
