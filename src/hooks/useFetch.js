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

    const reqOptions = {
        ...options,
        headers: {
            authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json;charset=utf-8',
            ...options.headers
        }
    }

    useEffect(() => {
        if (!isLoading) return;

        fetch(baseUrl + endpoint, reqOptions)
            .then(res => {
                if (res.ok) {
                    return res.json().then(data => {
                        setError(null)
                        setResponse(data)
                    })
                }
                return res.json().then(error => {
                    setError(error)
                })

            })
            .finally(() => setIsLoading(false))

    }, [endpoint, reqOptions, token, isLoading]);

    return [{ response, error, isLoading }, doFetch]
}

export default useFetch;