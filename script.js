/* =====================================================
   GreenGrocery - script.js
   Part 1 : Products + Storage + Initialization
===================================================== */

const products = [
  {
    id: 1,
    name: "Organic Bananas",
    category: "Fruits",
    price: 2.49,
    rating: 4.8,
    stock: true,
    badge: "15% off",
    image: "assets/images/bananas.avif",
    description:
      "Naturally sweet organic bananas, ideal for smoothies, breakfast bowls, and healthy snacks."
  },

  {
    id: 2,
    name: "Honeycrisp Apples",
    category: "Fruits",
    price: 4.99,
    rating: 4.9,
    stock: true,
    badge: "Fresh",
    image: "assets/images/apples.avif",
    description:
      "Crisp, juicy apples with balanced sweetness and a refreshing bite."
  },

  {
    id: 3,
    name: "Baby Spinach Box",
    category: "Vegetables",
    price: 3.79,
    rating: 4.7,
    stock: true,
    badge: "Organic",
    image: "assets/images/spinach.avif",
    description:
      "Tender baby spinach leaves washed and packed for salads, wraps, and quick sautés."
  },

  {
    id: 4,
    name: "Vine Tomatoes",
    category: "Vegetables",
    price: 3.49,
    rating: 4.6,
    stock: true,
    badge: "Deal",
    image: "assets/images/tomatoes.avif",
    description:
      "Bright vine-ripened tomatoes with a rich garden aroma."
  },

  {
    id: 5,
    name: "Whole Milk",
    category: "Dairy",
    price: 2.99,
    rating: 4.8,
    stock: true,
    badge: "",
    image: "assets/images/milk.avif",
    description:
      "Creamy whole milk sourced from trusted local dairies."
  },

  {
    id: 6,
    name: "Greek Yogurt",
    category: "Dairy",
    price: 5.49,
    rating: 4.7,
    stock: true,
    badge: "Protein",
    image: "assets/images/yogurt.avif",
    description:
      "Thick, protein-rich Greek yogurt with a smooth texture and clean flavor."
  },

  {
    id: 7,
    name: "Cold Pressed Juice",
    category: "Beverages",
    price: 4.29,
    rating: 4.5,
    stock: true,
    badge: "New",
    image: "assets/images/juice.avif",
    description:
      "A refreshing blend of fruit and vegetables cold pressed for bright natural flavor."
  },

  {
    id: 8,
    name: "Sparkling Water",
    category: "Beverages",
    price: 3.99,
    rating: 4.4,
    stock: false,
    badge: "",
    image: "assets/images/sparkling-water.avif",
    description:
      "Lightly carbonated mineral water for everyday refreshment."
  },

  {
    id: 9,
    name: "Multigrain Bread",
    category: "Bakery",
    price: 4.25,
    rating: 4.8,
    stock: true,
    badge: "Baked Today",
    image: "assets/images/bread.avif",
    description:
      "Hearty multigrain loaf with seeds, whole grains, and a soft crumb."
  },

  {
    id: 10,
    name: "Butter Croissants",
    category: "Bakery",
    price: 6.50,
    rating: 4.9,
    stock: true,
    badge: "Popular",
    image: "assets/images/croissant.avif",
    description:
      "Flaky butter croissants baked golden for breakfast or coffee breaks."
  },

  {
    id: 11,
    name: "Roasted Almonds",
    category: "Snacks",
    price: 7.99,
    rating: 4.7,
    stock: true,
    badge: "10% off",
    image: "assets/images/almonds.avif",
    description:
      "Crunchy roasted almonds with a clean, lightly salted finish."
  },

  {
    id: 12,
    name: "Sea Salt Chips",
    category: "Snacks",
    price: 3.29,
    rating: 4.3,
    stock: true,
    badge: "",
    image: "assets/images/chips.avif",
    description:
      "Crisp kettle-style chips seasoned with sea salt."
  }
];

/* =====================================================
   Local Storage Keys
===================================================== */

const cartKey = "greengrocery-cart";
const orderKey = "greengrocery-orders";
const wishlistKey = "greengrocery-wishlist";

/* =====================================================
   Currency Formatter
===================================================== */

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
});

/* =====================================================
   Storage Helpers
===================================================== */

const getCart = () =>
  JSON.parse(localStorage.getItem(cartKey) || "[]");

const setCart = (cart) => {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCount();
};

const getOrders = () =>
  JSON.parse(localStorage.getItem(orderKey) || "[]");

const setOrders = (orders) =>
  localStorage.setItem(orderKey, JSON.stringify(orders));

const getWishlist = () =>
  JSON.parse(localStorage.getItem(wishlistKey) || "[]");

const setWishlist = (wishlist) =>
  localStorage.setItem(wishlistKey, JSON.stringify(wishlist));

const byId = (id) =>
  products.find((product) => product.id === Number(id));

/* =====================================================
   App Initialization
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  document.body.classList.add("loading");

  setTimeout(() => {
    document
      .querySelector(".loader")
      ?.classList.add("hidden");

    document.body.classList.remove("loading");
  }, 450);

  setupNavigation();

  setupBackToTop();

  setupNewsletter();

  updateCartCount();

  renderFeaturedProducts();

  renderCatalog();

  renderProductDetail();

  renderCart();

  renderCheckout();

  renderOrders();

});
/* =====================================================
   Navigation
===================================================== */

function setupNavigation() {

    const toggle = document.querySelector(".menu-toggle");
    const panel = document.querySelector(".nav-panel");

    if (!toggle || !panel) return;

    toggle.addEventListener("click", () => {

        const isOpen = panel.classList.toggle("open");

        toggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        toggle.textContent = isOpen ? "×" : "☰";

    });

}

/* =====================================================
   Back To Top Button
===================================================== */

function setupBackToTop() {

    const button = document.querySelector(".back-to-top");

    if (!button) return;

    window.addEventListener("scroll", () => {

        button.classList.toggle(
            "visible",
            window.scrollY > 500
        );

    });

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/* =====================================================
   Newsletter
===================================================== */

function setupNewsletter() {

    const form = document.querySelector("[data-newsletter]");

    if (!form) return;

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        form.reset();

        toast("Thanks for subscribing to GreenGrocery deals.");

    });

}

/* =====================================================
   Cart Counter
===================================================== */

function updateCartCount() {

    const count = getCart().reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    document
        .querySelectorAll(".cart-count")
        .forEach((node) => {

            node.textContent = count;

        });

}

/* =====================================================
   Product Card
===================================================== */

function productCard(product) {

    const wishlist = getWishlist();

    const wished = wishlist.includes(product.id);

    return `

    <article class="product-card">

        ${product.badge
            ? `<span class="badge">${product.badge}</span>`
            : ""}

        <button
            class="wishlist ${wished ? "active" : ""}"
            type="button"
            data-wishlist="${product.id}"
            aria-label="Add ${product.name} to wishlist">

            ♡

        </button>

        <a
            href="product-details.html?id=${product.id}"
            aria-label="View details for ${product.name}">

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy">

        </a>

        <div class="product-body">

            <div class="product-meta">

                <span>

                    ${product.category}

                </span>

                <span>

                    ★ ${product.rating}

                </span>

            </div>

            <h3>

                ${product.name}

            </h3>

            <div class="price-row">

                <span class="price">

                    ${currency.format(product.price)}

                </span>

                <span class="stock ${product.stock ? "" : "out"}">

                    ${product.stock
                        ? "In Stock"
                        : "Unavailable"}

                </span>

            </div>

            <div class="product-actions">

                <a
                    class="btn btn-secondary"
                    href="product-details.html?id=${product.id}">

                    Details

                </a>

                <button
                    class="btn btn-primary"
                    type="button"
                    data-add="${product.id}"
                    ${product.stock ? "" : "disabled"}>

                    Add

                </button>

            </div>

        </div>

    </article>

    `;

}
/* =====================================================
   Product Buttons
===================================================== */

function wireProductButtons(scope = document) {

    scope.querySelectorAll("[data-add]").forEach((button) => {

        button.addEventListener("click", () => {

            addToCart(button.dataset.add);

        });

    });

    scope.querySelectorAll("[data-wishlist]").forEach((button) => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.wishlist);

            const wishlist = getWishlist();

            const updatedWishlist = wishlist.includes(id)
                ? wishlist.filter(item => item !== id)
                : [...wishlist, id];

            setWishlist(updatedWishlist);

            button.classList.toggle("active");

            toast(
                updatedWishlist.includes(id)
                    ? "Added to wishlist."
                    : "Removed from wishlist."
            );

        });

    });

}

/* =====================================================
   Featured Products
===================================================== */

function renderFeaturedProducts() {

    const grid = document.querySelector(
        "[data-featured-products]"
    );

    if (!grid) return;

    grid.innerHTML = products
        .slice(0, 4)
        .map(productCard)
        .join("");

    wireProductButtons(grid);

}

/* =====================================================
   Product Catalog
===================================================== */

function renderCatalog() {

    const list = document.querySelector(
        "[data-product-list]"
    );

    if (!list) return;

    const search =
        document.querySelector("#catalog-search");

    const category =
        document.querySelector("#category-filter");

    const stockOnly =
        document.querySelector("#in-stock-filter");

    const sort =
        document.querySelector("#sort-products");

    const count =
        document.querySelector("#product-count");

    const params =
        new URLSearchParams(window.location.search);

    if (params.get("category")) {

        category.value = params.get("category");

    }

    if (params.get("q")) {

        search.value = params.get("q");

    }

    function draw() {

        let items = products.filter((product) => {

            const matchesSearch =

                product.name
                    .toLowerCase()
                    .includes(search.value.toLowerCase())

                ||

                product.category
                    .toLowerCase()
                    .includes(search.value.toLowerCase());

            const matchesCategory =

                category.value === "All"

                ||

                product.category === category.value;

            const matchesStock =

                !stockOnly.checked

                ||

                product.stock;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStock
            );

        });

        switch (sort.value) {

            case "price-low":
                items.sort(
                    (a, b) => a.price - b.price
                );
                break;

            case "price-high":
                items.sort(
                    (a, b) => b.price - a.price
                );
                break;

            case "rating":
                items.sort(
                    (a, b) => b.rating - a.rating
                );
                break;

            default:
                break;

        }

        count.textContent =
            `${items.length} product${items.length === 1 ? "" : "s"} found`;

        if (!items.length) {

            list.innerHTML = `
                <div class="empty-state">

                    <h2>No Products Found</h2>

                    <p>
                        Try changing your search
                        or filter options.
                    </p>

                </div>
            `;

            return;

        }

        list.innerHTML =
            items
                .map(productCard)
                .join("");

        wireProductButtons(list);

    }

    [search, category, stockOnly, sort]
        .forEach(field => {

            field.addEventListener(
                "input",
                draw
            );

        });

    draw();

}
/* =====================================================
   Product Details
===================================================== */

function renderProductDetail() {

    const detail = document.querySelector(
        "[data-product-detail]"
    );

    if (!detail) return;

    const id =
        new URLSearchParams(window.location.search).get("id") || 1;

    const product =
        byId(id) || products[0];

    detail.innerHTML = `

        <div class="detail-media">

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy">

        </div>

        <article class="detail-info">

            <p class="eyebrow">

                ${product.category}

            </p>

            <h1>

                ${product.name}

            </h1>

            <div class="product-meta">

                <span>

                    ★ ${product.rating} Customer Rating

                </span>

                <span class="stock ${product.stock ? "" : "out"}">

                    ${product.stock
                        ? "Available Today"
                        : "Currently Unavailable"}

                </span>

            </div>

            <p>

                ${product.description}

            </p>

            <p>

                Carefully sourced by trusted GreenGrocery
                partners and packed fresh for every order.

            </p>

            <div class="detail-price">

                ${currency.format(product.price)}

            </div>

            <div class="detail-actions">

                <div
                    class="quantity-control"
                    aria-label="Quantity Selector">

                    <button
                        type="button"
                        data-qty-minus
                        aria-label="Decrease Quantity">

                        -

                    </button>

                    <input
                        id="detail-quantity"
                        value="1"
                        inputmode="numeric"
                        aria-label="Quantity">

                    <button
                        type="button"
                        data-qty-plus
                        aria-label="Increase Quantity">

                        +

                    </button>

                </div>

                <button
                    class="btn btn-primary"
                    type="button"
                    data-detail-add="${product.id}"
                    ${product.stock ? "" : "disabled"}>

                    Add to Cart

                </button>

            </div>

        </article>

    `;

    const quantity =
        detail.querySelector("#detail-quantity");

    detail
        .querySelector("[data-qty-minus]")
        .addEventListener("click", () => {

            quantity.value = Math.max(
                1,
                Number(quantity.value) - 1
            );

        });

    detail
        .querySelector("[data-qty-plus]")
        .addEventListener("click", () => {

            quantity.value =
                Number(quantity.value || 1) + 1;

        });

    detail
        .querySelector("[data-detail-add]")
        .addEventListener("click", () => {

            addToCart(
                product.id,
                Number(quantity.value || 1)
            );

        });

    const related =
        document.querySelector(
            "[data-related-products]"
        );

    if (!related) return;

    related.innerHTML = products

        .filter(item =>
            item.category === product.category &&
            item.id !== product.id
        )

        .slice(0, 4)

        .concat(

            products
                .filter(item =>
                    item.category !== product.category
                )
                .slice(0, 2)

        )

        .slice(0, 4)

        .map(productCard)

        .join("");

    wireProductButtons(related);

}

/* =====================================================
   Add To Cart
===================================================== */

function addToCart(id, quantity = 1) {

    const product = byId(id);

    if (!product || !product.stock) return;

    const cart = getCart();

    const existingItem = cart.find(
        item => item.id === product.id
    );

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({

            id: product.id,

            quantity

        });

    }

    setCart(cart);

    toast(`${product.name} added to cart.`);

}
/* =====================================================
   Cart Calculations
===================================================== */

function cartTotals() {

    const items = getCart()

        .map(item => ({
            ...item,
            product: byId(item.id)
        }))

        .filter(item => item.product);

    const subtotal = items.reduce(

        (sum, item) =>
            sum + item.product.price * item.quantity,

        0

    );

    const delivery =
        subtotal > 0 && subtotal < 35
            ? 4.99
            : 0;

    const tax =
        subtotal * 0.06;

    const total =
        subtotal + delivery + tax;

    return {

        items,

        subtotal,

        delivery,

        tax,

        total

    };

}

/* =====================================================
   Render Cart
===================================================== */

function renderCart() {

    const container =
        document.querySelector("[data-cart-items]");

    const summary =
        document.querySelector("[data-cart-summary]");

    if (!container || !summary) return;

    function draw() {

        const totals = cartTotals();

        container.innerHTML = totals.items.length

            ? totals.items.map(({ product, quantity }) => `

                <article class="cart-row">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy">

                    <div>

                        <h3>

                            ${product.name}

                        </h3>

                        <p>

                            ${product.category}
                            ·
                            ${currency.format(product.price)} each

                        </p>

                        <div class="quantity-control">

                            <button
                                type="button"
                                data-cart-minus="${product.id}"
                                aria-label="Decrease ${product.name}">

                                -

                            </button>

                            <input
                                value="${quantity}"
                                inputmode="numeric"
                                data-cart-input="${product.id}"
                                aria-label="Quantity for ${product.name}">

                            <button
                                type="button"
                                data-cart-plus="${product.id}"
                                aria-label="Increase ${product.name}">

                                +

                            </button>

                        </div>

                    </div>

                    <button
                        class="remove-btn"
                        type="button"
                        data-remove="${product.id}">

                        Remove

                    </button>

                </article>

            `).join("")

            : `

                <div class="empty-state">

                    <h2>

                        Your Cart is Empty

                    </h2>

                    <p>

                        Add fresh groceries from the catalog
                        to begin checkout.

                    </p>

                    <a
                        class="btn btn-primary"
                        href="products.html">

                        Shop Products

                    </a>

                </div>

            `;

        summary.innerHTML =
            summaryHtml(totals, true);

        wireCartControls(draw);

    }

    draw();

}

/* =====================================================
   Cart Controls
===================================================== */

function wireCartControls(draw) {

    document

        .querySelectorAll("[data-cart-minus]")

        .forEach(button => {

            button.addEventListener("click", () =>

                changeQuantity(

                    button.dataset.cartMinus,

                    -1,

                    draw

                )

            );

        });

    document

        .querySelectorAll("[data-cart-plus]")

        .forEach(button => {

            button.addEventListener("click", () =>

                changeQuantity(

                    button.dataset.cartPlus,

                    1,

                    draw

                )

            );

        });

    document

        .querySelectorAll("[data-cart-input]")

        .forEach(input => {

            input.addEventListener("change", () =>

                setQuantity(

                    input.dataset.cartInput,

                    Number(input.value),

                    draw

                )

            );

        });

    document

        .querySelectorAll("[data-remove]")

        .forEach(button => {

            button.addEventListener("click", () => {

                setCart(

                    getCart().filter(item =>

                        item.id !== Number(button.dataset.remove)

                    )

                );

                draw();

            });

        });

}

/* =====================================================
   Change Quantity
===================================================== */

function changeQuantity(id, delta, draw) {

    const cart = getCart().map(item =>

        item.id === Number(id)

            ? {

                ...item,

                quantity: Math.max(

                    1,

                    item.quantity + delta

                )

            }

            : item

    );

    setCart(cart);

    draw();

}

/* =====================================================
   Set Quantity
===================================================== */

function setQuantity(id, quantity, draw) {

    const cart = getCart().map(item =>

        item.id === Number(id)

            ? {

                ...item,

                quantity: Math.max(

                    1,

                    quantity || 1

                )

            }

            : item

    );

    setCart(cart);

    draw();

}
/* =====================================================
   Order Summary
===================================================== */

function summaryHtml(totals, includeButton = false) {

    return `

        <h2>

            Order Summary

        </h2>

        <div class="summary-line">

            <span>

                Subtotal

            </span>

            <strong>

                ${currency.format(totals.subtotal)}

            </strong>

        </div>

        <div class="summary-line">

            <span>

                Delivery

            </span>

            <strong>

                ${
                    totals.delivery
                        ? currency.format(totals.delivery)
                        : "Free"
                }

            </strong>

        </div>

        <div class="summary-line">

            <span>

                Estimated Tax

            </span>

            <strong>

                ${currency.format(totals.tax)}

            </strong>

        </div>

        <div class="summary-total">

            <span>

                Total

            </span>

            <strong>

                ${currency.format(totals.total)}

            </strong>

        </div>

        ${
            includeButton
                ? `
                    <a
                        class="btn btn-primary wide"
                        href="checkout.html">

                        Proceed to Checkout

                    </a>
                  `
                : ""
        }

    `;

}

/* =====================================================
   Checkout
===================================================== */

function renderCheckout() {

    const summary =
        document.querySelector("[data-checkout-summary]");

    const form =
        document.querySelector("[data-checkout-form]");

    if (!summary || !form) return;

    const totals = cartTotals();

    if (!totals.items.length) {

        summary.innerHTML = `

            <h2>

                Order Summary

            </h2>

            <p>

                Your cart is empty.

            </p>

            <a
                class="btn btn-primary wide"
                href="products.html">

                Shop Products

            </a>

        `;

    } else {

        summary.innerHTML = `

            ${summaryHtml(totals)}

            <p>

                ${totals.items.length}
                item group${totals.items.length === 1 ? "" : "s"}
                in this order.

            </p>

        `;

    }

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const latestTotals = cartTotals();

        if (!latestTotals.items.length) {

            toast(
                "Add items to your cart before placing an order."
            );

            return;

        }

        const data = new FormData(form);

        const order = {

            id: `GG-${Date.now().toString().slice(-6)}`,

            date: new Date().toLocaleDateString(),

            name: data.get("name"),

            slot: data.get("slot"),

            payment: data.get("payment"),

            status: 2,

            items: latestTotals.items.map(item => ({

                id: item.id,

                quantity: item.quantity

            })),

            total: latestTotals.total

        };

        setOrders([

            order,

            ...getOrders()

        ]);

        setCart([]);

        window.location.href =
            `orders.html?confirmed=${order.id}`;

    });

}
/* =====================================================
   Orders
===================================================== */

function renderOrders() {

    const list =
        document.querySelector("[data-orders-list]");

    if (!list) return;

    let orders = getOrders();

    // Demo order when no orders exist
    if (!orders.length) {

        orders = [

            {
                id: "GG-104218",
                date: "Jun 15, 2026",
                name: "Demo Shopper",
                slot: "Tomorrow, 8 AM - 10 AM",
                payment: "Card",
                status: 3,
                items: [
                    { id: 2, quantity: 2 },
                    { id: 9, quantity: 1 },
                    { id: 6, quantity: 1 }
                ],
                total: 24.57
            }

        ];

    }

    const confirmedId =
        new URLSearchParams(window.location.search)
            .get("confirmed");

    const confirmation =
        document.querySelector("[data-order-confirmation]");

    if (confirmedId && confirmation) {

        confirmation.classList.add("visible");

        confirmation.innerHTML = `

            <h2>

                Order Confirmed

            </h2>

            <p>

                Your order
                <strong>${confirmedId}</strong>
                has been placed successfully.

                We are preparing it now.

            </p>

        `;

    }

    list.innerHTML =

        orders

            .map(orderCard)

            .join("");

}

/* =====================================================
   Order Card
===================================================== */

function orderCard(order) {

    const steps = [

        "Confirmed",
        "Packed",
        "Out for Delivery",
        "Delivered"

    ];

    const items = order.items

        .map(item => {

            const product = byId(item.id);

            return product

                ? `${product.name} × ${item.quantity}`

                : `Product ${item.id} × ${item.quantity}`;

        })

        .join(", ");

    return `

        <article class="order-card">

            <div class="order-top">

                <div>

                    <h3>

                        ${order.id}

                    </h3>

                    <p>

                        ${order.date}
                        ·
                        ${order.slot}

                    </p>

                </div>

                <strong>

                    ${currency.format(order.total)}

                </strong>

            </div>

            <p>

                ${items}

            </p>

            <p>

                Payment:
                ${order.payment}

            </p>

            <div
                class="tracking-steps"
                aria-label="Order Tracking">

                ${steps

                    .map((step, index) => `

                        <span class="tracking-step ${index <= order.status ? "done" : ""}">

                            ${step}

                        </span>

                    `)

                    .join("")}

            </div>

        </article>

    `;

}

/* =====================================================
   Toast Notification
===================================================== */

function toast(message) {

    document
        .querySelector(".toast")
        ?.remove();

    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    toast.setAttribute(
        "role",
        "status"
    );

    Object.assign(toast.style, {

        position: "fixed",

        left: "50%",

        bottom: "24px",

        transform: "translateX(-50%)",

        zIndex: "1000",

        background: "#143d2b",

        color: "#ffffff",

        padding: "12px 18px",

        borderRadius: "10px",

        fontWeight: "700",

        boxShadow:
            "0 18px 40px rgba(20,61,43,.25)",

        animation:
            "fadeIn .25s ease"

    });

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 2300);

}