import React from "react";
import './RegistrationForm.css';
import '../fontLubrifontWDXLTC/WDXL_Lubrifont_TC';
import iconPath from '../assets/icons/path.png';
import iconMagnifier from '../assets/icons/magnifier.png';


function NavTop(){
    return(
        <div className="navTop">
            <h1 className="lableShop">HOUSE <br/> SHOP</h1>
            <div className="menuButton">
                <img src={iconPath}/>
                <button type="Menu">Меню</button>
            </div>
            
            <div className="search">Быстрый поиск
                <img src={iconMagnifier}/>
            </div>
        </div>
    )
};

export default NavTop;