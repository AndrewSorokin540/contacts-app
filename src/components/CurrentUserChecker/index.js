import { useEffect, useContext } from 'react';
import { useLocalStorage, useFetch } from 'hooks';
import { CurrentUserContext } from 'contexts';
import { getUserFromToken } from 'utils';

const CurrentUserChecker = ({ children }) => {

    const [token] = useLocalStorage('token');
    const [userId] = getUserFromToken(token);
    const [{ response }, doFetch] = useFetch(`/users/${userId}`);
    const [, dispatch] = useContext(CurrentUserContext);

    useEffect(() => {
        if (token) {
            dispatch({ type: 'LOADING_START' })
            doFetch();
        }
    }, [token, doFetch, dispatch])

    useEffect(() => {
        if (response) {
            console.log(2222222, response)
            dispatch({
                type: 'SET_AUTHORIZED',
                payload: {
                    email: response.email,
                    id: response.id,
                    contacts: response.contacts ? response.contacts : []
                }
            })
            dispatch({ type: 'LOADING_DONE' })
        }
    }, [response, doFetch, dispatch])

    return children;
}

export default CurrentUserChecker;