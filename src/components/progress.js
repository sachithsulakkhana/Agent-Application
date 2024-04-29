import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

class ProgressView extends Component {
    render() {
        return (
            <div>
              <ProgressBar bsStyle={this.props.pstyle} label={this.props.label} active={this.props.active} striped={this.props.active} now={this.props.now} min={0}/>                
            </div>
        );
    }
}

export default ProgressView;