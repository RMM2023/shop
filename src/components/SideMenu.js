import React from "react";
import './RegistrationForm.css';
import iconHome from '../assets/icons/home.png';
import iconClipart from '../assets/icons/clipart.png';
import iconFarmer from '../assets/icons/farmer.png';
import iconElectronics from '../assets/icons/electronics.png';

function SideMenu(){
    return(
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
    )
};
export default SideMenu;