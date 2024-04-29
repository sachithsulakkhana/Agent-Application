import sip from "../lib/sip";

export const apConnect = (props, config) => {
    console.log("Connection Action");
    return (dispatch) => {
        return dispatch({
            type: "CONNECT",
            payload: sip.doConnect(props, config)
        });
    };
};

export const apRegister = () => {
    console.log("Register Action");
    return (dispatch) => {
        return dispatch({
            type: "REGISTER",
            payload: sip.doRegister()
        });
    };
};

export const apDial = (uri, options, dtype, mType = "", mGateway="", mConferenceId = "", mGroupId = "") => {
    console.log("Dial Action");
    const type = (dtype === "dial") ? "DIAL" : "QUICK_DIAL";
    return (dispatch) => {
        return dispatch({
            type: type,
            payload: sip.doCall(uri, options)
        });
    };
};

export const apHangup = () => {
    console.log("Hangup Action");
    return (dispatch) => {
        return dispatch({
            type: "HANGUP",
            payload: sip.endCall()
        });
    };
};

export const apDialerStatus = (status) => {
    console.log("Dialer Status");
    return (dispatch) => {
        return dispatch({
            type: status
        });
    };
};

export const toggleDialpad = () => {
    return (dispatch) => {
        return dispatch({
            type: "TOGGLE_DIALPAD"
        });
    };
};

export const toggleKeypad = () => {
    return (dispatch) => {
        return dispatch({
            type: "TOGGLE_KEYPAD"
        });
    };
};

export const incCalltimer = () => {
    return (dispatch) => {
        return dispatch({
            type: "INC_CALLTIMER"
        });
    };
};

export const resetCalltimer = () => {
    return (dispatch) => {
        return dispatch({
            type: "RESET_CALLTIMER"
        });
    };
};
