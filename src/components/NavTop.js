import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './RegistrationForm.css';
import fontFamaly from '../fontLubrifontWDXLTC/WDXL_Lubrifont_TC.css';
import iconPath from '../assets/icons/path.png';
import iconMagnifier from '../assets/icons/magnifier.png';
import iconFavorite from '../assets/icons/favorite.png';
import iconShopping from '../assets/icons/shopping.png';
import iconUser from '../assets/icons/user.png';
import { isAuthenticated, logout } from '../utils/auth';


function NavTop({ onMenuClick, onSearch, searchQuery }){
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

    useEffect(() => {
        const checkAuth = () => {
            setIsUserAuthenticated(isAuthenticated());
        };
        
        checkAuth();
        
        // Слушаем изменения localStorage
        window.addEventListener('storage', checkAuth);
        
        // Альтернативно - проверяем каждые 1000мс (на случай изменений в том же окне)
        const interval = setInterval(checkAuth, 1000);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setLocalSearchQuery(searchQuery || '');
    }, [searchQuery]);

    const handleUserClick = () => {
        if(window.confirm('Выйти из аккаунта?')) {
            logout();
            setIsUserAuthenticated(false);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setLocalSearchQuery(query);
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(localSearchQuery);
        }
    };

    return(
        <div className="nav-top">
            <div className="nav-top-container">
                <h1 className="lable-shop">HOUSE <br/> SHOP</h1>
                <div className="menu-button" onClick={onMenuClick}>
                    <img src={iconPath}/>
                    <p>Меню</p>
                </div>
                
                <form className="search" onSubmit={handleSearchSubmit}>
                    <img src={iconMagnifier}/>
                    <input 
                        type="text" 
                        placeholder="Быстрый поиск" 
                        value={localSearchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </form>
                
                {isUserAuthenticated ? (
                    <div className="tool-bar">
                        <img src={iconUser} title="Профиль"/>
                        <img src={iconFavorite} title="Избранное"/>
                        <img src={iconShopping} title="Корзина"/>
                        <button className="btn-logout" onClick={handleUserClick} title="Выйти">
                            Выйти
                        </button>
                    </div>
                ) : (
                    <div className="login-button">
                        <Link to="/login">
                            <button className="btn-login">Войти</button>
                        </Link>
                    </div>
                )}
            </div>
            <div className="nav-panel">
                <p>По стилю</p>
                <p>Наши коллекции</p>
                <p>Дизайнерам</p>
                <p>Для бизнеса</p>
            </div>           
        </div>
    )
};

export default NavTop;
