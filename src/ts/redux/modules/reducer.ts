/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {combineReducers} from 'redux';

import locationsReducer from './locations';
let location = locationsReducer; // because reasons...

import chatReducer from './chat';
let chat = chatReducer;

import channelsReducer from './channels';
let channels = channelsReducer;

import newsReducer from './news';
let news = newsReducer;

export default combineReducers({
  location,
  chat,
  channels,
  news,
});


/**
 * State
 * {
 *    location: {
 *      location: Route,  -- header route location (default Routes.HERO)
 *    },
 *    chat: {
 *      showChat: boolean, -- is chat visible (default false)
 *    },
 *    channels: {
 *      currentChannel: number, -- currently selected channel (default -1 for no channel)
 *      channels: [Channels], -- array of channels from the patcher (default [])
 *    },
 *    news: {
 *      isFetching: boolean, -- are we currently fetching post data? (default false)
 *      didInvalidate: boolean, -- did the user or app request a refresh of data? (default false)
 *      lastUpdated: Date, -- date of last update to news (default null),
 *      nextPage: number, -- next page to be fetched by the fetchNextPage action (default 0)
 *      posts: Array<any>, -- array of post to be displayed
 *    }
 * }
 */