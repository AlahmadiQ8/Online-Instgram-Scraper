import React from 'react';

export const SearchForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div className="form-group">
      <input value={props.value} onChange={props.handleInputChange} type="text" className="form-control" id="searchuser" placeholder="Enter a username"/>
      <small id="emailHelp" className="form-text text-muted">{props.children}</small>
    </div>
  </form>
);

SearchForm.propTypes = {
  value: React.PropTypes.string.isRequired,
  handleInputChange: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
}