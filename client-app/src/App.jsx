import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import { parseItems } from './lib/parser.js';
import { getInstaInfo } from './lib/service.js';

import { SearchForm } from './components/SearchForm.jsx';
import { ImageCard } from './components/ImageCard.jsx';
import FilterForm from './components/FilterForm.jsx';

const Column = ({children, classes}) => (
  <div className="container">
    <div className="row justify-content-center">
      <div className={classes || ''}>
        {children}
      </div>
    </div>
  </div>
);

const Alert = ({message, type}) => (
  <div className={`alert alert-${type || 'info'}`} role="alert">
    {message}
  </div>
);

class App extends Component {

  increment = 10

  state = {
    inputText: '',
    loading: false,
    error: '',
    status: '',
    items: [],
    endIndex: 10,
  }

  updateStates = (items, more) => {
    this.setState({
      status: items.length,
      items: more ? [] : items
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({loading: true, status: '', error: ''});
    try {
      await getInstaInfo(this.state.inputText, this.updateStates);
      this.setState({
          inputText: '',
          error: '',
          loading: false,
          endIndex: 10
      });
    } catch(err) {
      this.setState({error: err.message, loading: false, status: err.toString()});
    }
  }

  handleFilter = (e) => {
    switch (e.target.value) {
      case 'comments':
        this.setState((prevState, props) => {
          return {items: prevState.items.slice().sort((a, b) => parseInt(b.comments_count) - parseInt(a.comments_count))}
        })
        break;
      case 'likes':
        this.setState((prevState, props) => {
          return {items: prevState.items.slice().sort((a, b) => parseInt(b.likes_count) - parseInt(a.likes_count))}
        })
        break;
      default:
        this.setState((prevState, props) => {
          return {items: prevState.items.slice().sort((a, b) => parseInt(b.created_time) - parseInt(a.created_time))}
        })
    }
  }

  handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.setState((prevState, props) => ({
        endIndex: prevState.endIndex + this.increment
      }))
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const images = this.state.items.slice(0,this.state.endIndex).map((item) => (
      <ImageCard
        key={item.id}
        imgUrl={item.images.low_resolution.url}
        link={item.link}
        likesCount={item.likes_count}
        createTime={item.created_time}
        commentsCount={item.comments_count}
        videoViews={item.video_views}
      />
    ));

    return (
      <div>

        <Column classes='col-4'>
          <SearchForm
            value={this.state.inputText}
            handleInputChange={ e =>this.setState({inputText:e.target.value})}
            handleSubmit={this.handleSubmit}
            disabled={this.state.loading}>
          </SearchForm>

          {this.state.error && <Alert message={this.state.error} type='danger' />}
          {(this.state.items.length !== 0) && !this.state.loading
            && <FilterForm handleFilter={this.handleFilter}></FilterForm>}
        </Column>

        <Column classes='col-md-12 d-flex flex-wrap justify-content-center'>
          {this.state.items && images}
          {this.state.loading
            && <Alert message={`Loading... ${this.state.status}`} type='info'/>}
        </Column>


      </div>
    );
  }
}

export default App;


