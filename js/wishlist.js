

const WISHLIST_STORAGE_KEY = 'nova_wishlist';
function getWishlist() {
  const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
  try {
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Error parsing wishlist data', e);
    return [];
  }
}
function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
}
function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  const product = getProductById(productId);

  let added = false;
  if (index > -1) {
    wishlist.splice(index, 1);
    if (window.showToast && product) {
      window.showToast(`Removed "${product.name}" from wishlist.`, 'info');
    }
  } else {
    wishlist.push(productId);
    added = true;
    if (window.showToast && product) {
      window.showToast(`Added "${product.name}" to wishlist!`, 'success');
    }
  }

  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  updateWishlistBadges();
  return added;
}
function updateWishlistBadges() {
  const wishlist = getWishlist();
  const count = wishlist.length;

  const badges = document.querySelectorAll('.wishlist-badge');
  badges.forEach(badge => {
    badge.textContent = count;
  });
}
document.addEventListener('DOMContentLoaded', updateWishlistBadges);
