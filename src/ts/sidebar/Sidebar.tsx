/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import Login from './Login';
import ChannelSelect, {Channel} from './ChannelSelect';
import ServerSelect, {Server, ServerStatus} from './ServerSelect';
import PatchButton, {ChannelState} from './PatchButton';
import ServerCounts from './ServerCounts';
import CharacterSelect, {Character} from './CharacterSelect';
import {components} from 'camelot-unchained';
let QuickSelect = components.QuickSelect;
declare let $: any;

export interface SidebarProps {};

export interface SidebarState {
  loggedIn: boolean;
  channels: Array<Channel>;
  servers: Array<Server>;
  characters: Array<Character>;
  activeServer: Server;
};

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  public name = 'cse-patcher-sidebar';

  constructor(props: SidebarProps) {
    super(props);
    this.state = {
      loggedIn: false,
      servers: this.getServers(),
      channels: this.getChannels(),
      characters: this.getCharacters(),
      activeServer: null
    };
  }
  
  onLogIn = () => {
    this.setState({
     loggedIn: true,
     servers: this.state.servers,
     channels: this.state.channels,
     characters: this.state.characters,
     activeServer: this.state.activeServer
    });
  }
  
  onLogOut = () => {
    
  }
  
  initjQueryObjects = () => {
    $('.dropdown-button').dropdown();
    $('.tooltipped').tooltip();
  }
  
  getChannels = () => {
    return [{name: 'Hatchery'}, {name: 'Wyrmling'}];
  }
  
  getCharacters = () => {
    return [{
      name: 'Create new character'
    },{
      name: 'CSE JB [STRM]'
    },{
      name: 'CSE JB [DRYAD]'
    }];
  }
  
  getServers = () => {
    return [{
      name: 'Hatchery',
      status: ServerStatus.ONLINE,
      maxPlayers: 10000,
      artPlayers: 1234,
      tddPlayers: 1342,
      vikPlayers: 1244
    },{
      name: 'Castle',
      status: ServerStatus.OFFLINE,
      maxPlayers: 10000,
      artPlayers: 0,
      tddPlayers: 0,
      vikPlayers: 0
    },{
      name: 'localhost',
      status: ServerStatus.OFFLINE,
      maxPlayers: 10000,
      artPlayers: 0,
      tddPlayers: 0,
      vikPlayers: 0
    }];
  }
  
  onSelectedServerChanged = (server: Server) => {
    this.setState({
      loggedIn: this.state.loggedIn,
      servers: this.state.servers,
      channels: this.state.channels,
      characters: this.state.characters,
      activeServer: server
    })
  }
  
  onSelectedChannelChanged = (channel: Channel) => {
    
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div id={this.name} className=''>
          <Login onLogIn={this.onLogIn} />
        </div>
      );
    }
    
    let servers = this.state.servers;
    let activeServer = this.state.activeServer || this.state.servers[0];
    let characters = this.state.characters;
    setTimeout(this.initjQueryObjects, 100);

    return (
      <div id={this.name} className=''>
        <ChannelSelect channels={this.state.channels} onSelectedChannelChanged={this.onSelectedChannelChanged} />
        <div className='card-panel no-padding'>
          <ServerSelect servers={this.state.servers}
                        onSelectedServerChanged={this.onSelectedServerChanged} />
          <CharacterSelect characters={this.state.characters}/>
          <ServerCounts artCount={activeServer.artPlayers}
                        tddCount={activeServer.tddPlayers}
                        vikCount={activeServer.vikPlayers} />
          <PatchButton />
        </div>
      </div>
    );
  }
};

export default Sidebar;
