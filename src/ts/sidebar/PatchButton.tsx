/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

export enum ChannelState {
  UNINSTALLED,
  INSTALLING,
  UPDATEAVAILABLE,
  DOWNLOADING,
  READY,
  LAUNCHING
}

export class Progress {
  constructor(public rate: number = 0, public dataCompleted: number = 0, public totalDataSize: number = 0) {}
  
  public timeEstimate = () => {
    return Progress.secondsToString((this.remaining() * 8) / this.rate);
  }
  
  public remaining = () => {
    return this.totalDataSize - this.dataCompleted;
  }
  
  static bytesToString(bytes: number): string {
    if (bytes >= 1099511627776) {
      // display as TB
      return (bytes / 1099511627776).toFixed(2) + 'TB';
    } else if (bytes >= 1073741824) {
      // display as GB
      return (bytes / 1073741824).toFixed(2) + 'GB';
    } else if (bytes >= 1048576) {
      // display as MB
      return (bytes / 1048576).toFixed(2) + 'MB';
    } else {
      // display rest as KB
      return (bytes / 1024).toFixed(2) + 'KB';
    }
  }
  
  static bitsToString(bits: number): string {
    if (bits >= 1000000000) {
      // display as GB
      return (bits / 1000000000).toFixed(2) + 'Gbps';
    } else if (bits >= 1000000) {
      // display as MB
      return (bits / 1000000).toFixed(2) + 'Mbps';
    } else {
      // display rest as KB
      return (bits / 1000).toFixed(2) + 'Kbps';
    }
  }
  
  static secondsToString(val: number): string {
    let days = Math.floor(val / 86400)
    let hours = Math.floor((val % 86400) / 3600);
    let minutes = Math.floor((val % 3600) / 60);
    let seconds = Math.floor(val % 60);
    return (days > 0 ? days + 'd ' : '')
      + (hours > 0 ? hours + 'h ' : '')
      + (minutes < 10 ? '0' + minutes + 'm ' : minutes + 'm ')
      + (seconds < 10 ? '0' + seconds + 's ' : seconds + 's ');
  }
}

export interface PatchButtonProps {
};

export interface PatchButtonState {
  progress: Progress;
  channelState: ChannelState;
};

class PatchButton extends React.Component<PatchButtonProps, PatchButtonState> {
  public name: string = 'cse-patcher-patch-button';
  private intervalHandle: any;
  
  constructor(props: PatchButtonProps) {
    super(props);
    
    this.state = {
      progress: new Progress(),
      channelState: ChannelState.UNINSTALLED
    }
  }
  
  
  
  onClicked = () => {
    switch (this.state.channelState) {
      case ChannelState.UNINSTALLED:
        this.beginInstall();
        break;
      case ChannelState.INSTALLING: break;
      
      case ChannelState.DOWNLOADING: break;
      
      case ChannelState.READY:
        this.beginInstall();
        break;
      case ChannelState.LAUNCHING: break;
    }
  }
  
  beginDownload = () => {
    
  }
  
  beginInstall = () => {
    this.intervalHandle = setInterval(() => this.mockProgress(), 100);
    this.setState({
        progress: new Progress(4000000, this.state.progress.dataCompleted + (4000000 / 8), 1048576 * 100),
        channelState: ChannelState.INSTALLING
      });
  }
  
  mockProgress = () => {
    
    if (this.state.progress.remaining() > 0) {
      this.setState({
        progress: new Progress(4000000, this.state.progress.dataCompleted + (4000000 / 8), 1048576 * 100),
        channelState: ChannelState.INSTALLING
      });
    } else {
      this.setState({
        progress: new Progress(),
        channelState: ChannelState.READY
      });
      clearInterval(this.intervalHandle);
    }
  }
  
  render() {
    let layer1: any = null;
    let layer2: any = null;
    let layer3: any = null;
    switch(this.state.channelState) {
      case ChannelState.UNINSTALLED:
        layer1 = <a className='waves-effect btn install-download-btn uninstalled' onClick={this.onClicked}>Install</a>;
        break;
      case ChannelState.INSTALLING:
        layer1 = <a className='waves-effect btn install-download-btn installing' onClick={this.onClicked}>Installing</a>;
        
        let percentRemaining = (this.state.progress.dataCompleted / this.state.progress.totalDataSize) * 100;
        layer2 = <div className='fill' style={{width: percentRemaining + '%', opacity: 1}} />;
        
        let rate = Progress.bitsToString(this.state.progress.rate);
        let dataSize = Progress.bytesToString(this.state.progress.dataCompleted) + '/' + Progress.bytesToString(this.state.progress.totalDataSize);
        let time = this.state.progress.timeEstimate();
        layer3 = (
          <div className='text'>
            <div className='progress-text'><span className='body'>{time}</span></div>
            <div className='progress-text'><span className='body'>{rate}</span></div>
            <div className='progress-text'><span className='body'>{dataSize}</span></div>
          </div>
        );
        break;
      case ChannelState.DOWNLOADING:
        layer1 = <a className='waves-effect btn install-download-btn downloading' onClick={this.onClicked}>Downloading</a>;
        layer2 = <div className='fill' style={{width: this.state.progress + '%', opacity: 1}} />;
        break;
      case ChannelState.READY:
        layer1 = <a className='waves-effect btn install-download-btn ready' onClick={this.onClicked}>Play Now</a>;
        break;
      case ChannelState.LAUNCHING:
        layer1 = <a className='waves-effect btn install-download-btn launching' onClick={this.onClicked}>Launching</a>;
        break;
    }
    
    
    return (
      <div id={this.name}>
        <div className='layer z1'>
          {layer1}
        </div>
        <div className='layer z2'>
          {layer2}
        </div>
        <div className='layer z3'>
          {layer3}
        </div>
      </div>
    );
  }
}

export default PatchButton;
