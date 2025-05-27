export const isAuthenticated = () =>{
    const token = localStorage.getItem('authToken');//токен-ключ входа на сайт, выдается сервером как подтверждение правильности входа. localStorage аналог sharedPreferences
    const userData = localStorage.getItem('userData');//дата класс всех остальных данных о пользователе
    return !!(token && userData);//возвращаем true или false как результат проверки, двойное иотрицание нужно чтобы тоно привести в boolean
    //альтернативно - return Boolean(token && userData)
};//вышеописанное - функция-лямбда для внешнего использования

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