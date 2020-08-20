import { useEffect, useContext } from 'react';
import { useLocalStorage, useFetch } from 'hooks';
import { CurrentUserContext } from 'contexts';
import { getUserFromToken } from 'utils';

const CurrentUserChecker = ({ children }) => {

    const [token] = useLocalStorage('token');
    const [userId] = getUserFromToken(token)
    const [{ response }, doFetch] = useFetch()
    const [, setCurrentUserState] = useContext(CurrentUserContext)

    useEffect(() => {
        if (token) {
            doFetch({}, `/users/${userId}`);
            setCurrentUserState(state => ({
                ...state,
                loading: true
            }))
        }
    }, [token, doFetch, setCurrentUserState, userId])

    useEffect(() => {
        if (response) {
            console.log(123, response)
            setCurrentUserState(state => ({
                ...state,
                loading: false,
                isLoggenIn: true,
                currentUser: {
                    ...state.currentUser,
                    email: response.email,
                    id: response.id,
                    contacts: response.contacts
                }
            }))
        }
    }, [response, doFetch, setCurrentUserState])

    return children;
}

export default CurrentUserChecker;