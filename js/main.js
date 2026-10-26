document.addEventListener('error', function (e) {
  if (e.target && e.target.tagName === 'IMG') {
    const img = e.target;
    if (img.dataset.failed) return;
    img.dataset.failed = 'true';
    
    const src = img.getAttribute('src') || '';
    if (!src) return;
    const filename = src.split('/').pop().split('?')[0];
    if (typeof PRODUCTS_DATA !== 'undefined' && Array.isArray(PRODUCTS_DATA)) {
      const match = PRODUCTS_DATA.find(p => p.image.includes(filename) || (p.gallery && p.gallery.some(g => g.includes(filename))));
      if (match && match.image !== src) {
        img.src = match.image;
        return;
      }
    }
  }
}, true);


function initPreloader() {
  let preloader = document.getElementById('site-preloader');
  
  if (!preloader && document.body) {
    preloader = document.createElement('div');
    preloader.id = 'site-preloader';
    preloader.className = 'site-preloader';
    preloader.innerHTML = `
      <div class="preloader-content">
        <div class="preloader-logo">
          <i class="fa-solid fa-bolt preloader-bolt"></i>
          <span class="preloader-title">Nova Mart</span>
        </div>
        <div class="preloader-spinner-wrapper">
          <div class="preloader-spinner"></div>
        </div>
        <div class="preloader-bar-container">
          <div class="preloader-bar"></div>
        </div>
        <p class="preloader-text">Loading store...</p>
      </div>
    `;
    document.body.prepend(preloader);
  }

  const dismiss = () => {
    const el = document.getElementById('site-preloader');
    if (el && !el.classList.contains('fade-out')) {
      el.classList.add('fade-out');
    }
  };

  if (document.readyState === 'complete') {
    setTimeout(dismiss, 350);
  } else {
    window.addEventListener('load', () => {
      setTimeout(dismiss, 350);
    });
  }
  setTimeout(dismiss, 2000);
}
if (document.body) {
  initPreloader();
} else {
  document.addEventListener('DOMContentLoaded', initPreloader);
}

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStickyHeader();
  initMobileDrawer();
  initGlobalSearch();
  initModalListeners();
  initDealsTimer();
  const path = window.location.pathname.toLowerCase();
  
  if (path.endsWith('index.html') || path.endsWith('/') || !path.includes('.html')) {
    initHomePage();
  } else if (path.endsWith('shop.html')) {
    initShopPage();
  } else if (path.endsWith('product-details.html')) {
    initProductDetailsPage();
  } else if (path.endsWith('cart.html')) {
    initCartPage();
  } else if (path.endsWith('wishlist.html')) {
    initWishlistPage();
  } else if (path.endsWith('checkout.html')) {
    initCheckoutPage();
  } else if (path.endsWith('login.html')) {
    initLoginPage();
  } else if (path.endsWith('register.html')) {
    initRegisterPage();
  } else if (path.endsWith('profile.html')) {
    initProfilePage();
  }
});


function initStickyHeader() {
  const header = document.querySelector('.header-main');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}


function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close-btn');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));
}


function initGlobalSearch() {
  const searchBoxes = document.querySelectorAll('.header-search');
  searchBoxes.forEach(box => {
    const input = box.querySelector('input');
    const icon = box.querySelector('i');

    const executeSearch = () => {
      if (!input) return;
      const query = input.value.trim();
      if (query) {
        window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
      }
    };

    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') executeSearch();
      });
    }

    if (icon) {
      icon.style.cursor = 'pointer';
      icon.addEventListener('click', executeSearch);
    }
  });
}


window.showToast = function(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item ${type}`;
  
  const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};


function createProductCardHTML(product) {
  const inWishlist = isInWishlist(product.id);
  const wishlistIconClass = inWishlist ? 'fa-solid fa-heart active' : 'fa-regular fa-heart';
  const discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-box">
        ${discountPercent > 0 ? `<span class="discount-badge">${discountPercent}% OFF</span>` : ''}
        <button class="wishlist-btn ${inWishlist ? 'active' : ''}" onclick="event.preventDefault(); handleWishlistClick('${product.id}', this)">
          <i class="${wishlistIconClass}"></i>
        </button>
        <a href="product-details.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
        <div class="quick-view-overlay">
          <button class="quick-view-btn" onclick="openQuickView('${product.id}')">
            <i class="fa-regular fa-eye"></i> Quick View
          </button>
        </div>
      </div>
      <div class="product-details-box">
        <span class="product-category-name">${product.category}</span>
        <a href="product-details.html?id=${product.id}">
          <h3 class="product-title">${product.name}</h3>
        </a>
        <div class="product-rating">
          <div class="stars-icon">
            <i class="fa-solid fa-star"></i> ${product.rating.toFixed(1)}
          </div>
          <span class="reviews-count">(${product.reviewsCount})</span>
        </div>
        <div class="product-price-row">
          <div class="price-box">
            <span class="current-price">$${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span class="old-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="add-cart-btn" onclick="addToCart('${product.id}', 1); event.stopPropagation();" title="Add to Cart">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}
window.handleWishlistClick = function(productId, btnElement) {
  const added = toggleWishlist(productId);
  if (btnElement) {
    const icon = btnElement.querySelector('i');
    if (added) {
      btnElement.classList.add('active');
      if (icon) icon.className = 'fa-solid fa-heart active';
    } else {
      btnElement.classList.remove('active');
      if (icon) icon.className = 'fa-regular fa-heart';
    }
  }
  if (document.getElementById('wishlist-products-grid')) {
    initWishlistPage();
  }
};


function initModalListeners() {
  const modalOverlay = document.querySelector('.modal-overlay');
  if (!modalOverlay) return;

  const closeBtn = modalOverlay.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  });
}

window.openQuickView = function(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const modalOverlay = document.querySelector('.modal-overlay');
  const modalBody = document.querySelector('.modal-body');
  if (!modalOverlay || !modalBody) return;

  const discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  modalBody.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem;">
      <div style="height: 320px; border-radius: var(--radius-lg); overflow: hidden;">
        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div>
        <span class="product-category-name">${product.category}</span>
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--clr-dark); margin: 0.5rem 0;">${product.name}</h2>
        <div class="product-rating" style="margin-bottom: 1rem;">
          <div class="stars-icon"><i class="fa-solid fa-star"></i> ${product.rating}</div>
          <span class="reviews-count">(${product.reviewsCount} reviews)</span>
        </div>
        <div class="price-box" style="margin-bottom: 1rem;">
          <span class="current-price" style="font-size: 1.5rem;">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="old-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
          ${discountPercent > 0 ? `<span class="discount-badge" style="position: static;">${discountPercent}% OFF</span>` : ''}
        </div>
        <p style="font-size: 0.9rem; color: var(--clr-gray-600); margin-bottom: 1.5rem;">${product.shortDesc}</p>
        
        <div style="display: flex; gap: 1rem; align-items: center;">
          <div class="quantity-picker">
            <button class="qty-btn" onclick="const input = this.nextElementSibling; input.value = Math.max(1, (parseInt(input.value) || 1) - 1);">-</button>
            <input type="number" class="qty-input" id="modal-qty" value="1" min="1">
            <button class="qty-btn" onclick="const input = this.previousElementSibling; input.value = (parseInt(input.value) || 1) + 1;">+</button>
          </div>
          <button class="btn-custom btn-primary-custom" style="flex: 1;" onclick="
            const qty = Math.max(1, parseInt(document.getElementById('modal-qty').value) || 1);
            addToCart('${product.id}', qty);
            document.querySelector('.modal-overlay').classList.remove('open');
          ">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add('open');
};


function initDealsTimer() {
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  const secsEl = document.getElementById('timer-secs');

  if (!hoursEl || !minsEl || !secsEl) return;
  let targetTime = new Date().getTime() + (14 * 3600 * 1000);

  function updateTimer() {
    const now = new Date().getTime();
    let distance = targetTime - now;

    if (distance < 0) {
      targetTime = new Date().getTime() + (14 * 3600 * 1000);
      distance = targetTime - now;
    }

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    hoursEl.textContent = hours.toString().padStart(2, '0');
    minsEl.textContent = minutes.toString().padStart(2, '0');
    secsEl.textContent = seconds.toString().padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}


function initHomePage() {
  const featuredContainer = document.getElementById('featured-products-grid');
  if (featuredContainer) {
    const featuredProducts = getFeaturedProducts().slice(0, 8);
    featuredContainer.innerHTML = featuredProducts.map(p => createProductCardHTML(p)).join('');
  }
}


function initShopPage() {
  const shopGrid = document.getElementById('shop-products-grid');
  const productCountEl = document.getElementById('product-count');
  const sortSelect = document.getElementById('sort-select');
  const priceRange = document.getElementById('price-range');
  const priceValue = document.getElementById('price-value');
  const filterForm = document.getElementById('filter-form');
  
  if (!shopGrid) return;
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category');
  const initialSearch = urlParams.get('search');
  const isDealOnly = urlParams.get('deal') === 'true';

  if (initialSearch) {
    const searchInputs = document.querySelectorAll('.header-search input');
    searchInputs.forEach(i => i.value = initialSearch);
  }
  if (initialCategory) {
    const catCheckboxes = document.querySelectorAll('input[name="category"]');
    catCheckboxes.forEach(cb => {
      if (cb.value.toLowerCase() === initialCategory.toLowerCase()) {
        cb.checked = true;
      }
    });
  }

  const renderFilteredShop = () => {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const maxPrice = priceRange ? priceRange.value : 1000;
    const selectedRating = document.querySelector('input[name="rating"]:checked')?.value || 0;
    const inStockOnly = document.getElementById('instock-checkbox')?.checked || false;
    const sortBy = sortSelect ? sortSelect.value : 'featured';
    const activeSearchInput = document.querySelector('.header-search input');
    const searchQuery = activeSearchInput ? activeSearchInput.value.trim() : (initialSearch || '');

    const results = filterAndSortProducts(getAllProducts(), {
      searchQuery,
      categories: selectedCategories,
      maxPrice,
      minRating: selectedRating,
      inStockOnly,
      dealOnly: isDealOnly,
      sortBy
    });

    if (productCountEl) {
      productCountEl.textContent = results.length;
    }

    if (results.length === 0) {
      shopGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
          <h3>No Products Found</h3>
          <p>We couldn't find any products matching your selected filters.</p>
          <button class="btn-custom btn-primary-custom" onclick="resetFilters()">Clear All Filters</button>
        </div>
      `;
    } else {
      shopGrid.innerHTML = results.map(p => createProductCardHTML(p)).join('');
    }
  };

  const searchInputs = document.querySelectorAll('.header-search input');
  searchInputs.forEach(input => input.addEventListener('input', renderFilteredShop));

  if (priceRange && priceValue) {
    priceRange.addEventListener('input', (e) => {
      priceValue.textContent = `$${e.target.value}`;
      renderFilteredShop();
    });
  }

  if (filterForm) {
    filterForm.addEventListener('change', renderFilteredShop);
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', renderFilteredShop);
  }

  window.resetFilters = function() {
    if (filterForm) filterForm.reset();
    if (priceRange && priceValue) {
      priceRange.value = 1000;
      priceValue.textContent = '$1000';
    }
    const searchInputs = document.querySelectorAll('.header-search input');
    searchInputs.forEach(i => i.value = '');
    renderFilteredShop();
  };

  renderFilteredShop();
}


function initProductDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'prod-1';
  const product = getProductById(productId);

  if (!product) return;

  document.title = `${product.name} - Nova Mart`;
  const galleryMain = document.getElementById('details-main-img');
  const galleryThumbs = document.getElementById('details-thumbs');
  if (galleryMain) galleryMain.src = product.image;

  if (galleryThumbs && product.gallery) {
    galleryThumbs.innerHTML = product.gallery.map((imgUrl, index) => `
      <img src="${imgUrl}" class="thumb-img ${index === 0 ? 'active' : ''}" onclick="
        document.getElementById('details-main-img').src = '${imgUrl}';
        document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      " alt="Thumbnail">
    `).join('');
  }
  const titleEl = document.getElementById('details-title');
  const categoryEl = document.getElementById('details-category');
  const ratingEl = document.getElementById('details-rating');
  const reviewsEl = document.getElementById('details-reviews');
  const priceEl = document.getElementById('details-price');
  const oldPriceEl = document.getElementById('details-old-price');
  const descEl = document.getElementById('details-desc');
  const colorSelector = document.getElementById('details-colors');
  const sizeSelector = document.getElementById('details-sizes');
  const specsContainer = document.getElementById('details-specs');

  if (titleEl) titleEl.textContent = product.name;
  if (categoryEl) categoryEl.textContent = product.category;
  if (ratingEl) ratingEl.innerHTML = `<i class="fa-solid fa-star stars-icon"></i> ${product.rating.toFixed(1)}`;
  if (reviewsEl) reviewsEl.textContent = `(${product.reviewsCount} customer reviews)`;
  if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;
  if (oldPriceEl) {
    oldPriceEl.textContent = product.originalPrice ? `$${product.originalPrice.toFixed(2)}` : '';
  }
  if (descEl) descEl.textContent = product.description;
  if (colorSelector && product.colors) {
    colorSelector.innerHTML = product.colors.map((c, i) => `
      <label class="checkbox-label" style="background: var(--clr-gray-100); padding: 0.4rem 0.8rem; border-radius: var(--radius-sm);">
        <input type="radio" name="product-color" value="${c}" ${i === 0 ? 'checked' : ''}> ${c}
      </label>
    `).join('');
  }
  if (sizeSelector) {
    if (product.sizes) {
      sizeSelector.innerHTML = `
        <div style="margin-top: 1rem;">
          <label style="font-weight: 600; display: block; margin-bottom: 0.4rem;">Select Size:</label>
          <div style="display: flex; gap: 0.5rem;">
            ${product.sizes.map((s, i) => `
              <label class="checkbox-label" style="background: var(--clr-gray-100); padding: 0.4rem 0.8rem; border-radius: var(--radius-sm);">
                <input type="radio" name="product-size" value="${s}" ${i === 0 ? 'checked' : ''}> ${s}
              </label>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      sizeSelector.innerHTML = '';
    }
  }
  if (specsContainer && product.specs) {
    specsContainer.innerHTML = Object.entries(product.specs).map(([key, val]) => `
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.75rem 0; font-weight: 600; width: 30%; color: var(--clr-dark);">${key}</td>
        <td style="padding: 0.75rem 0; color: var(--clr-gray-600);">${val}</td>
      </tr>
    `).join('');
  }
  const addCartBtn = document.getElementById('details-add-cart-btn');
  const wishlistBtn = document.getElementById('details-wishlist-btn');

  if (addCartBtn) {
    addCartBtn.onclick = () => {
      const qtyInput = document.getElementById('details-qty-input');
      const qty = Math.max(1, parseInt(qtyInput ? qtyInput.value : '1') || 1);
      const selectedColor = document.querySelector('input[name="product-color"]:checked')?.value;
      const selectedSize = document.querySelector('input[name="product-size"]:checked')?.value;
      addToCart(product.id, qty, selectedColor, selectedSize);
    };
  }

  if (wishlistBtn) {
    const inWishlist = isInWishlist(product.id);
    if (inWishlist) {
      wishlistBtn.classList.add('active');
      const icon = wishlistBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-heart active';
    } else {
      wishlistBtn.classList.remove('active');
      const icon = wishlistBtn.querySelector('i');
      if (icon) icon.className = 'fa-regular fa-heart';
    }
    wishlistBtn.onclick = () => handleWishlistClick(product.id, wishlistBtn);
  }
  const relatedGrid = document.getElementById('related-products-grid');
  if (relatedGrid) {
    const related = getAllProducts().filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    relatedGrid.innerHTML = related.map(p => createProductCardHTML(p)).join('');
  }
}


function initCartPage() {
  const tableBody = document.getElementById('cart-table-body');
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountEl = document.getElementById('cart-discount');
  const shippingEl = document.getElementById('cart-shipping');
  const taxEl = document.getElementById('cart-tax');
  const totalEl = document.getElementById('cart-total');
  const couponForm = document.getElementById('coupon-form');
  const couponInput = document.getElementById('coupon-input');

  if (!tableBody) return;

  const renderCart = () => {
    const cart = getCart();
    const totals = getCartTotals();

    if (cart.length === 0) {
      document.querySelector('.cart-page-wrapper').innerHTML = `
        <div class="container-custom">
          <div class="empty-state">
            <div class="empty-state-icon"><i class="fa-solid fa-cart-shopping"></i></div>
            <h3>Your Cart is Empty</h3>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <a href="shop.html" class="btn-custom btn-primary-custom">Explore Products</a>
          </div>
        </div>
      `;
      return;
    }

    tableBody.innerHTML = cart.map((item, index) => `
      <tr>
        <td>
          <div class="cart-product-cell">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <h4 style="font-weight: 700; color: var(--clr-dark);">${item.name}</h4>
              <span style="font-size: 0.8rem; color: var(--clr-gray-500);">
                ${item.color ? `Color: ${item.color}` : ''} ${item.size ? `| Size: ${item.size}` : ''}
              </span>
            </div>
          </div>
        </td>
        <td style="font-weight: 600;">$${item.price.toFixed(2)}</td>
        <td>
          <div class="quantity-picker">
            <button class="qty-btn" onclick="updateCartQty(${index}, ${item.quantity - 1}); initCartPage();">-</button>
            <input type="number" class="qty-input" value="${item.quantity}" readonly>
            <button class="qty-btn" onclick="updateCartQty(${index}, ${item.quantity + 1}); initCartPage();">+</button>
          </div>
        </td>
        <td style="font-weight: 800; color: var(--clr-dark);">$${(item.price * item.quantity).toFixed(2)}</td>
        <td style="text-align: center;">
          <button style="color: var(--clr-danger); font-size: 1.1rem; background: none; border: none; cursor: pointer;" onclick="removeFromCart(${index}); initCartPage();" title="Remove">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `).join('');

    if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (discountEl) discountEl.textContent = `-$${totals.discountAmount.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${totals.tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;
  };

  if (couponForm) {
    couponForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (couponInput) {
        const result = applyPromoCode(couponInput.value);
        showToast(result.message, result.success ? 'success' : 'info');
        renderCart();
      }
    });
  }

  renderCart();
}


function initWishlistPage() {
  const grid = document.getElementById('wishlist-products-grid');
  if (!grid) return;

  const renderWishlist = () => {
    const wishlistIds = getWishlist();
    const products = wishlistIds.map(id => getProductById(id)).filter(Boolean);

    if (products.length === 0) {
      grid.parentElement.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon"><i class="fa-regular fa-heart"></i></div>
          <h3>Your Wishlist is Empty</h3>
          <p>Save items you love to review them later.</p>
          <a href="shop.html" class="btn-custom btn-primary-custom">Discover Items</a>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map(p => createProductCardHTML(p)).join('');
  };

  renderWishlist();
}


function initCheckoutPage() {
  const totals = getCartTotals();
  const cart = getCart();

  const checkoutSubtotal = document.getElementById('checkout-subtotal');
  const checkoutShipping = document.getElementById('checkout-shipping');
  const checkoutTax = document.getElementById('checkout-tax');
  const checkoutTotal = document.getElementById('checkout-total');
  const checkoutItemsSummary = document.getElementById('checkout-items-summary');
  const checkoutForm = document.getElementById('checkout-form');

  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  if (checkoutSubtotal) checkoutSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
  if (checkoutShipping) checkoutShipping.textContent = totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`;
  if (checkoutTax) checkoutTax.textContent = `$${totals.tax.toFixed(2)}`;
  if (checkoutTotal) checkoutTotal.textContent = `$${totals.total.toFixed(2)}`;

  if (checkoutItemsSummary) {
    checkoutItemsSummary.innerHTML = cart.map(item => `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${item.image}" alt="${item.name}" style="width: 48px; height: 48px; border-radius: var(--radius-sm);">
          <div>
            <h5 style="font-size: 0.9rem; font-weight: 700; color: var(--clr-dark);">${item.name}</h5>
            <span style="font-size: 0.75rem; color: var(--clr-gray-500);">Qty: ${item.quantity}</span>
          </div>
        </div>
        <span style="font-weight: 700; font-size: 0.9rem;">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('');
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const modalOverlay = document.querySelector('.modal-overlay');
      const modalBody = document.querySelector('.modal-body');

      if (modalOverlay && modalBody) {
        modalBody.innerHTML = `
          <div style="text-align: center; padding: 3rem 2rem;">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--clr-primary-light); color: var(--clr-primary); font-size: 2.5rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
              <i class="fa-solid fa-circle-info"></i>
            </div>
            <h2 style="font-size: 2rem; font-weight: 800; color: var(--clr-dark); margin-bottom: 0.5rem;">Demo Checkout</h2>
            <p style="color: var(--clr-gray-600); margin-bottom: 1.5rem;">No order was submitted and no payment was processed.</p>
            
            <div style="background: var(--clr-gray-100); padding: 1.25rem; border-radius: var(--radius-lg); max-width: 400px; margin: 0 auto 2rem auto; text-align: left;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--clr-gray-600);">Demo total (not charged):</span>
                <strong style="color: var(--clr-primary);">$${totals.total.toFixed(2)}</strong>
              </div>
            </div>

            <a class="btn-custom btn-primary-custom" href="cart.html">Return to Cart</a>
          </div>
        `;
        modalOverlay.classList.add('open');
      }
    });
  }
}


function initLoginPage() {
  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      showToast('Demo only: sign-in is not connected.', 'info');
    });
  }
}

function initRegisterPage() {
  const form = document.getElementById('register-form');
  const passwordInput = document.getElementById('reg-password');
  const strengthBar = document.querySelector('.strength-bar');

  if (passwordInput && strengthBar) {
    passwordInput.addEventListener('input', (e) => {
      const val = e.target.value;
      let score = 0;
      if (val.length >= 6) score += 33;
      if (/[A-Z]/.test(val)) score += 33;
      if (/[0-9]/.test(val) || /[^A-Za-z0-9]/.test(val)) score += 34;

      strengthBar.style.width = `${score}%`;
      strengthBar.style.backgroundColor = score < 66 ? 'var(--clr-danger)' : (score < 100 ? 'var(--clr-accent)' : 'var(--clr-secondary)');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      showToast('Demo only: account registration is not connected.', 'info');
    });
  }
}


function initProfilePage() {
  const navBtns = document.querySelectorAll('.profile-nav-btn');
  const sections = document.querySelectorAll('.profile-tab-content');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      navBtns.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.style.display = 'none');

      btn.classList.add('active');
      const targetSec = document.getElementById(target);
      if (targetSec) targetSec.style.display = 'block';
    });
  });
}
