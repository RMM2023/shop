const SUPABASE_URL = 'https://bszwpoglfggyrpivepex.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzendwb2dsZmdneXJwaXZlcGV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzc2OTEsImV4cCI6MjA2MzY1MzY5MX0.1THRGtpY2i5mpsJPiQg0iBVJrDRSaz8Y1aO5Zy53sGE';

// Загрузка всех категорий
export const fetchCategories = async () => {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка загрузки категорий');
        }

        return await response.json();
    } catch (error) {
        throw new Error('Ошибка загрузки категорий: ' + error.message);
    }
};

// Загрузка товаров с возможностью фильтрации по категории
export const fetchProducts = async (categoryId = null) => {
    try {
        let url = `${SUPABASE_URL}/rest/v1/products?select=*,categories(name)`;
        
        if (categoryId) {
            url += `&category_id=eq.${categoryId}`;
        }

        const response = await fetch(url, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка загрузки товаров');
        }

        const data = await response.json();
        
        // Преобразуем данные под нужный формат
        return data.map(product => ({
            id: product.id,
            brand: product.categories?.name || 'Без категории',
            name: product.name,
            currentPrice: parseFloat(product.price),
            originalPrice: null,
            image: product.image_url || '/default-product.jpg',
            colors: ["#87CEEB", "#228B22", "#8B4513", "#FFD700"],
            rating: 4.3,
            isFavorite: false,
            description: product.description,
            stock: product.stock
        }));
    } catch (error) {
        throw new Error('Ошибка загрузки товаров: ' + error.message);
    }
};

export const fetchProductById = async (productId) => {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${productId}&select=*,categories(name)`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка загрузки товара');
        }

        const data = await response.json();
        return data[0] || null;
    } catch (error) {
        throw new Error('Ошибка загрузки товара: ' + error.message);
    }
};

export const searchProducts = async (searchTerm) => {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/products?name=ilike.%${searchTerm}%&select=*,categories(name)`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка поиска товаров');
        }

        const data = await response.json();
        
        return data.map(product => ({
            id: product.id,
            brand: product.categories?.name || 'Без категории',
            name: product.name,
            currentPrice: parseFloat(product.price),
            originalPrice: null,
            image: product.image_url || '/default-product.jpg',
            colors: ["#87CEEB", "#228B22", "#8B4513", "#FFD700"],
            rating: 4.3,
            isFavorite: false,
            description: product.description,
            stock: product.stock
        }));
    } catch (error) {
        throw new Error('Ошибка поиска товаров: ' + error.message);
    }
};
