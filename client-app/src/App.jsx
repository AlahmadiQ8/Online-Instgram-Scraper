import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import { parseItems } from './lib/parser.js';
import { getInstaInfo } from './lib/service.js';

import { SearchForm } from './components/SearchForm.jsx';
import ImageCard from './components/ImageCard.jsx';

const Header = ({children}) => (
  <div className="jumbotron text-center">
    <h1 className="display-3">{children}</h1>
    <p className="lead">Get statistics about your instgram account</p>
    <hr className="my-4"/>
    <p>Only works on public accounts</p>
  </div>
);

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

  state = {
    inputText: '',
    loading: false,
    error: '',
    status: '',
    items: []
  }

  updateStates = ({items, more}) => {
    this.setState({
      status: items.length,
      loading: more,
      items: items
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
      });
    } catch(err) {
      this.setState({error: err.message, loading: false, status: err.toString()});
    }
  }

  render() {
    return (
      <div>
        <Header>
          Instalyzer!
        </Header>

        <Column classes='col-4'>
          <SearchForm
            value={this.state.inputText}
            handleInputChange={ e =>this.setState({inputText:e.target.value})}
            handleSubmit={this.handleSubmit}
            disabled={this.state.loading}>
          </SearchForm>

          {this.state.error && <Alert message={this.state.error} type='danger' />}
          {this.state.loading &&
            <Alert message={`Loading... ${this.state.status}`} type='info'/>}

        </Column>

        <Column classes='col-md-11 d-flex flex-wrap justify-content-center'>
          <ImageCard></ImageCard>
          <ImageCard></ImageCard>
          <ImageCard></ImageCard>
          <ImageCard></ImageCard>
          <ImageCard></ImageCard>
          <ImageCard></ImageCard>
          <ImageCard></ImageCard>
        </Column>

      </div>
    );
  }
}

export default App;
