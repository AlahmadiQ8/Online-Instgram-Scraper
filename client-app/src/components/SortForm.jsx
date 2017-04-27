
import React, { Component } from 'react';

export default class extends Component {

  submitHandler = (e) => {
    e.preventDefault()
    this.props.handleSort(e)
  }

  render() {
    return (
      <form onChange={this.props.handleSort} onSubmit={this.submitHandler} className=''>
        <legend>Sort By</legend>
        <div className="form-check form-check-inline">
          <label className="form-check-label">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="likes"/> likes
          </label>
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="comments"/> comments
          </label>
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="date" defaultChecked={true}/> date
          </label>
        </div>
        <div className="form-check">
          <input type="submit" className="btn btn-sm btn-custom" value='Reverse'/>
        </div>
      </form>
    );
  }
}



