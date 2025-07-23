// Cart state
let cart = [];

// Product data structure
const products = [
    {
        id: 'fruit-tarte',
        name: 'Fruit Tarte',
        price: 190,
        image: 'images/WhatsApp Image 2025-05-31 at 15.45.42.jpeg'
    },
    {
        id: 'strawberry-tarte',
        name: 'Strawberry Tarte',
        price: 190,
        image: 'images/WhatsApp Image 2025-05-31 at 17.56.37.jpeg'
    },
    {
        id: 'tartelette',
        name: 'Tartelette',
        price: 35,
        image: 'images/WhatsApp Image 2025-05-31 at 17.56.41.jpeg'
    },
    {
        id: 'lemon-tart',
        name: 'Lemon Tart',
        price: 55,
        image: 'images/WhatsApp Image 2025-05-31 at 17.56.41 (1).jpeg'
    },
    {
        id: 'mini-eclairs',
        name: 'Mini Éclairs Box',
        price: 300,
        image: 'images/WhatsApp Image 2025-05-31 at 19.06.16.jpeg'
    },
    {
        id: 'faux-macarons',
        name: 'Faux Macarons',
        price: 25,
        image: 'images/WhatsApp Image 2025-05-31 at 17.56.34.jpeg'
    },
    {
        id: 'makroud-nakach',
        name: 'Makroud Nakach',
        price: 300,
        image: 'images/WhatsApp Image 2025-03-20 at 13.34.36 (1).jpeg'
    },
    {
        id: 'mchewek-el-bey',
        name: 'Mchewek El Bey',
        price: 20,
        image: 'images/WhatsApp Image 2025-05-31 at 17.56.38.jpeg'
    },
    {
        id: 'tcharek-el-msaker',
        name: 'Tcharek El M\'saker',
        price: 35,
        image: 'images/WhatsApp Image 2025-05-31 at 17.56.35 (1).jpeg'
    },
    {
        id: 'tcharek-el-aryan',
        name: 'Tcharek El Aryan',
        price: 30,
        image: 'images/WhatsApp Image 2025-03-20 at 13.34.37 (1).jpeg'
    },
    {
        id: 'mchekla',
        name: 'Mchekla',
        price: 25,
        image: 'images/WhatsApp Image 2025-03-20 at 13.34.37.jpeg'
    }
];

// Cart functions
function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    if (cartPanel) {
        cartPanel.classList.toggle('translate-x-full');
    }
}

function addToCart(productId, quantity = 1) {
    console.log('Adding to cart:', productId, quantity);
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    const existingItemIndex = cart.findIndex(item => item.productId === productId);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
        console.log('Updated existing item quantity:', cart[existingItemIndex]);
    } else {
        const newItem = {
            productId,
            quantity,
            name: product.name,
            price: product.price,
            image: product.image
        };
        cart.push(newItem);
        console.log('Added new item to cart:', newItem);
    }
    updateCartUI();
    showCartNotification();
}

function removeFromCart(productId) {
    console.log('Removing from cart:', productId);
    const itemIndex = cart.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
        console.error('Item not found in cart:', productId);
        return;
    }

    cart.splice(itemIndex, 1);
    console.log('Removed item from cart. New cart:', cart);
    updateCartUI();
    showCartNotification('Item removed from cart!');
}

function updateQuantity(productId, newQuantity) {
    console.log('Updating quantity:', productId, newQuantity);
    const itemIndex = cart.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
        console.error('Item not found in cart:', productId);
        return;
    }

    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else {
        cart[itemIndex].quantity = newQuantity;
        console.log('Updated item quantity:', cart[itemIndex]);
        updateCartUI();
        showCartNotification('Quantity updated!');
    }
}

function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log('Calculated total:', total);
    return total;
}

function clearCart() {
    if (cart.length > 0 && confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        updateCartUI();
        showCartNotification('Cart cleared!');
    }
}

function showCartNotification(message = 'Item added to cart!') {
    const notification = document.getElementById('cart-notification');
    if (notification) {
        notification.textContent = message;
        notification.classList.remove('opacity-0');
        notification.classList.add('opacity-100');
        setTimeout(() => {
            notification.classList.remove('opacity-100');
            notification.classList.add('opacity-0');
        }, 2000);
    }
}

// UI functions
function updateCartUI() {
    console.log('Updating cart UI. Current cart:', cart);
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const cartCountMobile = document.getElementById('cart-count-mobile');

    if (!cartContainer) {
        console.error('Cart container not found');
        return;
    }

    // Remove all existing event listeners by replacing the container
    const newCartContainer = cartContainer.cloneNode(false);
    cartContainer.parentNode.replaceChild(newCartContainer, cartContainer);

    if (cart.length === 0) {
        newCartContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center p-8 text-gray-500">
                <i class="fas fa-shopping-cart text-4xl mb-4"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        // Create and append each cart item
        cart.forEach((item, index) => {
            console.log('Creating cart item element for:', item);
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item flex items-center justify-between p-4 border-b border-accent-pink w-full';
            itemElement.setAttribute('data-product-id', item.productId);
            itemElement.setAttribute('data-index', index);

            const buttonClasses = 'w-8 h-8 flex items-center justify-center bg-[#5C3D2E] text-white rounded-full hover:bg-accent-pink transition-colors cursor-pointer active:scale-95';
            
            itemElement.innerHTML = `
                <div class="flex items-center space-x-4 flex-shrink-0">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                    <div>
                        <h4 class="font-playfair font-semibold">${item.name}</h4>
                        <p class="text-accent-pink">${item.price} SEK</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2 flex-shrink-0">
                    <button type="button" class="decrease-btn ${buttonClasses}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="px-2 min-w-[2rem] text-center">${item.quantity}</span>
                    <button type="button" class="increase-btn ${buttonClasses}">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button type="button" class="remove-btn w-8 h-8 flex items-center justify-center ml-4 text-[#5C3D2E] hover:text-accent-pink transition-colors cursor-pointer">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;

            // Add event listeners
            const decreaseBtn = itemElement.querySelector('.decrease-btn');
            const increaseBtn = itemElement.querySelector('.increase-btn');
            const removeBtn = itemElement.querySelector('.remove-btn');

            decreaseBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Decrease clicked for:', item.productId);
                if (item.quantity > 1) {
                    updateQuantity(item.productId, item.quantity - 1);
                } else if (confirm('Remove this item from cart?')) {
                    removeFromCart(item.productId);
                }
            };

            increaseBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Increase clicked for:', item.productId);
                updateQuantity(item.productId, item.quantity + 1);
            };

            removeBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Remove clicked for:', item.productId);
                if (confirm('Remove this item from cart?')) {
                    removeFromCart(item.productId);
                }
            };

            newCartContainer.appendChild(itemElement);
        });
    }

    // Update total and cart count
    if (cartTotal) {
        const total = calculateTotal();
        console.log('Updating cart total:', total);
        cartTotal.textContent = `${total} SEK`;
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    console.log('Updating cart count:', totalItems);
    [cartCount, cartCountMobile].forEach(counter => {
        if (counter) {
            counter.textContent = totalItems;
            counter.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    });

    // Save cart state
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart UI updated successfully');
}

// Initialize cart from localStorage
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing cart...');
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        console.log('Loaded cart from storage:', cart);
        updateCartUI();
    }

    // Initialize product buttons
    const productButtons = document.querySelectorAll('[data-product-id]');
    productButtons.forEach(button => {
        if (button.classList.contains('bg-[#5C3D2E]')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.getAttribute('data-product-id');
                const quantityInput = button.closest('.product-card').querySelector('.quantity-input');
                const quantity = parseInt(quantityInput?.value) || 1;
                console.log('Add to cart clicked:', productId, quantity);
                addToCart(productId, quantity);
            });
        }
    });

    // Initialize cart toggle buttons
    document.querySelectorAll('.toggle-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Toggle cart clicked');
            toggleCart();
        });
    });

    // Initialize clear cart button
    document.querySelectorAll('.clear-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Clear cart clicked');
            clearCart();
        });
    });

    console.log('Cart initialization complete');
});

// Mobile menu functionality (existing code)
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    }

    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    closeMobileMenuButton.addEventListener('click', toggleMobileMenu);

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
});

// Update year in footer (existing code)
document.getElementById('currentYear').textContent = new Date().getFullYear();