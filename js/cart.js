

const CART_STORAGE_KEY = 'nova_cart';
const APPLIED_COUPON_KEY = 'nova_applied_coupon';
function getCart() {
  const saved = localStorage.getItem(CART_STORAGE_KEY);
  try {
    const rawCart = saved ? JSON.parse(saved) : [];
    return rawCart.map(item => {
      if (typeof getProductById === 'function') {
        const prod = getProductById(item.id);
        if (prod) {
          return {
            ...item,
            image: prod.image,
            name: prod.name,
            price: prod.price
          };
        }
      }
      return item;
    });
  } catch (e) {
    console.error('Error parsing cart data', e);
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartBadges();
}
function addToCart(productId, quantity = 1, selectedColor = null, selectedSize = null) {
  const product = getProductById(productId);
  if (!product) return false;

  const color = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : null);
  const size = selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);

  let cart = getCart();
  const existingIndex = cart.findIndex(item => 
    item.id === productId && 
    item.color === color && 
    item.size === size
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      color: color,
      size: size,
      quantity: quantity
    });
  }

  saveCart(cart);
  if (window.showToast) {
    window.showToast(`"${product.name}" added to your cart!`, 'success');
  }
  return true;
}
function updateCartQty(target, newQty) {
  let cart = getCart();
  if (newQty <= 0) {
    return removeFromCart(target);
  }
  
  if (typeof target === 'number' && target >= 0 && target < cart.length) {
    cart[target].quantity = parseInt(newQty);
    saveCart(cart);
  } else {
    const item = cart.find(i => i.id === target);
    if (item) {
      item.quantity = parseInt(newQty);
      saveCart(cart);
    }
  }
}
function removeFromCart(target) {
  let cart = getCart();
  let removedProduct = null;

  if (typeof target === 'number' && target >= 0 && target < cart.length) {
    removedProduct = cart[target];
    cart.splice(target, 1);
  } else {
    removedProduct = cart.find(i => i.id === target);
    cart = cart.filter(item => item.id !== target);
  }

  saveCart(cart);
  
  if (window.showToast && removedProduct) {
    window.showToast(`Removed "${removedProduct.name}" from cart.`, 'info');
  }
}
function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  localStorage.removeItem(APPLIED_COUPON_KEY);
  updateCartBadges();
}
function getCartTotals() {
  const cart = getCart();
  let subtotal = 0;
  let itemCount = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    itemCount += item.quantity;
  });

  const appliedCoupon = getAppliedCoupon();
  let discountPercent = appliedCoupon ? appliedCoupon.discount : 0;
  let discountAmount = (subtotal * discountPercent) / 100;
  let shipping = subtotal > 100 || subtotal === 0 ? 0 : 15.00;
  let tax = (subtotal - discountAmount) * 0.08;

  let total = subtotal - discountAmount + shipping + tax;

  return {
    itemCount,
    subtotal: parseFloat(subtotal.toFixed(2)),
    discountPercent,
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  };
}
function applyPromoCode(code) {
  const validCodes = {
    'NOVAMART20': { discount: 20, description: '20% Off Storewide' },
    'SAVE10': { discount: 10, description: '10% Off Orders' },
    'WELCOME': { discount: 15, description: '15% First Order Discount' }
  };

  const formattedCode = code.trim().toUpperCase();
  if (validCodes[formattedCode]) {
    localStorage.setItem(APPLIED_COUPON_KEY, JSON.stringify({
      code: formattedCode,
      ...validCodes[formattedCode]
    }));
    return { success: true, message: `Promo code "${formattedCode}" applied!` };
  } else {
    return { success: false, message: 'Invalid promo code. Try "NOVAMART20".' };
  }
}

function getAppliedCoupon() {
  const saved = localStorage.getItem(APPLIED_COUPON_KEY);
  return saved ? JSON.parse(saved) : null;
}
function updateCartBadges() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = totalItems;
  });
}
document.addEventListener('DOMContentLoaded', updateCartBadges);
