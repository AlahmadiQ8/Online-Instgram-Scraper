import React, { Component } from 'react';
import Clipboard from 'clipboard';

export default class extends Component {
  static propTypes = {
    handleClick: React.PropTypes.func.isRequired,
    items: React.PropTypes.array.isRequired,
    showJson: React.PropTypes.bool.isRequired,
  }

  componentDidMount() {
    let clipboard = new Clipboard('#copy');
    clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
    this.jsonOutput = JSON.stringify(this.props.items);
  }

  componentWillReceiveProps(nextProps) {
    this.jsonOutput = JSON.stringify(nextProps.items);
  }

  render() {
    const buttonText = !this.props.showJson ? 'Show Json' : 'Hide Json';
    return (
      <div className=''>
        <button type="button" onClick={this.props.handleClick}  className="btn btn-sm btn-outline-custom mt-2">{buttonText}</button>

        <div className="text-left json-container">
          <button id='copy' className='btn btn-sm btn-custom' data-clipboard-target="#json-output">copy</button>
          {this.props.showJson &&
            <pre className='display-json my-3 px-2 py-2'><code id='json-output'>{this.jsonOutput}</code></pre>}
        </div>
      </div>
    );
  }
}
