/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {channelId} from 'camelot-unchained';
import * as React from 'react';
import Sidebar from './sidebar/Sidebar';
import {Header, HeaderRoute} from './header/Header';
import Content from './content/Content';
import Footer from './footer/Footer';

export class PatcherAppState {
  public channel: channelId;
  public route: string;
};

class PatcherApp extends React.Component<any, PatcherAppState> {
  public name = 'PatcherApp';

  constructor() {
    super();
    this.onHeaderRouteChanged = this.onHeaderRouteChanged.bind(this);
    this.state = this.initialState();
  }

  initialState() : PatcherAppState {
    return {
      channel: channelId.NONE,
      route: '' + HeaderRoute.Main
    }
  }

  onHeaderRouteChanged(route: HeaderRoute) {
    this.setState({
      channel: this.state.channel,
      route: route + ''
    });
  }

  render() {
    return (
      <div id={this.name}>
        <Header changeRoute={this.onHeaderRouteChanged} />
        <Sidebar />
        <Content changeRoute={this.onHeaderRouteChanged} route={this.state.route} />
        <Footer />
      </div>
    );
  }
};

export default PatcherApp;
