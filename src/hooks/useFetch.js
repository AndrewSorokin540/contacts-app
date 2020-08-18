import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from 'hooks';

const useFetch = () => {
    const baseUrl = 'http://localhost:3001'

    const [options, setOptions] = useState({});
    const [endpoint, setEndpoint] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [readyToFetching, setReadyToFetching] = useState(false);
    const [token] = useLocalStorage('token');

    const doFetch = useCallback((options = {}, endpoint = ('')) => {
        setOptions(options);
        setEndpoint(endpoint);
        setReadyToFetching(true);
    }, [])

    useEffect(() => {
        const reqOptions = {
            ...options,
            headers: {
                authorization: token ? `Bearer ${token}` : '',
                ...options.headers
            }
        }
        if (readyToFetching) {
            fetch(baseUrl + endpoint, reqOptions)
                .then(res => res.json())
                .then(data => setResponse(data))
                .catch(err => setError(err))
                .finally(() => setReadyToFetching(false))
        }
    }, [endpoint, options, readyToFetching, token]);

    return [{ response, error }, doFetch]
}

export default useFetch;