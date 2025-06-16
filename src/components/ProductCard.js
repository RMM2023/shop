import React from "react";
import './RegistrationForm.css';

function ProductCard({ product }){
    return(
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image"/>
                <div className="product-icons">
                    <div className={`favorite-icon ${product.isFavorite ? 'active' : ''}`}>
                        ♡
                    </div>
                    <div className="compare-icon">
                        ⚖️
                    </div>
                </div>
            </div>
            <div className="product-info">
                <h3 className="product-brand">{product.brand}</h3>
                <p className="product-name">{product.name}</p>
                <div className="product-price">
                    <span className="current-price">от {product.currentPrice} ₽</span>
                    {product.originalPrice && (
                        <span className="original-price">{product.originalPrice} ₽</span>
                    )}
                </div>
                <div className="product-colors">
                    {product.colors?.map((color, index) => (
                        <div 
                            key={index} 
                            className="color-option" 
                            style={{backgroundColor: color}}
                        ></div>
                    ))}
                </div>
                <div className="product-rating">
                    <span className="rating-stars">⭐️</span>
                    <span className="rating-value">{product.rating}</span>
                </div>
            </div>
        </div>
    )
};

export default ProductCard;
