
import React from 'react';

export default (props) => (
  <form onChange={props.handleFilter} className=''>
    <legend>Filter By</legend>
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
  </form>
)