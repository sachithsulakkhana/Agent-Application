import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedin : true
        };
    }

    render() {
        return <Redirect to="/home" />;
    }
}

export default Login;