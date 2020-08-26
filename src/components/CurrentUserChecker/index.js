import { useEffect, useContext } from 'react';
import { useLocalStorage, useFetch } from 'hooks';
import { CurrentUserContext } from 'contexts';
import { getUserFromToken } from 'utils';

const CurrentUserChecker = ({ children }) => {

    const [token] = useLocalStorage('token');
    const [userId] = getUserFromToken(token);
    const [{ response }, doFetch] = useFetch(`/users/${userId}`);
    const [, setCurrentUserState] = useContext(CurrentUserContext);

    useEffect(() => {
        if (token) {
            doFetch();
        }
    }, [token, doFetch, setCurrentUserState, userId])

    useEffect(() => {
        if (response) {
            setCurrentUserState(state => ({
                ...state,
                isLoggenIn: true,
                currentUser: {
                    email: response.email,
                    id: response.id,
                    contacts: response.contacts ? response.contacts : []
                }
            }))
        }
    }, [response, doFetch, setCurrentUserState])

    return children;
}

export default CurrentUserChecker;