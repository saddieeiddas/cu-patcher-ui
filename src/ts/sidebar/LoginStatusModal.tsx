/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {patcher} from '../core/PatcherAPI';

export enum LoginStatus {
  AUTHENTICATING,
  SUCCESS,
  FAILED
}

export interface LoginStatusModalProps {
  email: string;
  password: string;
  rememberMe: boolean;
  closeModal: () => void;
};

export interface LoginStatusModalState {
  status: LoginStatus;
};

class LoginStatusModal extends React.Component<LoginStatusModalProps, LoginStatusModalState> {
  public name: string = 'login-status-modal';
  public intervalHandle: any;
  public intervalCounter: any;
  
  constructor(props: LoginStatusModalProps) {
    super(props);
    this.state = {
      status: LoginStatus.AUTHENTICATING
    }
  }
  
  componentWillMount() {
    this.checkLogin();
  }
  
  checkLogin = () => {
    // Do login
    patcher.login({
      email: this.props.email,
      password: this.props.password,
      rememberMe: this.props.rememberMe
    });
    
    // start interval to check login status
    this.intervalCounter = 0;
    this.intervalHandle = setInterval(() => {
      this.intervalCounter += 100;
      if (patcher.hasLoginToken() && this.intervalCounter > 4000) {
        // we're logged in!
        sessionStorage.setItem('login', '1');
        clearInterval(this.intervalHandle);
        this.setState({status: LoginStatus.SUCCESS});
        setTimeout(this.props.closeModal, 1000);
      } else if (this.intervalCounter> 5000) {
        clearInterval(this.intervalHandle);
        // login failed
        this.setState({status: LoginStatus.FAILED});
        setTimeout(this.props.closeModal, 1000);
      }
    }, 100)
  }
  
  render() {
    let text = '';
    let className = '';
    switch(this.state.status) {
      case LoginStatus.AUTHENTICATING:
        className = 'authenticating';
        text = 'Authenticating';
        break;
      case LoginStatus.FAILED:
        className = 'failed';
        text = 'Login failed';
        break;
      case LoginStatus.SUCCESS:
        className = 'success';
        text = 'Success!';
        break;
    }
    return (
      <div className={this.name}>
        <div className='login-modal z-depth-3'>
          <h5 className={className}>{text}</h5>
        </div>
      </div>
    );
  }
}

export default LoginStatusModal;
