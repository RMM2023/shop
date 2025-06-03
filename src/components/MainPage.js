import React, { useEffect, useState } from "react";
import './RegistrationForm.css';
import NavTop from "./NavTop";
import SideMenu from "./SideMenu";
import cardImage from "../cardShope.jpg";

const testProducts = [
    {
        id: 1,
        brand: "LA REDOUTE INTERIEURS",
        name: "Наволочки на молнии для подушек",
        currentPrice: 1500,
        originalPrice: 3000,
        image: cardImage,
        colors: ["#87CEEB", "#228B22", "#8B4513", "#FFD700"],
        rating: 4.3,
        isFavorite: false
    },
    {
        id: 2,
        brand: "LA REDOUTE INTERIEURS",
        name: "Наволочки на молнии для подушек",
        currentPrice: 1500,
        originalPrice: 3000,
        image: cardImage,
        colors: ["#87CEEB", "#228B22", "#8B4513", "#FFD700"],
        rating: 4.3,
        isFavorite: false
    },
    {
        id: 3,
        brand: "LA REDOUTE INTERIEURS",
        name: "Наволочки на молнии для подушек",
        currentPrice: 1500,
        originalPrice: 3000,
        image: cardImage,
        colors: ["#87CEEB", "#228B22", "#8B4513", "#FFD700"],
        rating: 4.3,
        isFavorite: false
    },
    {
        id: 4,
        brand: "LA REDOUTE INTERIEURS",
        name: "Наволочки на молнии для подушек",
        currentPrice: 1500,
        originalPrice: 3000,
        image: cardImage,
        colors: ["#87CEEB", "#228B22", "#8B4513", "#FFD700"],
        rating: 4.3,
        isFavorite: false
    },
    {
        id: 5,
        brand: "LA REDOUTE INTERIEURS",
        name: "Наволочки на молнии для подушек",
        currentPrice: 1500,
        originalPrice: 3000,
        image: cardImage,
        colors: ["#87CEEB", "#228B22", "#8B4513", "#FFD700"],
        rating: 4.3,
        isFavorite: false
    },
    {
        id: 6,
        brand: "LA REDOUTE INTERIEURS",
        name: "Наволочки на молнии для подушек",
        currentPrice: 1500,
        originalPrice: 3000,
        image: cardImage,
        colors: ["#87CEEB", "#228B22", "#8B4513", "#FFD700"],
        rating: 4.3,
        isFavorite: false
    },
    {
        id: 7,
        brand: "LA REDOUTE INTERIEURS",
        name: "Наволочки на молнии для подушек",
        currentPrice: 1500,
        originalPrice: 3000,
        image: cardImage,
        colors: ["#87CEEB", "#228B22", "#8B4513", "#FFD700"],
        rating: 4.3,
        isFavorite: false
    }
]

function MainPage(){
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);//начальное состояние меню - закрыто
    const toggleSideMenu = () =>{
        setIsSideMenuOpen(!isSideMenuOpen);//изменение состояние на противоположное
    };
    const closeSideMenu = () =>{//функция закрытия меню
        setIsSideMenuOpen(false);
    };
    useEffect(()=>{
        const handleKeyDown = (event) =>{//обработка отслеживания нажатии на кнопки
            if(event.key === 'Escape'){//указание кнопки
                closeSideMenu();
            };
        };
        const handleClickOutside = (event) =>{//функция обработки нажатия на кнопку мыши
            const sideMenu = document.querySelector('.sidebar');//поиск по стилю sidebar
            const menuButton = document.querySelector('.menu-button');
            if(isSideMenuOpen && sideMenu && !sideMenu.contains(event.target) && !menuButton.contains(event.target)){
                closeSideMenu();//если меню открыто и если меню привязано и если не нажали на меню, и если не нажали на кнопку меню
            };
            if (isSideMenuOpen){//закрытие меню при нажатии на кнопку мыши либо escape
                document.addEventListener('keydown', handleKeyDown());//если меню открыто, привязываем отслеживатели
                document.addEventListener('mousedown', handleClickOutside());
            };
            return() => {//при закрытии меню - отвязываем отслеживатели клика мыши и нажатии на клавиатуру
                document.removeEventListener('keydown', handleKeyDown());
                document.removeEventListener('mousedown', handleClickOutside());
            };
        };
    },[isSideMenuOpen()]);
    
    return(
        <div className="main-page">
            <NavTop onMenuClick={toggleSideMenu} />
            <div className="page-content">
                <div className={`sidebar ${isSideMenuOpen ? 'sidebar-open' : ''}`}>
                    <SideMenu />
                </div>
                {isSideMenuOpen && <div className="sidebar-overlay" onClick={closeSideMenu}></div>}
                <div className="main-content">
                    <div className="promo-banner">
                        <div className="banner-content">
                            <div className="banner-text">
                                <h2>Экстра</h2>
                                <div className="discount">-50%</div>
                                <p>на столы и стулья So'Home</p>
                                <span className="promo-details">и еще 48% на всю нашу коллекцию 8618</span>
                            </div>
                        </div>
                        <div className="banner-image">
                            {/* Здесь будет изображение стола и стульев */}
                        </div>
                    </div>
                    
                    <div className="products-grid">
                        {testProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default MainPage;