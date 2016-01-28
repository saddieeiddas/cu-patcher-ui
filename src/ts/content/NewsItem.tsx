/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

import {Post} from '../redux/modules/news';
import Animate from '../Animate';

export interface NewsItemProps {
  post: Post;
};

export interface NewsItemState {
  showFullArticle: boolean;
};

class NewsItem extends React.Component<NewsItemProps, NewsItemState> {
  public name: string = 'cse-patcher-news-item';
  
  constructor(props: NewsItemProps) {
    super(props);
    this.state = {
      showFullArticle: false
    };
  }
  
  showFullArticle = () => {
    this.setState({
      showFullArticle: true
    });
  }
  
  hideFullArticle = () => {
    this.setState({
      showFullArticle: false
    });
  }
  
  
    
  render() {
    const {post} = this.props;
    const title = post.title.rendered.split('&#8211;')[0].split('–')[0];
    const dateString = new Date(post.date).toLocaleString();
    
    let fullArticle: any = null;
    if (this.state.showFullArticle) {
      fullArticle = (
        <div key='0' className='full-page'>
          <div className='article-content card-panel'>
            <span className='card-title grey-text' onClick={this.hideFullArticle}
              dangerouslySetInnerHTML={{__html: `${title}<i class="material-icons right">close</i><p>${dateString}</p>`}} />
            <div className='words' dangerouslySetInnerHTML={{__html: post.content.rendered}} />
          </div>
        </div>
      );
    }
    
    var c = document.createElement('div');
    c.innerHTML = post.content.rendered;
    c.getElementsByTagName('img');
    let images = c.getElementsByTagName('img');
    let imgSrc: any = 'images/other-bg.png';
    let imgClass: any = 'wide';
    let imgWidth: any = 500;
    if (images.length > 0) {
      let img = images[images.length-1];
      imgSrc = img.src;
      imgWidth = img.width;
      if(img.width / img.height <= 1) imgClass = 'tall'
    }
    console.log(imgSrc);
    
    return (
      <div>
        <div className='card'>
          <div className='card-image waves-effect waves-block waves-light'>
            <img className={`activator ${imgClass}`} src={imgSrc} style={{marginLeft: `-${imgWidth/2}px`}} />
          </div>
          <div className='card-content'>
            <span className='card-title activator grey-text front-title'
              dangerouslySetInnerHTML={{__html: `${title}<i class="material-icons right">more_vert</i>`}} />
            <p className='date grey-text activator'>{dateString}</p>
            <p><a href='#' className='read-full' onClick={this.showFullArticle}>Read full post</a></p>
          </div>
          <div className='card-reveal'>
            <span className='card-title activator grey-text'
                dangerouslySetInnerHTML={{__html: `${title}<i class="material-icons right">close</i>`}} />
            <p dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />
          </div>
        </div>
        <Animate animationEnter='bounceInUp' animationLeave='bounceOutDown'
          durationEnter={700} durationLeave={500}>
          {fullArticle}
        </Animate>
      </div>
    );
  }
}

export default NewsItem;
