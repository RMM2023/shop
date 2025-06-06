import React, {useState} from "react";
import './RegistrationForm.css';

const url = 'https://bszwpoglfggyrpivepex.supabase.co/';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzendwb2dsZmdneXJwaXZlcGV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzc2OTEsImV4cCI6MjA2MzY1MzY5MX0.1THRGtpY2i5mpsJPiQg0iBVJrDRSaz8Y1aO5Zy53sGE';

const initialState = {
    username : '',
    password : '',
};

const initialErrors = {
    username : '',
    password : '',
    general : ''
};
function EntaranceForm(){
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);
    const [submitted, setSubmitted] = useState(false);
    const validate = () => {
    let valid = true;
        let newErrors = {...initialErrors};/*ссылка на initialErrors ... - скопировать как ссылку*/
        if(!values.username){
            newErrors.username = 'неверный логин';
            valid = false;
        }
        if(!values.password){
            newErrors.password = 'неверный пароль'/*может добавить "такой пароль уже существует" и такого же типа на имя фамилию?*/;
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleChange = (e) => {//одинаковая функция для любой формы, вызывается при изменении какого либо поля ввода где е - этот измененный элемент
        const {name, values} = e.target;
        setValues({...values, [name] : values});//помещаем в нужную (найденную, которая в квадратных скобках) переменную значение values от пользователя
        setErrors({...errors, [name] : '', general : ''});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!validate()){
            return;
        };
        try{
            const response = await fetch(`${url}/rest/v1/users?username=eq.${values.username}&password_hash=eq.${values.password}`, {
                method:'GET',
                headers: {
                    'apikey': key,
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimum'//какие данные предпочтительны representation - полные данные json, minimum - только строка ответа
                }
            });
            if(!response.ok){
                setErrors({...errors, [username] : '', [password] : '', general : 'Нет ответа от сервера'});
                return
            };
            const data = await response.json();
            if(data.length === 0){
                setErrors({...errors, [username] : '', [password] : '', general : 'Неверный логин или пароль'});
                return
            };
            const userData = data[0];
            const authToken = btoa(`${userData.username}:${userData.id}:${Date.now()}`); // Создаем простой токен, вместо отданного от сервера
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('userData', JSON.stringify({
                id : userData.id,
                username : userData.username,
                email : userData.email
            }));
            setSubmitted(true);
        }catch(error){
            
        };
        setSubmitted(true);//отправка данных на сервер
    }
    return(
        <div className="reg-form-wrapper">
        <form className="reg-form" onSubmit={handleSubmit}>
            <h2>Вход в личный кабинет</h2>
            {errors.general &&<div className="error">{errors.general}</div>}
        <div className="reg-form-fields2">
            <div className="form-group">
                <label>Логин</label>
                <input type="text" name="username" value={values.username} onChange={handleChange} />
                {errors.username && <span className="error">{errors.username}</span>}
            </div>
            <div className="form-group">
                <label>Пароль</label>
                <input type="password" name="password" value={values.password} onChange={handleChange} />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
        </div>
        <button type="submit">Зарегистрироваться</button>
        {submitted && <div className="success">Регистрация успешна!</div>}
      </form>
    </div>
    );
}
export default EntaranceForm;