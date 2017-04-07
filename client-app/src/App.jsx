import React, { Component } from 'react';
import axios from 'axios'; 
import classNames from 'classnames';

import { parseItems } from './lib/parser.js';

import { SearchForm } from './components/SearchForm.jsx';

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
)

class App extends Component {

  constructor() {
    super()
  }

  state = {
    output: '',
    inputText: '', 
    loading: false,
    error: '',
    status: '',
    items: []
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({loading: true, output: '', error: ''});
    try {
      const {data} = await axios.get(`/get-data/${this.state.inputText}`,);
      const parsed = parseItems(data.items);
      this.setState({
          output: JSON.stringify(parsed),
          inputText: '',
          loading: false,
          error: '',
          items: [...this.state.items, ...parsed]
      });
    } catch(err) {
      this.setState({error: err.message, loading: false});
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
            handleSubmit={this.handleSubmit}>
          Only works on public accounts
          </SearchForm>

          {this.state.error && <Alert message={this.state.error} type='danger' />}
        </Column>
        
        <Column classes='col-5'>
          <div className="text-center">{this.state.loading && 'loading'}</div>
          <pre>{this.state.output}</pre>
        </Column>

      </div>
    );
  }
}

export default App;
