document.addEventListener('DOMContentLoaded', async () => {
    const productsList = document.querySelector('.products-list');

    if (!productsList) {
        console.error("Products list element not found.");
        return; 
    }

    
    try {
        const response = await fetch('http://localhost:5352/api/products/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products.');
        }
        const products = await response.json();

        
        productsList.innerHTML = '';

        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Price: ${product.price} $</p>
                <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                <a href="product.html?id=${product.id}" class="view-product-btn">View Product</a>
            `;
            productsList.appendChild(productCard);
        });

        
        productsList.addEventListener('click', async (event) => {
            if (event.target.classList.contains('add-to-cart-btn')) {
                const productId = event.target.getAttribute('data-product-id');
                const quantity = prompt('Enter quantity:');
                const userId = 1; 

                if (quantity) {
                    const response = await fetch('http://localhost:5352/api/cart/cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ productId, quantity, userId })
                    });

                    if (response.ok) {
                        alert('Product added to cart successfully!');
                    } else {
                        alert('Failed to add product to cart.');
                    }
                }
            }
        });

        
        const modal = document.getElementById('add-product-modal');
        const addProductBtn = document.getElementById('add-product-btn');
        const closeModalBtn = document.querySelector('.close');
        const addProductForm = document.getElementById('add-product-form');

        addProductBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        addProductForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const price = parseFloat(document.getElementById('price').value);

            try {
                const response = await fetch('http://localhost:5352/api/products/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, description, price })
                });

                if (response.ok) {
                    alert('Product added successfully!');
                    modal.style.display = 'none';
                    
                } else {
                    alert('Failed to add product.');
                }
            } catch (error) {
                console.error('Error adding product:', error);
                alert('Failed to add product.');
            }
        });

    } catch (error) {
        console.error('Error fetching or displaying products:', error.message);
        
    }
});
