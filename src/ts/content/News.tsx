/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

import NewsItem from './NewsItem';
import {Post} from '../redux/modules/news';

export interface NewsProps {
  isFetching: boolean;
  didInvalidate: boolean;
  lastUpdated: Date;
  nextPage: number;
  posts: Array<any>;
  fetchPage: (page: number) => any;
};

export interface NewsState {};

class News extends React.Component<NewsProps, NewsState> {
  public name: string = 'cse-patcher-news';
  
  componentDidMount() {
    if (this.props.posts.length == 0) {
      this.props.fetchPage(this.props.nextPage);
    }
  }
  
  renderNewsItem = (post: Post) => {
    return (
      <div className='col s4 m4 l3' key={post.id}>
        <NewsItem post={post} />
      </div>
    );
  }
  
  render() {
    return (
      <div id={this.name} className='main-content'>
        <div className='content-area row'>
          {this.props.posts.map(this.renderNewsItem)}
        </div>
      </div>
    );
  }
};

export default News;
