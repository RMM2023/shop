import React from "react";
import './RegistrationForm.css';
import iconHome from '../assets/icons/home.png';
import iconClipart from '../assets/icons/clipart.png';
import iconFarmer from '../assets/icons/farmer.png';
import iconElectronics from '../assets/icons/electronics.png';

function SideMenu({ categories, selectedCategory, onCategoryChange }){
    
    // Статические категории с иконками (для отображения в верхней части)
    const staticCategories = [
        { id: 'home', name: 'ДОМ', icon: iconHome },
        { id: 'clothes', name: 'ОДЕЖДА', icon: iconClipart },
        { id: 'garden', name: 'САД', icon: iconFarmer },
        { id: 'electronics', name: 'ЭЛЕКТРОНИКА', icon: iconElectronics }
    ];

    // Обработчик выбора категории
    const handleCategoryClick = (categoryId) => {
        onCategoryChange(categoryId === selectedCategory ? null : categoryId);
    };

    // Обработчик показа всех товаров
    const handleShowAll = () => {
        onCategoryChange(null);
    };

    return(
        <div className="pop-up-menu">
            <div className="pop-up-menu-line">
                {staticCategories.map(category => {
                    // Находим соответствующую категорию из базы данных по имени
                    const dbCategory = categories.find(cat => 
                        cat.name.toLowerCase().includes(category.name.toLowerCase()) ||
                        category.name.toLowerCase().includes(cat.name.toLowerCase())
                    );
                    
                    return (
                        <div 
                            key={category.id} 
                            id={category.id} 
                            className={`top-menu ${selectedCategory === dbCategory?.id ? 'active' : ''}`}
                            onClick={() => dbCategory && handleCategoryClick(dbCategory.id)}
                            style={{ cursor: dbCategory ? 'pointer' : 'default' }}
                        >
                            <img src={category.icon} alt={category.name} />
                            <p>{category.name}</p>
                        </div>
                    );
                })}
            </div>

            <div id="list-menu" className="list-menu">
                <p 
                    className={`menu-item ${selectedCategory === null ? 'active' : ''}`}
                    onClick={handleShowAll}
                >
                    Все товары
                </p>
                
                {categories.map(category => (
                    <p 
                        key={category.id}
                        className={`menu-item ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        {category.name}
                    </p>
                ))}
            </div>
        </div>
    )
};

export default SideMenu;
