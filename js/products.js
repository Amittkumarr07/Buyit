// ============================================================
// products.js — the product catalog, plus the code that draws it
// Used by index.html, products.html and product-details.html
// ============================================================
//
// To add a product: copy one of the objects in PRODUCTS below and change it.
// Put its image in images/, or leave image as '' to get a letter placeholder.


// ---- CATEGORIES ----
// The key must match the "category" used by products, and the section id
// used in links like products.html#shoes. The value is the section heading.
const CATEGORIES = {
    mobiles: 'Smartphones at the best deals',
    laptops: 'Laptops for Work and Play',
    clothes: 'Trending Clothes',
    shoes: 'Shoes and Sneakers',
    watches: 'Watches and Wearables',
    headphones: 'Headphones and Audio',
    books: 'Bestselling Books',
    drones: 'Drones and cameras'
};


// ---- PRODUCTS ----
const PRODUCTS = [
    // ---- Mobiles ----
    {
        id: 'motorola-edge',
        category: 'mobiles',
        name: 'MOTOROLA Edge 60 Fusion 5G',
        price: 29999,
        image: 'images/mobile-image.jpg',
        description: 'Curved 1.5K display, 50MP Sony camera and 256GB storage.'
    },
    {
        id: 'samsung-f70e',
        category: 'mobiles',
        name: 'Samsung Galaxy F70e 5G',
        price: 13499,
        image: 'images/samsungF70e.jpg',
        description: 'Big battery, smooth display and a capable 5G camera phone.'
    },
    {
        id: 'vivo-x200t',
        category: 'mobiles',
        name: 'vivo X200T',
        price: 64999,
        image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/u/q/r/-resized-original-imahjzxknyum2hqe.jpeg?q=70',
        description: 'Flagship vivo with a premium camera system and fast charging.'
    },
    {
        id: 'redmi-note-14',
        category: 'mobiles',
        name: 'Redmi Note 14 5G',
        price: 17999,
        image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/r/v/y/-resized-original-imah7gbgghbsdezk.jpeg?q=70',
        description: 'AMOLED display, all-day battery and a 108MP main camera.'
    },

    // ---- Laptops ----
    {
        id: 'lenovo-ideapad',
        category: 'laptops',
        name: 'Lenovo IdeaPad Slim 3',
        price: 69999,
        image: 'images/laptop-image.jpg',
        description: '15.3" WUXGA display, Snapdragon X processor, AI-ready NPU.'
    },
    {
        id: 'msi-modern-14',
        category: 'laptops',
        name: 'MSI Modern 14 AMD Ryzen 5',
        price: 48000,
        image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/p/r/b/-original-imahg5fuz34uc68q.jpeg?q=70',
        description: 'Light 14" laptop with Ryzen 5 for office and study.'
    },
    {
        id: 'hp-15s',
        category: 'laptops',
        name: 'HP 15s Intel Core i5',
        price: 52990,
        image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/4/j/p/-original-imahg5ftvbqvubmm.jpeg?q=70',
        description: '15.6" FHD laptop, 16GB RAM and 512GB SSD.'
    },
    {
        id: 'asus-vivobook',
        category: 'laptops',
        name: 'ASUS Vivobook 15',
        price: 44990,
        image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/c/n/z/-enriched-transparent-original-imahg5fuhzzht5ct.png?q=70',
        description: 'Everyday laptop with a slim body and fast SSD storage.'
    },

    // ---- Clothes ----
    {
        id: 'mens-tshirt',
        category: 'clothes',
        name: 'Cotton Graphic T-Shirt',
        price: 799,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/4/4/6/l-ink-wh-ts-l-theinkwear-original-imahqxacek9mswqg.jpeg?q=70',
        description: 'Soft breathable cotton tee with a relaxed fit.'
    },
    {
        id: 'slim-jeans',
        category: 'clothes',
        name: 'Slim Fit Denim Jeans',
        price: 1499,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/jean/d/i/o/28-26-hoc-original-imahjay4f6zgbdqu.jpeg?q=70',
        description: 'Stretch denim with a modern slim fit.'
    },
    {
        id: 'zip-hoodie',
        category: 'clothes',
        name: 'Fleece Zip Hoodie',
        price: 1299,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/k/e/5/s-solid-trendy-hoodie-zen1fashion-original-imahpntsxh3ffyfa.jpeg?q=70',
        description: 'Warm fleece hoodie for cool evenings.'
    },
    {
        id: 'cotton-kurta',
        category: 'clothes',
        name: 'Cotton Kurta Set',
        price: 999,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/s/p/b/m-a-c-abu-original-imahra2vvug8ywdn.jpeg?q=70',
        description: 'Comfortable straight-cut kurta for festive and daily wear.'
    },

    // ---- Shoes ----
    {
        id: 'running-shoes',
        category: 'shoes',
        name: 'Running Shoes',
        price: 3999,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/k/i/l/10-rng-eva-740-wht-blk-10-bruton-white-black-original-imahjn6cmwhphfaw.jpeg?q=70',
        description: 'Cushioned, lightweight shoes built for daily runs.'
    },
    {
        id: 'casual-sneakers',
        category: 'shoes',
        name: 'Casual Sneakers',
        price: 2999,
        image: 'images/shoes-image.jpg',
        description: 'Colourful chunky sneakers that go with everything.'
    },
    {
        id: 'formal-oxford',
        category: 'shoes',
        name: 'Leather Formal Shoes',
        price: 2499,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/b/r/g/-resized-original-imahd2zh7dkcssqf.jpeg?q=70',
        description: 'Classic lace-up formal shoes with a cushioned insole.'
    },
    {
        id: 'comfort-sandals',
        category: 'shoes',
        name: 'Comfort Sandals',
        price: 899,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sandal/n/o/h/10-m-01-10-0-all-comfort-choice-black-resized-original-imahhypexedynkau.jpeg?q=70',
        description: 'Light, durable sandals for everyday use.'
    },

    // ---- Watches ----
    {
        id: 'smartwatch-pro',
        category: 'watches',
        name: 'Smartwatch Pro AMOLED',
        price: 2999,
        image: 'https://rukminim2.flixcart.com/image/1356/1356/xif0q/smartwatch/8/x/z/-original-imahrqmgwuxmf2g8.jpeg?q=90',
        description: 'Bluetooth calling, heart-rate and sleep tracking.'
    },
    {
        id: 'analog-classic',
        category: 'watches',
        name: 'Classic Analog Watch',
        price: 1999,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/watch/u/d/i/1-fb-90111-fenton-watches-men-resized-original-imah78nazzpbxprg.jpeg?q=70',
        description: 'Stainless steel case with a timeless dial.'
    },
    {
        id: 'fitness-band',
        category: 'watches',
        name: 'Fitness Band 7',
        price: 1799,
        image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/smart-band-tag/0/a/s/-original-imahr8p2cdpvkjmu.jpeg?q=70',
        description: 'Step, SpO2 and workout tracking with 14-day battery.'
    },
    {
        id: 'chrono-steel',
        category: 'watches',
        name: 'Chronograph Steel Watch',
        price: 4499,
        image: 'https://rukminim2.flixcart.com/image/612/612/kq8dua80/watch/4/g/q/new-stylist-explorer-chronograph-black-dial-kolpsy-original-imag4ahjgcak5vwf.jpeg?q=70',
        description: 'Sporty chronograph with a metal strap.'
    },

    // ---- Headphones ----
    {
        id: 'tws-earbuds',
        category: 'headphones',
        name: 'Wireless Earbuds TWS',
        price: 1999,
        image: 'https://rukminim2.flixcart.com/image/1356/1356/xif0q/headphone/7/n/o/-original-imahfsg7chmgrugu.jpeg?q=90',
        description: 'Noise reduction, deep bass and 30-hour total playback.'
    },
    {
        id: 'overear-bt',
        category: 'headphones',
        name: 'Over-Ear Bluetooth Headphones',
        price: 3499,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/w/o/j/-original-imahf77sp4fzjnc3.jpeg?q=70',
        description: 'Plush ear cups, rich sound and 40-hour battery.'
    },
    {
        id: 'neckband',
        category: 'headphones',
        name: 'Bluetooth Neckband',
        price: 1299,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/4/s/p/bluetooth-neckband-earphones-blue-20-hour-playtime-bluetooth-5-4-original-imahnft83avqzmga.jpeg?q=70',
        description: 'Secure fit with fast charge and magnetic buds.'
    },
    {
        id: 'gaming-headset',
        category: 'headphones',
        name: 'Gaming Headset with Mic',
        price: 2499,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/w/q/v/pf-k20-00a-gaming-headset-over-ear-gaming-headphones-with-mic-original-imahmecfw6erjb8b.jpeg?q=70',
        description: 'Surround sound and a flexible noise-cancelling mic.'
    },

    // ---- Books ----
    {
        id: 'atomic-habits',
        category: 'books',
        name: 'Atomic Habits',
        price: 499,
        image: 'images/products/atomic-habits.svg',
        description: 'James Clear on building good habits and breaking bad ones.'
    },
    {
        id: 'psychology-money',
        category: 'books',
        name: 'The Psychology of Money',
        price: 399,
        image: 'images/products/psychology-money.svg',
        description: 'Morgan Housel on how people think about money.'
    },
    {
        id: 'ikigai',
        category: 'books',
        name: 'Ikigai',
        price: 299,
        image: 'images/products/ikigai.svg',
        description: 'The Japanese secret to a long and happy life.'
    },
    {
        id: 'rich-dad',
        category: 'books',
        name: 'Rich Dad Poor Dad',
        price: 349,
        image: 'images/products/rich-dad.svg',
        description: 'Robert Kiyosaki on financial education and investing.'
    },

    // ---- Drones ----
    {
        id: 'dji-mini-4k',
        category: 'drones',
        name: 'DJI Mini 4K Drone',
        price: 36990,
        image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/drone/l/2/s/200-14-60-brushless-4k-hd-dual-camera-foldable-wifi-fpv-drone-original-imahzngww5sqgyq9.jpeg?q=70',
        description: 'Under 249g foldable drone with 4K camera, 3-axis gimbal and 30-min flight.'
    },
    {
        id: 'dji-neo',
        category: 'drones',
        name: 'DJI Neo Selfie Drone',
        price: 17990,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/screen-guard/tempered-glass/q/o/s/5-5-apl882-thjdg-original-imahpphdzhhgwhya.jpeg?q=70',
        description: 'Palm-sized 135g drone with 4K video, subject tracking and prop guards.'
    },
    {
        id: 'foldable-camera-drone',
        category: 'drones',
        name: 'Foldable 4K Camera Drone',
        price: 15999,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/drone/i/f/7/102-60-1-4k-dual-camera-mini-drone-e88-pro-foldable-wifi-original-imahk5agfzyjyhdy.jpeg?q=70',
        description: 'Beginner friendly drone with 4K camera, altitude hold and 2 batteries.'
    },
    {
        id: 'fpv-racing-drone',
        category: 'drones',
        name: 'FPV Racing Drone Kit',
        price: 12999,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/drone/o/e/7/50-20-1-foldable-toy-drone-with-hq-wifi-camera-remote-control-original-imahgzjhctmknyak.jpeg?q=70',
        description: 'High-speed FPV quadcopter for racing and freestyle.'
    }
];


// ---- HELPERS ----

// 29999 -> "₹29,999"
function rupee(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
}

// Colour used for the letter placeholder of each category
const COLORS = {
    mobiles: '#2563eb',
    laptops: '#475569',
    clothes: '#db2777',
    shoes: '#ea580c',
    watches: '#7c3aed',
    headphones: '#0d9488',
    books: '#b45309',
    drones: '#0284c7'
};

// A simple coloured square with the first letter of the product name.
// Used when a product has no image, or its image fails to load.
function placeholder(product) {
    const color = COLORS[product.category];

    const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">' +
        `<rect width="400" height="400" fill="${color}22"/>` +
        `<text x="200" y="220" font-family="Arial" font-size="120" text-anchor="middle" fill="${color}">${product.name[0]}</text>` +
        '</svg>';

    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// The product's image, or the placeholder if it has none
function imgOf(product) {
    return product.image || placeholder(product);
}

// An <img> tag that swaps to the placeholder if the image can't be loaded
function imgTag(product) {
    const fallback = placeholder(product).replace(/'/g, '%27');

    return `<img src="${imgOf(product)}" alt="${product.name}" onerror="this.onerror=null;this.src='${fallback}'">`;
}


// ---- PRODUCT CARD ----

// HTML for one card (image, name, price and the Add to Cart button)
function buildProductCard(product) {
    return `
        <div class="product-card">
            <a href="product-details.html#${product.id}">
                ${imgTag(product)}
                <h3>${product.name}</h3>
                <p class="price">${rupee(product.price)}</p>
            </a>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
}

// Listens for clicks on any "Add to Cart" button inside the given element.
// One listener on the parent handles every card, even ones added later.
function listenForAddToCart(parent) {
    parent.addEventListener('click', event => {
        const button = event.target.closest('.add-to-cart');
        if (!button) return;

        const product = PRODUCTS.find(item => item.id === button.dataset.id);
        addToCart(product.id, product.name, product.price, imgOf(product));
    });
}


// ---- PRODUCTS PAGE ----
// Builds one section per category, each with its own grid of cards
function renderCatalog() {
    const root = document.getElementById('catalog');
    if (!root) return;

    Object.keys(CATEGORIES).forEach((category, index) => {
        const productsInCategory = PRODUCTS.filter(product => product.category === category);

        const section = document.createElement('section');
        section.id = category;

        // Give every second section a white background so they're easy to tell apart
        if (index % 2) {
            section.style.backgroundColor = 'white';
        }

        section.innerHTML = `
            <h2>${CATEGORIES[category]}</h2>
            <div class="product-grid">
                ${productsInCategory.map(buildProductCard).join('')}
            </div>
        `;

        root.appendChild(section);
    });

    listenForAddToCart(root);
}


// ---- HOME PAGE ----
// Shows only the products whose ids are passed in, in that order
function renderFeatured(ids) {
    const root = document.getElementById('featured-grid');

    root.innerHTML = ids
        .map(id => PRODUCTS.find(product => product.id === id))
        .map(buildProductCard)
        .join('');

    listenForAddToCart(root);
}
