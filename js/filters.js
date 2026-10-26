

function filterAndSortProducts(allProducts, options = {}) {
  let filtered = [...allProducts];
  if (options.searchQuery && options.searchQuery.trim() !== '') {
    const query = options.searchQuery.trim().toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      (p.shortDesc && p.shortDesc.toLowerCase().includes(query))
    );
  }
  if (options.categories && options.categories.length > 0) {
    const lowerCategories = options.categories.map(c => c.toLowerCase());
    filtered = filtered.filter(p => lowerCategories.includes(p.category.toLowerCase()));
  }
  if (options.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= parseFloat(options.maxPrice));
  }
  if (options.minRating) {
    filtered = filtered.filter(p => p.rating >= parseFloat(options.minRating));
  }
  if (options.inStockOnly) {
    filtered = filtered.filter(p => p.inStock);
  }
  if (options.dealOnly) {
    filtered = filtered.filter(p => p.deal);
  }
  if (options.sortBy) {
    switch (options.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => {
          const discA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
          const discB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
          return discB - discA;
        });
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
  }

  return filtered;
}
