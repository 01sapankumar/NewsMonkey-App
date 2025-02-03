import React, { Component } from 'react'
export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date, source } = this.props;
    return (
      <div className="my-3">
      <div className="card" >
    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'92%', zIndex:'1'}}>{source}</span>
        <img src={!imageurl ? "https://www.reuters.com/resizer/v2/KUFWP4MUKVLMDPQEGZPIS6EYJM.jpg?auth=c7546ac46f6c2a385ba53652358fccc28d191c4c68fae9c78e233cd3df354d3c&height=1005&width=1920&quality=80&smart=true" : imageurl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <small className="text-body-secondary">By- {!author ? "Unknown" : author} On {new Date(date).toGMTString()}</small>
          <a href={newsurl} target="_blank" className="btn btn-dark">Read-more</a>
        </div>
      </div>
      </div>
    )
  }
}

export default NewsItem
