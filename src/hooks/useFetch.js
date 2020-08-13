import { useState, useEffect, useCallback } from 'react';

const useFetch = (url) => {
    const baseUrl = 'http://localhost:3001'

    const [options, setOptions] = useState({});
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [readyToFetching, setReadyToFetching] = useState(false);

    const doFetch = useCallback((options = {}) => {
        setOptions(options);
        setReadyToFetching(true);
    }, [])

    useEffect(() => {
        if (readyToFetching) {
            fetch(baseUrl + url, options)
                .then(res => res.json())
                .then(data => setResponse(data))
                .catch(err => setError(err))
                .finally(() => setReadyToFetching(false))
        }
    }, [url, options, readyToFetching]);

    return [{ response, error }, doFetch]
}

export default useFetch;