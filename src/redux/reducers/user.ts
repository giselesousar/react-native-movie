const INITIAL_STATE = {
    username: null,
}

type IAction = {
    type: string;
    payload: any
}

export default (state = INITIAL_STATE, action: IAction) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state, ...action.payload
            };
        case 'CLEAR_USER':
            return {
                ...state, ...INITIAL_STATE
            };
        default:
            return state;
    }
}