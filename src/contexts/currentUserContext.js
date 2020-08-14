import React, { createContext, useState } from 'react';

const CurrentUserContext = createContext([{}, () => { }]);

const CurrentUserProvider = ({ children }) => {
    const [state, setState] = useState({
        loading: false,
        isLoggenIn: null,
        currentUser: null
    })
    console.log('CURRENT_USER_CONTEXT', state);
    return (
        <CurrentUserContext.Provider value={[state, setState]}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export { CurrentUserContext, CurrentUserProvider };