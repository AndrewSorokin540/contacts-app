import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from 'hooks';

const useFetch = endpoint => {
    const baseUrl = 'http://localhost:3001'

    const [options, setOptions] = useState({});
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [token] = useLocalStorage('token');

    const doFetch = useCallback((options = {}) => {
        setOptions(options);
        setIsLoading(true);
    }, [])

    useEffect(() => {
        if (!isLoading) return;

        const reqOptions = {
            ...options,
            headers: {
                authorization: token ? `Bearer ${token}` : '',
                ...options.headers
            }
        }

        fetch(baseUrl + endpoint, reqOptions)
            .then(res => res.json())
            .then(data => setResponse(data))
            .catch(err => setError(err))
            .finally(() => setIsLoading(false))

    }, [endpoint, options, token]);

    return [{ response, error, isLoading }, doFetch]
}

export default useFetch;