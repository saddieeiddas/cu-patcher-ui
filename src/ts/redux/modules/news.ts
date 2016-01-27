/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Promise} from 'es6-promise';
import 'isomorphic-fetch';

export interface RenderedObject {
  rendered: string
}

export interface WPData {
  id: number,
  date: Date,
  guid: RenderedObject
  link: string,
  modified: Date,
  modified_gmt: Date,
  slug: string,
  title: RenderedObject,
  author: number,
  comment_status: string,
  ping_status: string,
  type: string,
  _links: any,
}

export interface Post extends WPData {
  status: string,
  content: RenderedObject,
  excerpt: RenderedObject,
  featured_image: number,
  sticky: boolean,
  format: string,
}

export interface Media extends WPData {
  alt_text: string,
  caption: string,
  description: string,
  media_type: string,
  media_details: any
}

export interface ImageSize {
  file: string,
  width: number,
  height: number,
  'mime-type': string,
  source_url: string
}

export interface ImageMediaDetails {
  width: number,
  height: number,
  file: string,
  sizes: {
    thumbnail: ImageSize,
    'portfolio-one-third': ImageSize,
    'portfolio-one-fourth': ImageSize
  },
  post: number,
  source_url: string
}

// action types
const INVALIDATE_NEWS = 'cse-patcher/news/INVALIDATE_NEWS';

const FETCH_NEXT_PAGE = 'cse-patcher/news/FETCH_NEXT_PAGE';
const FETCH_PAGE_SUCCESS = 'cse-patcher/news/FETCH_NEWS_SUCCESS';
const FETCH_PAGE_FAILED = 'cse-patcher/news/FETCH_NEWS_FAILED';

const postsPerPage = 6;

// sync actions
export function requestPage(page: number) {
  return {
    type: FETCH_NEXT_PAGE,
    page: page
  }
}

export function fetchPageSuccess(posts: Array<any>) {
  return {
    type: FETCH_PAGE_SUCCESS,
    posts: posts,
    receivedAt: Date.now()
  };
}

export function fetchPageFailed(error: Error) {
  return {
    type: FETCH_PAGE_FAILED,
    error: error
  };
}

// async actions

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    (<any>error).response = response;
    throw error;
  }
}

function parseJSON(response: any) {
  return response.json();
}

function makePostsUrl(page: number): string {
  return `http://camelotunchained.com/v2/wp-json/wp/v2/posts?per_page=${postsPerPage}&page=${page}?callback=foo`;
}

export function fetchPage(page: number) {
  return (dispatch: (action: any) => any) => {
    dispatch(requestPage(page));
    return fetch(makePostsUrl(page), {mode: 'cors'})
      .then(checkStatus)
      .then(parseJSON)
      .then((posts: Array<any>) => dispatch(fetchPageSuccess(posts)))
      .catch((error: Error) => dispatch(fetchPageFailed(error)));
  }
}

// reducer
const initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: <Date>null,
  nextPage: 0,
  posts: <Array<any>>[]
}

export default function reducer(state: any = initialState, action: any = {}) {
  switch(action.type) {
    case INVALIDATE_NEWS:
      return Object.assign({}, state, {
        didInvalidate: true,
        fetchedPageCount: 0
      });
    case FETCH_NEXT_PAGE:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_PAGE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        nextPage: state.nextPage + 1,
        lastUpdated: action.receivedAt,
        posts: state.posts.concat(action.posts)
      });
    case FETCH_PAGE_FAILED:
      return Object.assign({}, state, {
        
      });
    default: return state;
  }
}
