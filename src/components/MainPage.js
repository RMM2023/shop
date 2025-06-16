import React, { useState, useEffect } from "react";
import NavTop from './NavTop';
import SideMenu from './SideMenu';
import ProductCard from './ProductCard';
import { fetchCategories, fetchProducts } from '../utils/api';
import './RegistrationForm.css';

function MainPage(){
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Загрузка категорий
    const loadCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            setError(error.message);
        }
    };

    // Загрузка товаров
    const loadProducts = async (categoryId = null) => {
        try {
            setLoading(true);
            const data = await fetchProducts(categoryId);
            setAllProducts(data);
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Фильтрация товаров по поисковому запросу
    const filterProducts = (query, categoryId = null) => {
        let filteredProducts = categoryId 
            ? allProducts.filter(product => product.category_id === categoryId)
            : allProducts;

        if (query.trim()) {
            filteredProducts = filteredProducts.filter(product =>
                product.name?.toLowerCase().includes(query.toLowerCase()) ||
                product.brand?.toLowerCase().includes(query.toLowerCase()) ||
                product.description?.toLowerCase().includes(query.toLowerCase())
            );
        }

        setProducts(filteredProducts);
    };

    // Обработчик поиска
    const handleSearch = (query) => {
        setSearchQuery(query);
        filterProducts(query, selectedCategory);
    };

    // Обработчик изменения категории
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId) {
            loadProducts(categoryId);
        } else {
            loadProducts();
        }
        // Применяем поисковый запрос к новой категории
        setTimeout(() => {
            filterProducts(searchQuery, categoryId);
        }, 100);
    };

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        loadCategories();
        loadProducts();
    }, []);

    // Обработчик открытия/закрытия меню
    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };

    // Обработчик закрытия меню
    const closeSideMenu = () => {
        setIsSideMenuOpen(false);
    };

    // Обработчик ESC и клика вне панели
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeSideMenu();
            }
        };

        const handleClickOutside = (event) => {
            const sideMenu = document.querySelector('.sidebar');
            const menuButton = document.querySelector('.menu-button');
            
            if (isSideMenuOpen && sideMenu && !sideMenu.contains(event.target) && !menuButton.contains(event.target)) {
                closeSideMenu();
            }
        };

        if (isSideMenuOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSideMenuOpen]);


    return(
        <div className="main-page">
            <NavTop 
                onMenuClick={toggleSideMenu} 
                onSearch={handleSearch}
                searchQuery={searchQuery}
            />
            <div className="page-content">
                <div className={`sidebar ${isSideMenuOpen ? 'sidebar-open' : ''}`}>
                    <SideMenu 
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />
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
                    
                    {searchQuery && (
                        <div className="search-info">
                            Результаты поиска для: "{searchQuery}" ({products.length} товаров)
                        </div>
                    )}
                    
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                    
                    {loading ? (
                        <div className="loading">
                            Загрузка товаров...
                        </div>
                    ) : (
                        <div className="products-grid">
                            {products.length > 0 ? (
                                products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="no-products">
                                    {searchQuery ? 
                                        `По запросу "${searchQuery}" товары не найдены` : 
                                        'Товары не найдены'
                                    }
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default MainPage;