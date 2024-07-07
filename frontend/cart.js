
document.addEventListener('DOMContentLoaded', async () => {
    const cartItems = document.querySelector('.cart-items');
    const totalPriceSpan = document.getElementById('total-price');

    
    const userId = getUserId(); 

    
    const response = await fetch(`http://localhost:5352/api/cart/cart/${userId}`);
    const cartProducts = await response.json();

    
    cartProducts.forEach(cartItem => {
        const cartItemCard = document.createElement('div');
        cartItemCard.classList.add('cart-item');
        cartItemCard.innerHTML = `
            <h2>${cartItem.product.name}</h2>
            <p>Quantity: ${cartItem.quantity}</p>
            <p>Price per unit: ${cartItem.product.price} $</p>
            <button class="delete-btn" data-cart-item-id="${cartItem.id}">Delete</button>
        `;
        cartItems.appendChild(cartItemCard);
    });

    
    const totalPrice = cartProducts.reduce((acc, curr) => {
        return acc + (curr.quantity * curr.product.price);
    }, 0);
    totalPriceSpan.textContent = totalPrice.toFixed(2);

    
    cartItems.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const cartItemId = event.target.getAttribute('data-cart-item-id');

            const deleteResponse = await fetch(`http://localhost:5352/api/cart/cart/${cartItemId}`, {
                method: 'DELETE'
            });

            if (deleteResponse.ok) {
                event.target.parentElement.remove();
                alert('Product deleted from cart successfully!');
                
                const newTotalPrice = cartProducts.reduce((acc, curr) => {
                    if (curr.id !== cartItemId) {
                        return acc + (curr.quantity * curr.product.price);
                    } else {
                        return acc;
                    }
                }, 0);
                totalPriceSpan.textContent = newTotalPrice.toFixed(2);
            } else {
                alert('Failed to delete product from cart.');
            }
        }
    });
});


function getUserId() {
    
    return 1; 
}
