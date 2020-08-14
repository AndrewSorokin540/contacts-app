export const getUserFromToken = token => {
    if (!token) {
        return ['', '']
    }
    const userId = JSON.parse(atob(token.split('.')[1])).sub;
    const userEmail = JSON.parse(atob(token.split('.')[1])).email
    return [userId, userEmail]
}