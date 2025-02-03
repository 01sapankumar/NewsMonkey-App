
import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 5,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8d7778fbb9604a2e9fbc89b8c7d52a6e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })

    }
    async componentDidMount() {
        this.updateNews();
    }
    handleprevious = async () => {
        this.setState({
            page: this.state.page - 1
        });
        this.updateNews()
    }
    handlenext = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews()
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8d7778fbb9604a2e9fbc89b8c7d52a6e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };
    render() {
        return (
            <>
                    <h1 className="text-center" style={{ margin: '40px 0px', marginTop: '90px' }}>NewsMonkey-Top headline</h1>
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<h4>Loading...</h4>}
                    >
                        <div className="container" >
                        <div className="row">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 45) : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}
                                        source={element.source.name} />
                                </div>
                            })}
                        </div>
                        </div>
                        </div>
                    </InfiniteScroll>
            </>
        )
    }
}
