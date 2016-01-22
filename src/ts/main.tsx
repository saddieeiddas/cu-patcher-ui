/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/// <reference path="../tsd/tsd.d.ts" />

import * as React from 'react';
import * as ReactDom from 'react-dom';
import {channelId} from 'camelot-unchained';
import Sidebar from './sidebar/Sidebar';
import Header, {HeaderRoute} from './Header';
import WindowHeader from './WindowHeader';
import Chat from './content/chat/Chat';
import Hero from './content/Hero';
import News from './content/News';
import PatchNotes from './content/PatchNotes';
import Support from './content/Support';
import Animate from './Animate';

export class PatcherState {
  public channel: channelId;
  public route: HeaderRoute;
  public chatOpened: boolean;
};

class Patcher extends React.Component<any, PatcherState> {
  public name = 'cse-patcher';

  constructor() {
    super();
    this.onHeaderRouteChanged = this.onHeaderRouteChanged.bind(this);
    this.state = this.initialState();
  }

  initialState() : PatcherState {
    return {
      channel: channelId.NONE,
      route: HeaderRoute.MAIN,
      chatOpened: false
    }
  }

  onHeaderRouteChanged(route: HeaderRoute) {
    if (route == HeaderRoute.CHAT) {
      this.setState({
        channel: this.state.channel,
        route: this.state.route,
        chatOpened: true
      });
    } else {
       this.setState({
        channel: this.state.channel,
        route: route,
        chatOpened: this.state.chatOpened
      });
    }
  }
  
  hideChat = () => {
    this.setState({
      channel: this.state.channel,
      route: this.state.route,
      chatOpened: false
    });
  }
  
  showChat = () => {
    this.setState({
      channel: this.state.channel,
      route: this.state.route,
      chatOpened: true
    });
  }

  render() {
    let content: any = null;
    switch(this.state.route) {
      case HeaderRoute.MAIN: content = <div key='0'><Hero /></div>; break;
      case HeaderRoute.NEWS: content = <div key='1'><News /></div>; break;
      case HeaderRoute.PATCHNOTES: content = <div key='2'><PatchNotes /></div>; break;
      case HeaderRoute.SUPPORT: content = <div key='3'><Support /></div>; break;
    }
    
    let chat: any = null;
    if (this.state.chatOpened) chat = <div id="chat-window" key='0'><Chat hideChat={this.hideChat} /></div>
    
    return (
      <div id={this.name}>
        <WindowHeader />
        <Header changeRoute={this.onHeaderRouteChanged} activeRoute={this.state.route} />
        <Sidebar />
        <div className='main-content'>
        <Animate animationEnter='slideInRight' animationLeave='slideOutLeft'
          durationEnter={700} durationLeave={500}>
          {content}
        </Animate>
        </div>
        <Animate animationEnter='bounceInRight' animationLeave='bounceOutRight'
          durationEnter={700} durationLeave={500}>
          {chat}
        </Animate>
      </div>
    );
  }
};

ReactDom.render(<Patcher />, document.getElementById('cse-patcher'));
