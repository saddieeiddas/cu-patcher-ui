/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

class Sidebar extends React.Component<any, any> {
  public name = 'Sidebar';

  render() {
    return (
      <div id={this.name}>
        <div className='content'>
          <h2>{this.name}</h2>
          <p> Side bar stuff </p>
        </div>
      </div>
    );
  }
};

export default Sidebar;
