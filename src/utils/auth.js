export const isAuthenticated = () =>{
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    return !!(token && userData);
};

export const getUserData = () =>{
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
};

export const getAuthToken = () =>{
    return localStorage.getItem('authToken');
};

export const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
};