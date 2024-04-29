import React, { Component } from 'react';
import * as Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Grid, Glyphicon, Row, Col, Panel, FormGroup,  FormControl, InputGroup } from 'react-bootstrap';
import Incall from './incall';

class Dialer extends Component {

    constructor(props) {
        super(props);
        this.options = {
            media: {
                constraints: {
                    audio: true,
                    video: false
                }
            }
        };
        this.state = {
            phone: "demo2",
            type:"sip",
            conferenceId : "",
            gateway: "indiaDomestic",
            groupId : "",
            incall: false
        }
    }

    handleQuickdial(e) {
        console.log(this.state.phone);

        let extraHeaders = [];
        if( this.state.type ){
            extraHeaders.push(`CallType: ${this.state.type}`);
        }
        if( this.state.type === "pstn" && this.state.gateway ){
            extraHeaders.push(`Gateway: ${this.state.gateway}`);
        }
        if( this.state.type === "conference" && this.state.conferenceId ){
            extraHeaders.push(`ConferenceId: ${this.state.conferenceId}`);
        }
        if( this.state.type === "group" && this.state.groupId ){
            extraHeaders.push(`GroupId: ${this.state.groupId}`);
        }
        
        this.options.extraHeaders = extraHeaders;
        this.uri = 'sip:' + this.state.phone + '@100.172.16.1.1';
        this.state.phone.length > 0 ? this.props.apDial(this.uri, this.options, 'dial' )  : console.log("No Number to dial");
        this.setState({incall : true});
    }

    handleInputChange(e) {
        this.setState({ phone: e.target.value });
    }
    handleGatewayChange(e) {
        this.setState({ gateway: e.target.value });
    }

    handleConferenceChange(e) {
        this.setState({ conferenceId: e.target.value });
    }
    handleGroupChange(e) {
        this.setState({ groupId: e.target.value });
    }
    handleTypeChange(e) {

        this.setState({ type: e.target.value });
    }
    

    render() {
        return (
            <div>
                <Panel header="Dialer" bsStyle="success">
                    <Grid>
                        <Row>
                            <Col mdOffset={2} md={4}>
                                <FormGroup bsSize="large">
                                    <InputGroup>
                                        <FormControl value={this.state.phone} onChange={this.handleInputChange.bind(this)} placeholder="enter phone number" type="text" />
                                        <InputGroup.Button>
                                            <Button bsStyle="success" bsSize="large" onClick={this.handleQuickdial.bind(this)}> Quick Dial <Glyphicon glyph="phone" /></Button>
                                        </InputGroup.Button>
                                    </InputGroup>
                                </FormGroup>
                                <FormControl
                                ref={select => { this.select = select }}
                                componentClass="select"
                                disabled={this.state.added}
                                onChange={this.handleTypeChange.bind(this)}
                                >
                                    <option value="sip">SIP/WEB</option>
                                    <option value="pstn">PSTN</option>
                                    <option value="conference">Conference</option>
                                    <option value="group">Group</option>
                                </FormControl>
                                { this.state.type === "pstn" && <FormControl
                                ref={select => { this.select = select }}
                                componentClass="select"
                                onChange={this.handleGatewayChange.bind(this)}
                                disabled={this.state.added}
                                >
                                    <option value="indiaDomestic">IndiaDomestic</option>
                                    <option value="usInternational">UsInternational</option>
                                </FormControl>
                                }

                                { this.state.type === "conference" &&
                                <div>
                                  <FormControl value={this.state.conferenceId} onChange={this.handleConferenceChange.bind(this)} placeholder="conferenceId" type="text" />
                                </div>
                                }
                                { this.state.type === "group" &&
                                <div>
                                  <FormControl value={this.state.groupId} onChange={this.handleGroupChange.bind(this)} placeholder="groupId" type="text" />
                                </div>}
                            </Col>
                        </Row>
                    </Grid>
                </Panel>
                {this.props.incall &&   <Incall phone={this.state.phone} /> }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log("Initial State: ",state);
    return { ...state };
};

const mapActionsToProps = (dispatch) => {
    console.log("Actions: ", Actions);
    return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Dialer);
