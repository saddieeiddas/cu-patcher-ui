/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

export enum HeaderRoute {
  MAIN,
  PATCHNOTES,
  NEWS,
  SUPPORT,
  CHAT
};

export interface HeaderProps {
  changeRoute : (header: HeaderRoute) => void;
  activeRoute: HeaderRoute;
};

export interface HeaderState {};

class Header extends React.Component<HeaderProps, HeaderState> {
  public name = 'cse-patcher-header';

  externalLink = (url: string) => {
    window.open(url, '_blank');
  }

  internalLink = (route: HeaderRoute) => {
    this.props.changeRoute(route);
  }

  render() {
    return (
      <div id={this.name} className='glass navbar-fixed'>
        <nav>
        <div className='nav-wrapper'>
          <a className='brand-logo cu-logo' onClick={this.internalLink.bind(this, HeaderRoute.MAIN)}><img src='images/cu_logo.png' /></a>
          <ul id='nav-mobile' className='right'>
            <li className={this.props.activeRoute == HeaderRoute.PATCHNOTES ? 'active' : ''}><a onClick={this.internalLink.bind(this, HeaderRoute.PATCHNOTES)}>Patch Notes</a></li>
            <li className={this.props.activeRoute == HeaderRoute.NEWS ? 'active' : ''}><a onClick={this.internalLink.bind(this, HeaderRoute.NEWS)}>News</a></li>
            <li className={this.props.activeRoute == HeaderRoute.SUPPORT ? 'active' : ''}><a onClick={this.internalLink.bind(this, HeaderRoute.SUPPORT)}>Support</a></li>
            <li><a onClick={this.externalLink.bind(this, 'http://camelotunchained.com/v2/')} className='external-link'>Getting Started</a></li>
            <li><a onClick={this.externalLink.bind(this, 'http://camelotunchained.com/v2/')}>CSE Store</a></li>
            <li><a onClick={this.internalLink.bind(this, HeaderRoute.CHAT)}>Chat</a></li>
          </ul>
        </div>
        </nav>
      </div>
    );
  }
};

export default Header;
