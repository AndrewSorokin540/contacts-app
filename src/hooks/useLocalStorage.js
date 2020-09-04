import { useState } from 'react';

const useLocalStorage = (key) => {

    const [value, setValue] = useState(() => localStorage.getItem(key) || '');

    const setStoredValue = value => {

        setValue(value)

        if (value) {
            localStorage.setItem(key, value)
        } else {
            localStorage.removeItem(key)
        }
    }

    return [value, setStoredValue]
}

export default useLocalStorage;