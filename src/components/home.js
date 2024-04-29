import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-bootstrap';
import Dialer from './dialer';
import ProgressView from './progress';

import SIP from 'sip.js'
// import sip from '../lib/sip';
import * as Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Home extends Component {

    constructor(props) {
        super(props);
        this.config = {
            userAgentString: 'chandima',
            traceSip: true,
            register: true,
            uri: "100@172.20.10.100",
            password: "12345",
            rel100: SIP.C.supported.SUPPORTED,
            wsServers: "wss://172.20.10.100:8089/ws"
        };
        this.options = {
            media: {
                constraints: {
                    audio: true,
                    video: false
                }
            }
        }
    }

    componentWillMount() {

    }

    render() {
        // console.log('Props: ', this.props);
        // console.log('Props Children: ', this.props.children);
        if (!this.props.wsState) {
            console.log("WS not connected, connecting now.");
            this.props.apConnect(this.props, this.config);
        }
        return (
            <div>
                <Grid>
                    <Row>
                        <audio id="localMedia" />
                        <audio id="remoteMedia" />
                    </Row>
                    <Row>
                        <Col mdOffset={2} md={6}><ProgressView pstyle={this.props.wsState ? "warning" : "danger"} active={!this.props.wsState} label={this.props.wsState ? this.props.wsState : "CONNECTING"} now={this.props.wsState ? 100 : 50} /></Col>
                        <Col mdOffset={2} md={6}><ProgressView pstyle={this.props.regState ? "info" : "success"} active={!this.props.regState} label={this.props.regState ? this.props.regState : "REGISTERING"} now={this.props.regState ? 100 : 50} /></Col>
                        <Col md={10}><Dialer /></Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("Initial State: ",state);
    return { ...state };
};

const mapActionsToProps = (dispatch) => {
    console.log("Actions: ", Actions);
    return bindActionCreators(Actions, dispatch);
};


export default connect(mapStateToProps, mapActionsToProps)(Home);