const apreducer = (state, action) => {
    console.log("ACTION: ", action.type);
    switch (action.type) {
        case "CONNECT": {
            console.log("connect state: ", state);
            state = {
                ...state
            }
            break;
        }

        case "REGISTER": {
            state = {
                ...state
            }
            break;
        }

        case "CONNECTED": {
            state = {
                ...state,
                wsState: action.type
            }
            break;
        }

        case "TRYING": {
            state = {
                ...state,
                calltrying: true
            }
            break;
        }

        case "RINGING": {
            state = {
                ...state,
                callringing: true
            }
            break;
        }

        case "TALKING": {
            state = {
                ...state,
                calltalking: true
            }
            break;
        }

        case "REGISTERED": {
            state = {
                ...state,
                regState: action.type
            }
            break;
        }

        case "TOGGLE_DIALPAD": {
            state = {
                ...state,
                dialpad: !state.dialpad
            }
            break;
        }

        case "TOGGLE_KEYPAD": {
            state = {
                ...state,
                keypad: !state.keypad
            }
            break;
        }

        case "DIAL": {
            state = {
                ...state,
                incall: true,
                dialpad: false
            }
            break;
        }

        case "QUICK_DIAL": {
            state = {
                ...state,
                incall: true
            }
            break;
        }

        case "HANGUP": {
            state = {
                ...state,
                incall: false,
                calltrying: false,
                callringing: false,
                calltalking: false
            }
            break;
        }

        case "INC_CALLTIMER": {
            state = {
                ...state,
                elapsed: (state.elapsed ? state.elapsed : 1) + 1
            }
            break;
        }

        case "RESET_CALLTIMER": {
            state = {
                ...state,
                elapsed: 0
            }
            break;
        }

        default:
            break;
    };
    return state;
};

export default apreducer;