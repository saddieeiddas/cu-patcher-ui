/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

import {Post} from '../redux/modules/news';

export interface NewsItemProps {
  post: Post;
};

export interface NewsItemState {};

class NewsItem extends React.Component<NewsItemProps, NewsItemState> {
  public name: string = 'cse-patcher-news-item';  
  
  render() {
    return (
      <div className='card cse-patcher-news-item'>
        <div className='card-image waves-effect waves-block waves-light'>
          <image className='activator' src='images/other-bg.png' />
        </div>
        <div className='card-content'>
          <span className='card-title activator grey-text'
            dangerouslySetInnerHTML={{__html: `${this.props.post.title.rendered.split('–')[0]}<i class="material-icons right">more_vert</i>`}} />
          <p><a href='#'>Read full post</a></p>
        </div>
        <div className='card-reveal'>
          <span className='card-title activator grey-text'
              dangerouslySetInnerHTML={{__html: `${this.props.post.title.rendered.split('–')[0]}<i class="material-icons right">close</i>`}} />
          <p dangerouslySetInnerHTML={{__html: this.props.post.excerpt.rendered}} />
        </div>
      </div>
    );
  }
}

export default NewsItem;
