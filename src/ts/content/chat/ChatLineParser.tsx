/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import Emoji from './Emoji';
import URLRegExp from './URLRegExp';
import Whitelist from './URLWhitelist';

class ChatLineParser {
  key: number = 0;

  _fixupLink(url: string) : string {
    if (url.indexOf('www.') == 0) {
      url = 'http://' + url;
    }
    return url;
  }

  // parse text, replace emoticon's with their emoji counterparts
  _makeTextWithEmoji(text: string): JSX.Element[] {
    const html: JSX.Element[] = [];
    const re: RegExp = Emoji.regexp;
    let next: number = 0;
    let match: RegExpExecArray;
    let emoji: string;
    for (match = re.exec(text); match; match = re.exec(text)) {
      if (match.index > next) {
        html.push(<span key={this.key++} className="chat-line-message">{text.substr(next, match.index - next)}</span>);
      }
      emoji = Emoji.fromText(match[0]);
      if (emoji) {
        html.push(
          <span key={this.key++} className={'chat-emoticon emote-' + emoji}></span>
        );
      } else {
        html.push(<span key={this.key++} className="chat-line-message">{match[0]}</span>);
      }
      next = match.index + match[0].length;
    }
    if (next < text.length) {
      html.push(<span key={this.key++} className="chat-line-message">{text.substr(next)}</span>);
    }
    return html;
  }

  // parse text, replacing urls with either clickable links, or clickable image thumbnails.
  _makeLinks(text: string): JSX.Element[] {
    const re: RegExp = URLRegExp.create();
    let html: JSX.Element[] = [];
    let next: number = 0;
    let match: RegExpExecArray;
    for (match = re.exec(text); match; match = re.exec(text)) {
      if (match.index > next) {
        html = html.concat(this._makeTextWithEmoji(text.substr(next, match.index - next)));
      }
      let videoMatch: RegExpMatchArray = Whitelist.isVideo(match[0]);
      let vineMatch: RegExpMatchArray = Whitelist.isVine(match[0]);
      if (Whitelist.isImage(match[0]) && Whitelist.ok(match[0])) {
        html.push(
          <a key={this.key++} className="chat-line-message" target="_blank" href={this._fixupLink(match[0])}>
            <img className='chat-line-image' height="100" src={match[0]} title={match[0]}/>
          </a>
        );
      } else if (videoMatch && Whitelist.ok(match[0])) {
        let videoSrc: string = "https://www.youtube.com/embed/" + videoMatch[1];
        html.push(
          <a key={this.key++} className="chat-line-message" target="_blank" href={this._fixupLink(match[0])}>
            <iframe width="480" height="385" src={videoSrc}></iframe>
          </a>
        );
      } else if (vineMatch && Whitelist.ok(match[0])) {
        let vineSrc: string = "https://vine.co/v/" + vineMatch[1] + "/embed/simple";
        html.push(
          <a key={this.key++} className="chat-line-message" target="_blank" href={this._fixupLink(match[0])}>
            <iframe src={vineSrc} width="400" height="400"></iframe><script src="https://platform.vine.co/static/scripts/embed.js"></script>
          </a>
        );
      } else {
        html.push(<a key={this.key++} className="chat-line-message" target="_blank" href={this._fixupLink(match[0])}>{match[0]}</a>);
      }
      next = match.index + match[0].length;
    }
    if (next < text.length) {
      html = html.concat(this._makeTextWithEmoji(text.substr(next)));
    }
    return html;
  }

  // parse chat text, and return a bunch of JSX elements.  The parser first looks for links, then makes them either
  // clickable or image thumbnails. For the remaining text that isn't links, it searches for emoji sequences and
  // replaces ones it recongnises with the emoji icon.
  public parse(text: string): JSX.Element[] {
    return this._makeLinks(text);
  }
}

export default ChatLineParser;
