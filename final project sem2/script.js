// Header and parallax effect
window.addEventListener('scroll', function() {
    const header = document.getElementById("header");
    const image = document.querySelector('.masthead img');
    let scrollPosition = window.scrollY;

    // Parallax effect
    let translateValue = scrollPosition * 0.5;
    if (image) {
        image.style.transform = `translateY(${translateValue}px)`;
    }

    // Change header color on scroll
    if (scrollPosition > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Cart functionality
let cart = [];

function addItemToCart(productName, productPrice) {
    if (!productName || !productPrice) {
        console.error("Product name and price are required");
        return;
    }

    let existingItem = cart.find(item => item.productName === productName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            productName: productName,
            productPrice: productPrice,
            quantity: 1
        });
    }

    console.log("Cart:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    displayAddedToCartMessage();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function displayCartItems() {
    const cartItemsHtml = document.getElementById("cart-items");
    if (cartItemsHtml) {
        let cartItemsTable = "";

        cart.forEach(item => {
            cartItemsTable += `
                <tr>
                    <td>${item.productName}</td>
                    <td>$${item.productPrice}</td>
                    <td>
                        <button class="decrement-btn" onclick="decrementItem('${item.productName}')">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increment-btn" onclick="incrementItem('${item.productName}')">+</button>
                    </td>
                    <td>$${(item.productPrice * item.quantity).toFixed(2)}</td>
                    <td><button class="remove-btn" onclick="removeItem('${item.productName}')">Remove</button></td>
                </tr>
            `;
        });

        cartItemsHtml.innerHTML = cartItemsTable;

        // Calculate and display subtotal, tax, and total
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.productPrice * item.quantity;
        });
        let tax = subtotal * 0.13;
        let total = subtotal + tax;

        document.getElementById("subtotal").innerText = subtotal.toFixed(2);
        document.getElementById("tax").innerText = tax.toFixed(2);
        document.getElementById("total").innerText = total.toFixed(2);
    }
}

function removeItem(productName) {
    cart = cart.filter(item => item.productName !== productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

function incrementItem(productName) {
    const item = cart.find(item => item.productName === productName);
    if (item) {
        item.quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }
}

function decrementItem(productName) {
    const item = cart.find(item => item.productName === productName);
    if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }
}

function displayAddedToCartMessage() {
    const addedToCartMsg = document.getElementById('add-to-cart-message');
    addedToCartMsg.style.display = 'block';
    setTimeout(function() {
        addedToCartMsg.style.display = 'none';
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Load cart from local storage
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        updateCartCount();
        displayCartItems();
    }

    // Add event listeners to add to cart buttons
    const mainProductBtn = document.querySelector('.flavour-content .add-to-cart-btn');
    if (mainProductBtn) {
        mainProductBtn.addEventListener('click', function () {
            const productName = document.querySelector('.flavour-content h1').textContent;
            const productPrice = document.querySelector('.flavour-content p').textContent.replace("$", "");
            addItemToCart(productName, productPrice);
        });
    }

    const accessoriesBtns = document.querySelectorAll('.candle-accessory .add-to-cart-btn');
    accessoriesBtns.forEach((btn, index) => {
        btn.addEventListener('click', function () {
            const productName = document.querySelectorAll('.candle-accessory h2')[index].textContent;
            const productPrice = document.querySelectorAll('.candle-accessory p')[index].textContent.replace("Price: $", "");
            addItemToCart(productName, productPrice);
        });
    });

    const suggestedProductBtns = document.querySelectorAll('.suggested-product .add-to-cart-btn');
    suggestedProductBtns.forEach((btn, index) => {
        btn.addEventListener('click', function () {
            const productName = document.querySelectorAll('.suggested-product h3')[index].textContent;
            const productPrice = document.querySelectorAll('.suggested-product p')[index].textContent.replace("$", "");
            addItemToCart(productName, productPrice);
        });
    });

    // Feedback and review functionality
    const feedbackBtn = document.querySelector('.feedback-btn');
    const feedbackPopup = document.querySelector('.feedback-popup');
    const closeBtn = document.querySelector('.close-btn');
    const reviewForm = document.getElementById('review-form');
    const reviewSubmittedMsg = document.getElementById('review-submitted');

    feedbackBtn.addEventListener('click', function () {
        feedbackPopup.style.display = 'block';
    });

    closeBtn.addEventListener('click', function () {
        feedbackPopup.style.display = 'none';
    });

    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();
        reviewSubmittedMsg.style.display = 'block';
        setTimeout(function () {
            feedbackPopup.style.display = 'none';
        }, 2000);
    });

    // Contact form submission
    const form = document.getElementById('contact-form');
    const sentMsg = document.getElementById('sent-msg');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        sentMsg.style.display = 'block';
        sentMsg.style.color = 'green';
        sentMsg.style.fontSize = '18px';
        sentMsg.style.fontWeight = 'bold';
        sentMsg.innerText = 'Message sent!';
        setTimeout(() => {
            sentMsg.style.display = 'none';
        }, 3000);
    });
});

// Login popup functionality
const loginBtn = document.getElementById('login-btn');
const loginPopup = document.getElementById('login-popup');
const closeLoginBtn = document.querySelector('.close');

loginBtn.addEventListener('click', () => {
    loginPopup.style.display = 'block';
});

closeLoginBtn.addEventListener('click', () => {
    loginPopup.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === loginPopup) {
        loginPopup.style.display = 'none';
    }
});