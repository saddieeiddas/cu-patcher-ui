/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/// <reference path="../tsd/tsd.d.ts" />

import PatcherApp from './PatcherApp';
import * as React from 'react';
import * as ReactDom from 'react-dom';
ReactDom.render(<PatcherApp />, document.getElementById('app'));
