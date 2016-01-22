/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

export interface NewsProps {
};

export interface NewsState {
  content: Array<any>;
  index: number;
  busy: number;
}

export class News extends React.Component<NewsProps, NewsState> {
  public name: string = 'cse-patcher-news';

  constructor(props: NewsProps) {
    super(props);
    this.state = {
    	content: [],
    	index: 1,
    	busy: 0
    };
  }

	public componentDidMount() {
		// document.getElementById('cse-patcher-content').addEventListener('scroll', this.handleScroll.bind(this));
		// document.getElementById('fullShow').addEventListener('scroll', this.handleViewScroll);
		// document.getElementById('closeWindow').addEventListener('click', this.handleClose);
		// var request = new XMLHttpRequest();
		// request.open('GET', "http://camelotunchained.com/v2/wp-json/wp/v2/posts?per_page=12&page=1&jsonp?callback=foo", true);

		// request.onload = function() {
		//   if (request.status >= 200 && request.status < 400) {
		// 	var result = JSON.parse(request.responseText);
		// 	this.setState({content: result});
		//   } else {

		//   }
		// }.bind(this);

		// request.onerror = function() {
		// };

		// request.send();
	  }
	  
	public componentWillUnmount() {
		// document.getElementById('cse-patcher-content').removeEventListener('scroll', this.handleScroll);
		// document.getElementById('closeWindow').removeEventListener('click', this.handleClose);
		// document.getElementById('fullShow').removeEventListener('scroll', this.handleViewScroll);
	}
	
	public handleViewScroll(event: any){
		document.getElementById('closeWindow').style.top = 38 + event.srcElement.scrollTop + 'px'
	}
	
	public handleClose(event: any) {
		var j = document.getElementById("fullShow")
		var z = document.getElementById("fullText")
		document.getElementById('data').style.padding = "0 0 0 0"
		document.body.style.overflow = "auto";
		j.scrollTop = 0
		j.style.transform = "scale(0)";
		z.style.transform = "scale(0)";
		z.style.opacity = '0';
	}

	public handleScroll(event: any) {
		
		var scrollTop = event.srcElement.scrollTop;
		var containerHeight = document.getElementById('newsAppl').clientHeight;
		var total = Math.abs(scrollTop / (containerHeight - window.innerHeight) * 100);
		var index = this.state.index
		var busy = this.state.busy
		console.log(total)
		if( total >= 80 && busy == 0){
			this.setState({
        content: this.state.content,
        index: index+=1,
        busy: 1,
      });
			
			var request = new XMLHttpRequest();
			request.open('GET', "http://camelotunchained.com/v2/wp-json/wp/v2/posts?per_page=12&page=" + index, true);

			request.onload = function() {
			  if (request.status >= 200 && request.status < 400) {
				var result = JSON.parse(request.responseText);
				  var content = this.state.content;
				  for(var i=0;i<result.length;i++){
					content = content.concat(result[i]);
				  }
				  this.setState({
            content: content,
            busy: 0,
            index: this.state.index
          });
			  } else {

			  }
			}.bind(this);

			request.onerror = function() {
			};

			request.send();
		}
	}
	
	public handleClick(event: any){
		var rect = event.currentTarget.getBoundingClientRect();
		var j = document.getElementById("fullShow")
		var z = document.getElementById("fullText")
		document.getElementById('data').style.padding = "0 12px 0 0"
		var t = j.style.top = "0px";
		var u = j.style.left = "0px";
		
		j.style.transformOrigin = parseInt(rect.left + (rect.width / 2))+"px "+parseInt(rect.top + (rect.height / 2))+"px";
		
		window.setTimeout(function(){
			j.style.transform = "scale(1)";
			z.style.transform = "scale(1)";
			z.style.opacity = '1';
		}, 10);
		var text = event.currentTarget.getAttribute('data-text');
		document.getElementById('fullText').innerHTML = text
		document.body.style.overflow = "hidden";
		
	}
	
	render() {
    return <div>News</div>;
    
		var url = "newsImg.php?url=http://camelotunchained.com/v2/wp-json/wp/v2/media/"
		return (
		
		  <ul id="newsAppl" className="newsApp">
			{
				
				this.state.content.map(function(news: any){
					if(news.featured_image == 0){
						news.featured_image = 5861
					}
					news.excerpt.rendered = news.excerpt.rendered.replace(/(<p>|<\/p>)/g, "");
					return <li onClick={this.handleClick} key={news.id} data-text={news.content.rendered} className="newsArticle"><img src={url+news.featured_image}></img><div className="coverDarken"></div><div className="newsContainer"><div className="newsTitle" dangerouslySetInnerHTML = {{__html: news.title.rendered}}></div><div className="newsExcerpt" dangerouslySetInnerHTML = {{__html: news.excerpt.rendered}}></div></div></li>
				}.bind(this))
			}
		  </ul>
		)
	  }
};


export default News;
