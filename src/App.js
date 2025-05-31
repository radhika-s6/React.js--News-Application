import React, { Component } from "react";
import News from "./components/News";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component
{
  pageSize=10;
  apiKey=process.env.REACT_APP_API;

  state={progress:0}
  setProgress=(progress)=>
  {
    this.setState({progress:progress})
  }

  render()
  {
    return(
      <>

      <Navbar />

      <LoadingBar
      color= '#f11946'
      progress={this.state.progress}
      height={3}
      />
      

      <Routes>
      <Route exact path="/business" element={<News key="business" setProgress={this.setProgress} apiKey={this.apiKey} page={this.pageSize} country="in" category="business" />} />
      <Route exact path="/entertainment" element={<News key="entertainment" setProgress={this.setProgress} apiKey={this.apiKey} page={this.pageSize} country="in" category="entertainment" />} />
      <Route exact path="/general" element={<News key="general" setProgress={this.setProgress} apiKey={this.apiKey} page={this.pageSize} country="in" category="general" />} />
      <Route exact path="/health" element={<News key="health" setProgress={this.setProgress} apiKey={this.apiKey} page={this.pageSize} country="in" category="health" />} />
      <Route exact path="/science" element={<News key="science" setProgress={this.setProgress} apiKey={this.apiKey} page={this.pageSize} country="in" category="science" />} />
      <Route exact path="/sports" element={<News key="sports" setProgress={this.setProgress} apiKey={this.apiKey} page={this.pageSize} country="in" category="sports" />} />
      <Route exact path="/tech" element={<News key="technology" setProgress={this.setProgress} apiKey={this.apiKey} page={this.pageSize} country="in" category="technology" />} />
    </Routes>
      
      </>
    )
  }
}
