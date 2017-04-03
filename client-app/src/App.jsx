import React, { Component } from 'react';


var foo = "a" + "b";

const Header = ({children}) => (
  <div className="jumbotron text-center">
    <h1 className="display-3">{children}</h1>
    <p className="lead">Get statistics about your instgram account</p>
    <hr className="my-4"/>
    <p>Only works on public accounts</p>
  </div>
  );

const Column = ({children, cols}) => (
  <div className="container">
    <div className="row justify-content-center">
      <div className={cols || 'col-5'}>
        {children}
      </div>
    </div>
  </div>
  );

class App extends Component {

  constructor() {
    super()
  }

  state = {
    output: '',
    value: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({output: this.state.value});
    this.setState({value: ''});
  }

  render() {
    return (
      <div>
        <Header>
          Instalyzer!
        </Header>

        <Column cols='col-4'>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input value={this.state.value} onChange={(e)=>this.setState({value:e.target.value})} type="text" className="form-control" id="searchuser" placeholder="Enter a username"/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
          </form>
        </Column>
        
        <Column cols='col-5'>
          <pre>{this.state.output}</pre>
        </Column>

      </div>
    );
  }
}

export default App;
