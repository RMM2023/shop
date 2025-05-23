import React, {useState} from "react";
import './RegistrationForm.css';

const initialState = {
    email : '',
    username : '',
    birthdate : '',
    firstName : '',
    lastName : '',
    phone : '',
    password : ''
}

const initialErrors = {
    email : '',
    username : '',
    birthdate : '',
    firstName : '',
    lastName : '',
    phone : '',
    password : ''
}

function validatePhone(phone){
    let digits = '';
    for (let i = 0; i<phone.length; i++){
        if(phone[i] >= '0' && phone[i] <= '9'){
            digits += phone[i]
        }else{
            return (false)
        };
    };
    return digits.length >= 10 && digits.length <= 15;
}

function RegistrationForm(){
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const validate = () => {
        let valid = true;
        let newErrors = {...initialErrors};/*ссылка на initialErrors ... - скопировать как ссылку*/
        if(!validatePhone(values.phone)){
            newErrors.phone = 'введен некорректный номер телефона'
            valid = false;
        }/*ниже будут остальные валидации - сделать остальные валидации. вместо функции как validatePhone будет просто проверка на существование*/
        if(value.email){
            newErrors.email = 'введен некорректный e-mail'
            valid = false;
        }
        if(value.username){
            newErrors.username = 'некорректное имя пользователя'
            valid = false;
        }
        if(value.birthdate){
            newErrors.birthdate = 'некорректная дата рождения'
            valid = false;
        }
        if(value.firstName){
            newErrors.firstName = 'некорректное фамилия пользователя'
            valid = false;
        }
        if(value.lastName){
            newErrors.lastName = 'некорректное имя'
            valid = false;
        }
        if(value.password){
            newErrors.password = 'некорректный пароль'/*может добавить "такой пароль уже существует" и такого же типа на имя фамилию?*/
            valid = false;
        }
        setErrors(newErrors)
        return valid
    }

    return(
        <div className="reg-form-wrapper">
        <form className="reg-form" onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
        <div className="reg-form-fields">
            <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={values.email} onChange={handleChange} />//доступность ввода адреса, 
                {errors.email && <span className="error">{errors.email}</span>}//при ошибке ввода выводит ошибку?
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
        {submitted && <div className="success">Регистрация успешна!</div>}
      </form>
    </div>
    );
}
export default RegistrationForm;