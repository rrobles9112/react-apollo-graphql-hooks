import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

const initialState = {
    isAuthenticated: localStorage.getItem('token') !== null ? true : false,
    token: '',
};


const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTHENTICATION':
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
            };
        default:
            return state;
    }
};

const useValue = () => useReducer(reducer, initialState);

export const {
    Provider,
    useTrackedState,
    useUpdate: useDispatch,
} = createContainer(useValue);
