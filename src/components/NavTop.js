import React from "react";
import './RegistrationForm.css';
import fontFamaly from '../fontLubrifontWDXLTC/WDXL_Lubrifont_TC.css';
import iconPath from '../assets/icons/path.png';
import iconMagnifier from '../assets/icons/magnifier.png';
import iconFavorite from '../assets/icons/favorite.png';
import iconShopping from '../assets/icons/shopping.png';
import iconUser from '../assets/icons/user.png';
import iconHome from '../assets/icons/home.png';
import iconClipart from '../assets/icons/clipart.png';
import iconFarmer from '../assets/icons/farmer.png';
import iconElectronics from '../assets/icons/electronics.png';


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

            <div className="pop-up-menu">
                <div className="pop-up-menu-line">
                    <div id="home" className="top-menu">
                        <img src={iconHome}/>
                        <p>ДОМ</p>
                    </div>
                    
                    <div id="clipart" className="top-menu">
                        <img src={iconClipart}/>
                        <p>ОДЕЖДА</p>
                    </div>
                    
                    <div id="garden" className="top-menu">
                        <img src={iconFarmer}/>
                        <p>САД</p>
                    </div>
                    
                    <div id="electronics" className="top-menu">
                        <img src={iconElectronics}/>
                        <p>ЭЛЕКТРОНИКА</p>
                    </div>
                    
                </div>

                <div id="list-menu" className="list-menu">
                    <p>Все для кухни</p>
                    <p>Все для гостинной</p>
                    <p>Все для спальни</p>
                    <p>Все для ванной</p>
                    <p>Все для детской</p>
                    <p>Ковры</p>
                    <p>Посуда</p>
                    <p>Декор</p>
                    <p>Шторы</p>
                    <p>Постельное белье</p>
                </div>
            </div>            
        </div>
    )
};

export default NavTop;