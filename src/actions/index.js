export const loadingStart = () => {
    return {
        type: 'LOADING_START'
    }
}

export const loadingDone = () => {
    return {
        type: 'LOADING_DONE'
    }
}

export const setAuthorized = payload => {
    return {
        type: 'SET_AUTHORIZED',
        payload
    }
}

export const setUnauthorized = () => {
    return {
        type: 'SET_UNAUTHORIZED'
    }
}