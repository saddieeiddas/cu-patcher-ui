/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

export interface HeroProps {}
export interface HeroState {}

class Hero extends React.Component<HeroProps, HeroState> {
  public name:string = 'cse-patcher-hero';

  constructor(props: HeroProps) {
    super(props);
  }

  render() {
    return (
      <div id={this.name} className='main-content'>
        <h1>{this.name}</h1>
        <p>content</p>
      </div>
    );
  }
};

export default Hero;
