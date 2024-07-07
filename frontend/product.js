document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productDetails = document.querySelector('.product-details');

    try {
        
        const response = await fetch(`http://localhost:5352/api/products/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details.');
        }
        const product = await response.json();

        
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Price: ${product.price} $</p>
            <button class="edit-product-btn">Edit</button>
        `;
        productDetails.appendChild(productCard);

        
        const modal = document.getElementById('update-product-modal');
        const editButtons = document.querySelectorAll('.edit-product-btn');
        const closeModalBtn = document.querySelector('.close');
        const updateProductForm = document.getElementById('update-product-form');
        const updateProductNameInput = document.getElementById('update-name');
        const updateProductDescriptionInput = document.getElementById('update-description');
        const updateProductPriceInput = document.getElementById('update-price');

        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                modal.style.display = 'block';
                
                updateProductNameInput.value = product.name;
                updateProductDescriptionInput.value = product.description;
                updateProductPriceInput.value = product.price;
            });
        });

        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        updateProductForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const updatedName = updateProductNameInput.value;
            const updatedDescription = updateProductDescriptionInput.value;
            const updatedPrice = parseFloat(updateProductPriceInput.value);

            try {
                const response = await fetch(`http://localhost:5352/api/products/products/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: updatedName, description: updatedDescription, price: updatedPrice })
                });

                if (response.ok) {
                    alert('Product updated successfully!');
                    modal.style.display = 'none';
                    
                } else {
                    alert('Failed to update product.');
                }
            } catch (error) {
                console.error('Error updating product:', error);
                alert('Failed to update product.');
            }
        });

    } catch (error) {
        console.error('Error fetching product details:', error);
        
    }
});
