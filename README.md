# Nova Mart

Nova Mart is a responsive, multi-page storefront demo for browsing electronics, fashion, home and living, and beauty products.

## Features

- Home page with featured products, promotions, and category links
- Product browsing with category filters and product detail pages
- Shopping cart, checkout, wishlist, and account pages
- Responsive navigation, search, and shared storefront styling

## Project structure

```text
.
├── assets/
│   └── images/          # Banners, category artwork, and product images
├── css/                 # Page and shared component styles
├── js/                  # Product data and storefront interactions
├── index.html           # Store home page
├── shop.html            # Product catalog
├── product-details.html # Product details
├── cart.html
├── checkout.html
├── wishlist.html
├── login.html
├── register.html
└── profile.html
```

## Run locally

No build step or package installation is required. Open `index.html` in a browser to view the storefront. The page loads fonts, icons, and Bootstrap's grid stylesheet from external CDNs, so those resources require an internet connection.

## Before launching a real store

This repository is a front-end demo. Authentication, account registration, password resets, order submission, payment processing, newsletter subscriptions, and order tracking are not connected to backend services. Do not collect real customer or payment information or accept real orders with this version.

Before operating a real store, connect and test secure services for these features, publish accurate privacy and terms documents, and add verified contact, shipping, and returns information. Add social links only for Nova Mart's official accounts.
