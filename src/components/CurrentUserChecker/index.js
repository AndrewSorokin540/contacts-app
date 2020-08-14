import { useEffect, useContext, useState } from 'react';
import { useLocalStorage, useFetch } from 'hooks';
import { CurrentUserContext } from 'contexts';
import { getUserFromToken } from 'utils';


const CurrentUserChecker = ({ children }) => {

    const [responseReceived, setResponseReceived] = useState(false)
    const [token] = useLocalStorage('token');
    const [userId] = getUserFromToken(token)
    const [{ response }, doFetch] = useFetch(`/users/${userId}`)
    const [, setCurrentUserState] = useContext(CurrentUserContext)

    useEffect(() => {
        if (token) {
            doFetch();
            setCurrentUserState(state => ({
                ...state,
                loading: true
            }))
        }
    }, [token, doFetch, setCurrentUserState])

    useEffect(() => {
        if (response) {
            setResponseReceived(true)
            setCurrentUserState(state => ({
                ...state,
                loading: false,
                isLoggenIn: true,
                currentUser: {
                    ...state.currentUser,
                    email: response.email,
                    username: response.username,
                    id: response.id
                }
            }))
        }
    }, [response, doFetch, responseReceived, setCurrentUserState])

    return children;
}

export default CurrentUserChecker;