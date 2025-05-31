import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import propTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component
{
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string,
    }

        constructor(props)
        {
            super(props);
            this.state={
                articles:[],
                loading: true,
                page: 1,
                totalResults: 0
                
            }
        }

        async updateNews()
        {
            this.props.setProgress(10);

            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a392f12804247379e2c95499b9c5a93&page=${this.state.page}&pageSize=${this.props.pageSize}`;
                const data = await fetch(url);
                this.props.setProgress(30);

                this.setState({loading:true});
                const parsedjson = await data.json();
                this.props.setProgress(70);
                
                this.setState({ articles: parsedjson.articles, totalResults: parsedjson.totalResults, loading: false });   //this.setState({articles:parsedData.articles})
                this.props.setProgress(100);
        }
        
        async componentDidMount()
        {
            this.updateNews()    
        }

        handlePrev =async()=>
        {
            this.setState({page:this.state.page-1})
            this.updateNews()
        }

        handleNext =async()=>
        {
            this.setState({page:this.state.page+1})
            this.updateNews()
        }

        fetchMoreData =async()=>
        {
               this.setState({page:this.state.page+1})
               let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
                const data = await fetch(url);
                const parsedjson = await data.json();
                this.setState({ articles: this.state.articles.concat(parsedjson.articles), totalResults: parsedjson.totalResults, loading: false });
        }

        render()
        {

            return(
                <>
                <div className="container my-3">
                    <h1>News TopHeadlines</h1>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length!==this.state.totalResults}
                loader={<Spinner />}
                scrollableTarget="scrollableDiv">

                    <div className="container">
                    <div className="row">
                        {this.state.articles?.map((element,index) => {

                            return <div className="col-md-4" key={index}>
                                <Newsitem title={element.title?element.title.slice(0,45):" "} description={element.description?element.description.slice(0,80):" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>       
                        })}

                    </div>
                    </div>
            </InfiniteScroll>

                    {/* {this.state.loading  && <Spinner/>} */}
                    {/* <div className="row">
                        {!this.state.loading && this.state.articles?.map((element)=> {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title?element.title.slice(0,45):" "} description={element.description?element.description.slice(0,80):" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div> */}

                </div>

                {/* <div className="container d-flex justify-content-between">
                    <button  disabled={this.state.page<=1} type="button" className="btn btn-warning" onClick={this.handlePrev}>&larr; Previous</button>
                    <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-warning" onClick={this.handleNext}>Next &rarr;</button>
                </div> */}


                </>
            )
        }
}