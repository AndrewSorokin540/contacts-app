import React, { createContext, useState } from 'react';

const CurrentUserContext = createContext([{}, () => { }]);

const CurrentUserProvider = ({ children }) => {
    const [state, setState] = useState({
        loading: false,
        isLoggenIn: null,
        currentUser: {
            contacts: []
        }
    })

    return (
        <CurrentUserContext.Provider value={[state, setState]}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export { CurrentUserContext, CurrentUserProvider };