function apiToken() {
    const user = JSON.parse(localStorage.getItem('authSession'));
    return user ? user.data.token : null;
}

export function tokenHeader() {
    let token = apiToken();
    return token
        ? {
            headers: {Authorization: `Token ${token}`}
        }
        : {};
}
