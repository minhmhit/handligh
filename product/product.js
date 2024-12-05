const products = [
    {
        id: 1,
        name: "Túi da bò YSL",
        price: 899000,
        images: [
            "../assets/img/productimg/p1/1_result.jpg",
            "../assets/img/productimg/p1/2_result.jpg"
        ],
        description: "Túi da bò cao cấp của thương hiệu YSL, chất liệu mềm mại, thiết kế sang trọng.",
        material: "Da bò nguyên tấm",
        origin: "Ý"
    },
    
        {
            id: 2,
            name: "Túi Chanel Classic Flap Like New",
            price: 1500000,
            images: [
                "../assets/img/productimg/p2/1_result.jpg",
                "../assets/img/productimg/p2/2_result.jpg"
            ],
            description: "Túi Chanel Classic Flap biểu tượng với chất liệu da cừu cao cấp, thiết kế sang trọng và tinh tế, phù hợp mọi sự kiện.",
            material: "Da cừu",
            origin: "Pháp"
        },
        {
            id: 3,
            name: "Túi Dior Saddle Vintage",
            price: 1200000,
            images: [
                "../assets/img/productimg/p3/1_result.jpg",
                "../assets/img/productimg/p3/2_result.jpg"
            ],
            description: "Chiếc túi Saddle độc đáo từ Dior mang phong cách cổ điển, được làm từ vải canvas kết hợp với da cao cấp.",
            material: "Vải canvas và da",
            origin: "Pháp"
        },
        {
            id: 4,
            name: "Túi LV Speedy Monogram Like New",
            price: 950000,
            images: [
                "../assets/img/productimg/p4/1_result.jpg",
                "../assets/img/productimg/p4/2_result.jpg"
            ],
            description: "Túi Speedy cổ điển với họa tiết monogram trứ danh của Louis Vuitton, mang đến vẻ đẹp thanh lịch và tiện dụng.",
            material: "Da và vải monogram",
            origin: "Pháp"
        },
        {
            id: 5,
            name: "Túi Hermès Birkin Mini Like New",
            price: 3800000,
            images: [
                "../assets/img/productimg/p5/1_result.jpg",
                "../assets/img/productimg/p5/2_result.jpg"
            ],
            description: "Birkin Mini phiên bản giới hạn với chất liệu da cá sấu sang trọng, thiết kế tinh tế đến từng chi tiết.",
            material: "Da cá sấu",
            origin: "Pháp"
        },
        {
            id: 6,
            name: "Túi Prada Nylon Re-Edition 2005",
            price: 1100000,
            images: [
                "../assets/img/productimg/p6/1_result.jpg",
                "../assets/img/productimg/p6/2_result.jpg"
            ],
            description: "Túi Prada Nylon phong cách trẻ trung, làm từ nylon tái chế, thiết kế hiện đại và bền bỉ.",
            material: "Nylon tái chế",
            origin: "Ý"
        },
        {
            id: 7,
            name: "Túi Balenciaga City Bag Like New",
            price: 1400000,
            images: [
                "../assets/img/productimg/p7/1_result.jpg",
                "../assets/img/productimg/p7/2_result.jpg"
            ],
            description: "City Bag của Balenciaga nổi bật với thiết kế phá cách, chất liệu da bê mềm mại và chi tiết kim loại độc đáo.",
            material: "Da bê",
            origin: "Tây Ban Nha"
        },
        
        {
            id: 8,
            name: "Túi Saint Laurent Kate Chain Like New",
            price: 980000,
            images: [
                "../assets/img/productimg/p8/1_result.jpg",
                "../assets/img/productimg/p8/2_result.jpg"
            ],
            description: "Kate Chain nhỏ gọn, sang trọng với logo YSL mạ vàng, hoàn hảo cho những buổi tiệc tối.",
            material: "Da bò nguyên tấm",
            origin: "Ý"
        },
        {
            id: 9,
            name: "Túi Gucci Marmont Small Matelassé",
            price: 1300000,
            images: [
                "../assets/img/productimg/p9/1_result.jpg",
                "../assets/img/productimg/p9/2_result.jpg"
            ],
            description: "Túi Marmont với họa tiết matelassé đặc trưng, khóa GG cổ điển, tạo vẻ ngoài thanh lịch và sang trọng.",
            material: "Da bê mềm",
            origin: "Ý"
        },
        {
            id: 10,
            name: "Túi Bottega Veneta Pouch Like New",
            price: 2000000,
            images: [
                "../assets/img/productimg/p10/1_result.jpg",
                "../assets/img/productimg/p10/2_result.jpg"
            ],
            description: "Pouch đình đám của Bottega Veneta với thiết kế tối giản, chất liệu da mềm mại và kiểu dáng tinh tế.",
            material: "Da bê",
            origin: "Ý"
        },
        {
            id: 11,
            name: "Túi Fendi Baguette Vintage",
            price: 1700000,
            images: [
                "../assets/img/productimg/p11/1_result.jpg",
                "../assets/img/productimg/p11/2_result.jpg"
            ],
            description: "Túi Baguette cổ điển của Fendi, biểu tượng của sự sành điệu và thời trang, hoàn hảo cho những buổi dạo phố.",
            material: "Da kết hợp vải",
            origin: "Ý"
        },
        {
            id: 12,
            name: "Túi Celine Triomphe Shoulder Bag",
            price: 1900000,
            images: [
                "../assets/img/productimg/p12/1_result.jpg",
                "../assets/img/productimg/p12/2_result.jpg"
            ],
            description: "Celine Triomphe Shoulder Bag với logo Triomphe đặc trưng, mang lại vẻ đẹp tinh tế và thời thượng.",
            material: "Da bê",
            origin: "Pháp"
        },
        {
            id: 13,
            name: "Túi Givenchy Antigona Small",
            price: 1600000,
            images: [
                "../assets/img/productimg/p13/1_result.jpg",
                "../assets/img/productimg/p13/2_result.jpg"
            ],
            description: "Givenchy Antigona Small với thiết kế góc cạnh độc đáo, mang lại vẻ ngoài mạnh mẽ và sang trọng.",
            material: "Da bò",
            origin: "Pháp"
        },
        {
            id: 14,
            name: "Túi Versace La Medusa Like New",
            price: 1850000,
            images: [
                "../assets/img/productimg/p14/1_result.jpg",
                "../assets/img/productimg/p14/2_result.jpg"
            ],
            description: "Túi La Medusa của Versace với biểu tượng Medusa đặc trưng, chất liệu cao cấp, phù hợp mọi phong cách.",
            material: "Da bê",
            origin: "Ý"
        },
        {
            id: 15,
            name: "Túi Loewe Puzzle Small Like New",
            price: 2100000,
            images: [
                "../assets/img/productimg/p15/1_result.jpg",
                "../assets/img/productimg/p15/2_result.jpg"
            ],
            description: "Puzzle Bag của Loewe với thiết kế ghép mảnh độc đáo, chất liệu da cao cấp tạo cảm giác mềm mại.",
            material: "Da bê",
            origin: "Tây Ban Nha"
        },
        {
            id: 16,
            name: "Túi Burberry Lola Quilted Leather",
            price: 1250000,
            images: [
                "../assets/img/productimg/p16/1_result.jpg",
                "../assets/img/productimg/p16/2_result.jpg"
            ],
            description: "Túi Lola với thiết kế quilted sang trọng, mang logo TB trứ danh, hoàn hảo cho mọi dịp.",
            material: "Da cừu",
            origin: "Anh"
        },
        {
            id: 17,
            name: "Túi Valentino Rockstud Small",
            price: 1450000,
            images: [
                "../assets/img/productimg/p17/2_result.jpg",
                "../assets/img/productimg/p17/3_result.jpg"
            ],
            description: "Valentino Rockstud với đinh tán biểu tượng, thể hiện phong cách mạnh mẽ và cá tính.",
            material: "Da bê",
            origin: "Ý"
        },
        {
            id: 18,
            name: "Túi Alexander McQueen Skull Clutch",
            price: 2200000,
            images: [
                "../assets/img/productimg/p18/1_result.jpg",
                "../assets/img/productimg/p18/2_result.jpg"
            ],
            description: "Skull Clutch độc đáo với biểu tượng đầu lâu đặc trưng của Alexander McQueen, mang phong cách mạnh mẽ và thời thượng.",
            material: "Da dê",
            origin: "Anh"
        },
        {
            id: 19,
            name: "Túi Coach Tabby Shoulder Bag 26",
            price: 850000,
            images: [
                "../assets/img/productimg/p19/1_result.jpg",
                "../assets/img/productimg/p19/2_result.jpg"
            ],
            description: "Coach Tabby 26 với thiết kế cổ điển, kích thước vừa phải, dễ dàng kết hợp với mọi phong cách thời trang.",
            material: "Da sần",
            origin: "Mỹ"
        },
        {
            id: 20,
            name: "Túi Tory Burch Kira Chevron Small",
            price: 950000,
            images: [
                "../assets/img/productimg/p20/1_result.jpg",
                "../assets/img/productimg/p20/2_result.jpg"
            ],
            description: "Túi Kira với họa tiết chevron, khóa logo TB đặc trưng, thiết kế sang trọng, phù hợp cho những buổi tiệc nhẹ.",
            material: "Da bê",
            origin: "Mỹ"
        },
        {
            id: 21,
            name: "Túi Marc Jacobs Snapshot Like New",
            price: 780000,
            images: [
                "../assets/img/productimg/p21/1_result.jpg",
                "../assets/img/productimg/p21/2_result.jpg"
            ],
            description: "Túi Snapshot nhỏ gọn, thiết kế năng động, quai đeo bản rộng giúp bạn tự tin xuống phố.",
            material: "Da saffiano",
            origin: "Mỹ"
        },
        {
            id: 22,
            name: "Túi Stella McCartney Falabella",
            price: 1500000,
            images: [
                "../assets/img/productimg/p22/1_result.jpg",
                "../assets/img/productimg/p22/2_result.jpg"
            ],
            description: "Túi Falabella đặc trưng của Stella McCartney với dây xích kim loại, chất liệu thân thiện môi trường.",
            material: "Da nhân tạo",
            origin: "Anh"
        },
        {
            id: 23,
            name: "Túi Mulberry Alexa Satchel Like New",
            price: 1750000,
            images: [
                "../assets/img/productimg/p23/1_result.jpg",
                "../assets/img/productimg/p23/2_result.jpg"
            ],
            description: "Alexa Satchel từ Mulberry với thiết kế cổ điển, phần khóa cài đặc trưng, tiện dụng cho công việc hàng ngày.",
            material: "Da bò",
            origin: "Anh"
        },
        {
            id: 24,
            name: "Túi MCM Stark Backpack Small",
            price: 1600000,
            images: [
                "../assets/img/productimg/p24/1_result.jpg",
                "../assets/img/productimg/p24/2_result.jpg"
                
            ],
            description: "Ba lô Stark của MCM với họa tiết logo Visetos biểu tượng, phong cách năng động và thời thượng.",
            material: "Da tổng hợp",
            origin: "Đức"
        }
    
    
];

// Lưu vào localStorage
localStorage.setItem('products', JSON.stringify(products));
// Function to render the product list
function renderProductList(page = 1) {
    const productList = document.getElementById('product-list');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const itemsPerPage = 8;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    // Render products
    productList.innerHTML = paginatedProducts.map(product => `
        <div class="col-md-3 col-sm-5 col-6 mb-2" style="height: 450px;">
            <div class="product-wrapper d-flex flex-column">
                <div class="product-thumbnail">
                    <img src="${product.images[0]}" class="img-fluid" alt="${product.name}">
                    <div class="quickaccess d-flex flex-fill w-100">
                        <a href="#product/${product.id}" class="btn btn-primary">Xem chi tiết</a>
                    </div>
                </div>
                <div class="product-info">
                    <h5>${product.name}</h5>
                    <div class="d-flex justify-content-between">
                        <p class="text-danger">${product.price.toLocaleString()}₫</p>
                        <button class="btn rounded-pill cartbtn" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Render pagination
    renderPagination(page);
}

// Function to render pagination controls
function renderPagination(currentPage) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const itemsPerPage = 8;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginationContainer = document.getElementById('product-pagination');

    let paginationHTML = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" onclick="renderProductList(${currentPage - 1})">Previous</a>
        </li>
    `;

    // Create pagination numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" onclick="renderProductList(${i})">${i}</a>
            </li>
        `;
    }

    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" onclick="renderProductList(${currentPage + 1})">Next</a>
        </li>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

// Function to render product details
function renderProductDetail(productId) {
    const productDetail = document.getElementById('product-detail');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('product-list').classList.add('d-none');
        document.getElementById('product-pagination').classList.add('d-none');
        productDetail.classList.remove('d-none');

        productDetail.innerHTML = `
            <div class="row my-5">
                <div class="col-md-6">
                    <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            ${product.images.map((img, index) => `
                                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                    <img src="${img}" class="d-block w-100" alt="Hình ${index + 1}">
                                </div>
                            `).join('')}
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </button>
                    </div>
                </div>
                <div class="col-md-6">
                    <h2>${product.name}</h2>
                    <p class="text-danger h4">${product.price.toLocaleString()}₫</p>
                    <p>${product.description}</p>
                    <p>Chất liệu : ${product.material}</p>
                    <p>Xuất xứ : ${product.origin}</p>
                    <button class="btn rounded-pill cartbtn" onclick="addToCart(${product.id})">
                        Thêm vào giỏ hàng <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <a href="#" class="btn btn-secondary mt-3" onclick="goBack()">Quay lại</a>
        `;
    }
}

// Function to add a product to the cart
function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Create a cart item object
    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1
    };

    // Get cart from local storage or create an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(cartItem);
    }

    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.name} đã được thêm vào giỏ hàng!`);
}

// Function to handle hash change (for product detail view)
window.onhashchange = function() {
    const hash = window.location.hash;
    const productMatch = hash.match(/#product\/(\d+)/);

    if (productMatch) {
        const productId = parseInt(productMatch[1]);
        renderProductDetail(productId);
    } else {
        document.getElementById('product-list').classList.remove('d-none');
        document.getElementById('product-pagination').classList.remove('d-none');
        document.getElementById('product-detail').classList.add('d-none');
        renderProductList(1);
    }
};

// Function to go back from product detail
function goBack() {
    window.history.back();
}

// Initialize the page
window.onload = function() {
    renderProductList(1);
    if (window.location.hash) {
        window.onhashchange();
    }
};
