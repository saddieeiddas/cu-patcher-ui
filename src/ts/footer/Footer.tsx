/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

class Footer extends React.Component<any, any> {
  public name = 'Footer';

  render() {
    return (
      <div id={this.name}>
        <h4>{this.name}</h4>
      </div>
    );
  }
};

export default Footer;
