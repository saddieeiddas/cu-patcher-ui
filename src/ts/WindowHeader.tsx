/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {patcher} from './core/PatcherAPI';
import Animate from './Animate';

export interface WindowHeaderProps {};
export interface WindowHeaderState {
  muted: boolean;
  settingsOpen: boolean;
};

class WindowHeader extends React.Component<WindowHeaderProps, WindowHeaderState> {
  public name: string = 'cse-patcher-windowheader';
  
  constructor(props: WindowHeaderProps) {
    super(props);
    this.state = {
      muted: false, // get this from local storage
      settingsOpen: false
    }
  }
  
  closeSettings = () => {
    this.setState({
      muted: this.state.muted,
      settingsOpen: false
    });
  }

  openSettings = () => {
    this.setState({
      muted: this.state.muted,
      settingsOpen: true
    });
  }
  
  mute = () => {
    this.setState({
      muted: !this.state.muted,
      settingsOpen: this.state.settingsOpen
    });
  }

  render() {
    let muteIcon = this.state.muted ? <img src='images/muted.png' /> : <img src='images/mute.png' />;
    let muteTooltip = this.state.muted ? 'un-mute sound' : 'mute sound';
    let settings: any = null;
    if (this.state.settingsOpen) settings = <h1 style={{color:'#fff'}} onClick={this.closeSettings}>Settings!</h1>;
    return (
      <div id={this.name}>
        <ul>
          <li><a href='#' onClick={patcher.closeWindow}><img src='images/close.png' /></a></li>
          <li><a href='#' onClick={patcher.maximizeWindow}><img src='images/max.png' /></a></li>
          <li><a href='#' onClick={patcher.minimizeWindow}><img src='images/min.png' /></a></li>
          <li>
            <a href='#' onClick={this.openSettings} className='hint--right hint--bounce' data-hint='settings'>
              <img src='images/settings.png' />
            </a>
          </li>
          <li>
            <a href='#' onClick={this.mute} className='hint--right hint--bounce' data-hint={muteTooltip}>
              {muteIcon}
            </a>
          </li>
        </ul>
        <Animate animationEnter='bounceInUp' animationLeave='bounceOutDown'
          durationEnter={700} durationLeave={500}>
          {settings}
        </Animate>
      </div>
    );
  }
};

export default WindowHeader;
