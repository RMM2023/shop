import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const validate = () => {
    let valid = true;
        let newErrors = {...initialErrors};
        if(!values.username){
            newErrors.username = 'неверный логин';
            valid = false;
        }
        if(!values.password){
            newErrors.password = 'неверный пароль';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name] : value});
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
                    'Prefer': 'return=minimum'
                }
            });
            if(!response.ok){
                setErrors({...errors, 'username' : '', 'password' : '', general : 'Нет ответа от сервера'});
                return
            };
            const data = await response.json();
            if(data.length === 0){
                setErrors({...errors, 'username' : '', 'password' : '', general : 'Неверный логин или пароль'});
                return
            };
            const userData = data[0];
            const authToken = btoa(`${userData.username}:${userData.id}:${Date.now()}`);
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('userData', JSON.stringify({
                id : userData.id,
                username : userData.username,
                email : userData.email
            }));
            setSubmitted(true);
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }catch(error){
            
        };
        setSubmitted(true);
    }
    return(
        <div className="reg-form-wrapper">
        <form className="reg-form" onSubmit={handleSubmit}>
            <div className="form-header">
                <Link to="/" className="back-button">← Назад</Link>
                <h2>Вход в личный кабинет</h2>
            </div>
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
        <button type="submit">Войти</button>
        {submitted && <div className="success">Вход выполнен успешно! Перенаправление...</div>}
        <div className="form-footer">
            <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </div>
      </form>
    </div>
    );
}
export default EntaranceForm;
