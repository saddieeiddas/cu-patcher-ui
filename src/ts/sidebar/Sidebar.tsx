/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

export interface SidebarState {
  
}

export interface SidebarProps {
  
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  public name = 'Sidebar';

  render() {
    return (
      <div id={this.name} className='flex-container'>
        <div className='loginbox glass'>
          <div className='input-field'>
            <input id='email' type='email' className='validate'/>
            <label htmlFor='email'>Email Address</label>
          </div>
          <div className='input-field'>
            <input id='password' type='password' className='validate'/>
            <label htmlFor='password'>Password</label>
          </div>
          <div className='flex-container flex-vcenter'>
            <div>
              <input type="checkbox" className="filled-in" id="remember-me" />
              <label htmlFor="remember-me">Remember my Email</label>
            </div>
            <div className='flex-right'>
              <a className='waves-effect waves-light btn-flat'>Forgot?</a>
            </div>
          </div>
          <a className='waves-effect waves-light btn-large flex-stretch'><i className='material-icons right'>label</i>Sign In</a>
        </div>
      </div>
    );
  }
};

export default Sidebar;
