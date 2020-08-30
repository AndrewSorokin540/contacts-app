import React, { createContext, useReducer } from 'react';

const initialState = {
    loading: false,
    isLoggenIn: false,
    currentUser: {
        contacts: []
    }
}

const reducer = (state, action) => {
    console.log(state, action)
    switch (action.type) {
        case 'LOADING_START':
            return {
                ...state,
                loading: true
            }

        case 'LOADING_DONE':
            return {
                ...state,
                loading: false
            }

        case 'SET_AUTHORIZED':
            return {
                ...state,
                isLoggenIn: true,
                currentUser: action.payload
            }
        case 'SET_UNAUTHORIZED':
            return {
                ...state,
                isLoggenIn: false,
                currentUser: {
                    contacts: []
                }
            }

        default:
            return state;
    }
}

const CurrentUserContext = createContext();

const CurrentUserProvider = ({ children }) => {
    const value = useReducer(reducer, initialState)

    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export { CurrentUserContext, CurrentUserProvider };