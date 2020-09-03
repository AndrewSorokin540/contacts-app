import { useState, useEffect } from 'react';

const useLocalStorage = (key) => {

    const [value, setValue] = useState(() => localStorage.getItem(key) || '');

    useEffect(() => {
        console.log('value', value)
    }, [value])

    useEffect(() => {
        if (!value) {
            localStorage.removeItem(key)
        }
        else {
            localStorage.setItem(key, value)
        }
    }, [key, value])

    return [value, setValue]
}

export default useLocalStorage;