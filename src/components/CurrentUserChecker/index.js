import { useEffect, useContext } from 'react';
import { useLocalStorage, useFetch } from 'hooks';
import { CurrentUserContext } from 'contexts';
import { loadingStart, setAuthorized, loadingDone } from 'actions';
import { getUserFromToken } from 'utils';

const CurrentUserChecker = ({ children }) => {

    const [token] = useLocalStorage('token');
    const [userId] = getUserFromToken(token);
    const [{ response }, doFetch] = useFetch(`/users/${userId}`);
    const [, dispatch] = useContext(CurrentUserContext);

    useEffect(() => {
        if (token) {
            dispatch(loadingStart())
            doFetch();
        }
    }, [token, doFetch, dispatch])

    useEffect(() => {
        if (response) {
            dispatch(setAuthorized({
                email: response.email,
                id: response.id,
                contacts: response.contacts ? response.contacts : []
            }))
            dispatch(loadingDone())
        }
    }, [response, doFetch, dispatch])

    return children;
}

export default CurrentUserChecker;