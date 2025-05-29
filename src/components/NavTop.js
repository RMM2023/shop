import React from "react";
import './RegistrationForm.css';
import fontFamaly from '../fontLubrifontWDXLTC/WDXL_Lubrifont_TC.css';
import iconPath from '../assets/icons/path.png';
import iconMagnifier from '../assets/icons/magnifier.png';
import iconFavorite from '../assets/icons/favorite.png';
import iconShopping from '../assets/icons/shopping.png';
import iconUser from '../assets/icons/user.png';


function NavTop(){
    return(
        <div className="nav-top">
            <div className="nav-top-container">
                <h1 className="lable-shop">HOUSE <br/> SHOP</h1>
                <div className="menu-button">
                    <img src={iconPath}/>
                    <p>Меню</p>
                </div>
                
                <div className="search">
                    <img src={iconMagnifier}/>
                    <p>Быстрый поиск</p>
                </div>
                <div className="tool-bar">
                    <img src={iconUser}/>
                    <img src={iconFavorite}/>
                    <img src={iconShopping}/>
                </div>         
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