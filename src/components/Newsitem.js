import React, { Component } from "react";

export default class Newsitem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props
        return (
            <>
                <div className="my-3">
                    <div className="card" style={{ width: '18rem' }}>
                        <img src={!imageUrl ? "https://c.ndtvimg.com/2023-01/3lv6g6e_rahul-gandhi-bharat-jodo-yatra-kashmir-pti-650_650x400_27_January_23.jpg" : imageUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"> {title} </h5>
                            <p className="card-text"> {description} </p>

                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:'1'}}>
                                {source}
                                <span className="visually-hidden">unread messages</span>
                            </span>

                            {/* <div style={{
                                display:'flex',
                                justifyContent:'flex-end',
                                position:'absolute',
                                right:'0'
                            }}>
                                <span className="badge rounded-pill bg-danger">
                                    {source}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </div> */}


                            <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>

                            <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}