import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

const url = 'https://bszwpoglfggyrpivepex.supabase.co/';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzendwb2dsZmdneXJwaXZlcGV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzc2OTEsImV4cCI6MjA2MzY1MzY5MX0.1THRGtpY2i5mpsJPiQg0iBVJrDRSaz8Y1aO5Zy53sGE';

const initialState = {
    email : '',
    username : '',
    birthdate : '',
    firstName : '',
    lastName : '',
    phone : '',
    password : '',
}

const initialErrors = {
    email : '',
    username : '',
    birthdate : '',
    firstName : '',
    lastName : '',
    phone : '',
    password : '',
    general : ''
}

function validateEmail(email) {
  const atIndex = email.indexOf('@');
  if (atIndex === -1) return false;
  const dotIndex = email.indexOf('.', atIndex);
  return dotIndex !== -1 && dotIndex > atIndex + 1;
}

function validatePhone(phone){
    let digits = '';
    for (let i = 0; i<phone.length; i++){
        if(phone[i] >= '0' && phone[i] <= '9'){
            digits += phone[i]
        }else{
            return (false);
        };
    };
    return digits.length >= 10 && digits.length <= 15;
}

function RegistrationForm(){
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

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
            const response = await fetch(`${url}/rest/v1/users`, {
                method:'POST',
                headers: {
                 'apikey': key,
                 'Authorization': `Bearer ${key}`,
                 'Content-Type': 'application/json',
                 'Prefer': 'return=minimum'
                },
                body: JSON.stringify({
                    email : values.email,
                    username : values.username,
                    birthdate : values.birthdate,
                    first_name : values.firstName,
                    last_name : values.lastName,
                    phone : values.phone,
                    password_hash : values.password,
                })
            });

        }catch(error){
            
        };
        setSubmitted(true);
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    }


    const validate = () => {
        let valid = true;
        let newErrors = {...initialErrors};
        if(!validatePhone(values.phone)){
            newErrors.phone = 'введен некорректный номер телефона'
            valid = false;
        }
        if(!validateEmail(values.email)){
            newErrors.email = 'введен некорректный e-mail'
            valid = false;
        }
        if(!values.username){
            newErrors.username = 'некорректный логин'
            valid = false;
        }
        if(!values.birthdate){
            newErrors.birthdate = 'некорректная дата рождения'
            valid = false;
        }
        if(!values.firstName){
            newErrors.firstName = 'некорректное фамилия пользователя'
            valid = false;
        }
        if(!values.lastName){
            newErrors.lastName = 'некорректное имя'
            valid = false;
        }
        if(!values.password){
            newErrors.password = 'некорректный пароль'
            valid = false;
        }
        setErrors(newErrors)
        return valid
    }

    return(
        <div className="reg-form-wrapper">
        <form className="reg-form" onSubmit={handleSubmit}>
            <div className="form-header">
                <Link to="/" className="back-button">← Назад</Link>
                <h2>Регистрация</h2>
            </div>
            {errors.general &&<div className="error">{errors.general}</div>}
        <div className="reg-form-fields">
            <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={values.email} onChange={handleChange}/> 
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
                <label>Логин</label>
                <input type="text" name="username" value={values.username} onChange={handleChange} />
                {errors.username && <span className="error">{errors.username}</span>}
            </div>
            <div className="form-group">
                <label>Дата рождения</label>
                <input type="date" name="birthdate" value={values.birthdate} onChange={handleChange} />
                {errors.birthdate && <span className="error">{errors.birthdate}</span>}
            </div>
            <div className="form-group">
                <label>Имя</label>
                <input type="text" name="firstName" value={values.firstName} onChange={handleChange} />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="form-group">
                <label>Фамилия</label>
                <input type="text" name="lastName" value={values.lastName} onChange={handleChange} />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
            <div className="form-group">
                <label>Телефон</label>
                <input type="tel" name="phone" value={values.phone} onChange={handleChange} />
                {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="form-group">
                <label>Пароль</label>
                <input type="password" name="password" value={values.password} onChange={handleChange} />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
        </div>
        <button type="submit">Зарегистрироваться</button>
        {submitted && <div className="success">Регистрация успешна! Перенаправление на страницу входа...</div>}
        <div className="form-footer">

            <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </div>
      </form>
    </div>
    );
}
export default RegistrationForm;
