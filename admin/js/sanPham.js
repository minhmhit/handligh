// Make these variables global
let currentPage = 1;
const ITEMS_PER_PAGE = 5;
let loadProducts;

window.allProducts = [
    { id: 1, name: "Túi xách A", price: 500000, quantity: 10, category: "tui-xach", image: "../../assets/img/productimg/p1/1_result.jpg" },
    { id: 2, name: "Balo B", price: 800000, quantity: 15, category: "balo", image: "../../assets/img/productimg/p5/1_result.jpg" },
    { id: 3, name: "Túi xách C", price: 600000, quantity: 8, category: "tui-xach", image: "../../assets/img/productimg/p2/1_result.jpg" },
    { id: 4, name: "Balo D", price: 750000, quantity: 12, category: "balo", image: "../../assets/img/productimg/p6/1_result.jpg" },
    { id: 5, name: "Túi xách E", price: 900000, quantity: 5, category: "tui-xach", image: "../../assets/img/productimg/p3/1_result.jpg" },
    { id: 6, name: "Balo F", price: 850000, quantity: 20, category: "balo", image: "../../assets/img/productimg/p4/1_result.jpg" },
    { id: 7, name: "Túi xách Luxury", price: 1200000, quantity: 7, category: "tui-xach", image: "../../assets/img/productimg/p8/1_result.jpg" },
    { id: 8, name: "Balo Travel", price: 950000, quantity: 25, category: "balo", image: "../../assets/img/productimg/p1/1_result.png" },
    { id: 9, name: "Túi xách Classic", price: 750000, quantity: 15, category: "tui-xach", image: "../../assets/img/productimg/p9/1_result.jpg" },
    { id: 10, name: "Balo Sport", price: 650000, quantity: 30, category: "balo", image: "../../assets/img/productimg/p13/1_result.png" },
    { id: 11, name: "Túi xách Modern", price: 850000, quantity: 12, category: "tui-xach", image: "../../assets/img/productimg/p10/1_result.jpg" },
    { id: 12, name: "Balo School", price: 450000, quantity: 40, category: "balo", image: "../../assets/img/productimg/p4/1_result.png" },
    { id: 13, name: "Túi xách Luxury", price: 1200000, quantity: 7, category: "tui-xach", image: "../../assets/img/productimg/p11/1_result.jpg" },
    { id: 14, name: "Balo Travel", price: 950000, quantity: 25, category: "balo", image: "../../assets/img/productimg/p15/1_result.png" },
    { id: 15, name: "Túi xách Classic", price: 750000, quantity: 15, category: "tui-xach", image: "../../assets/img/productimg/p12/1_result.jpg" },
    { id: 16, name: "Balo Sport", price: 650000, quantity: 30, category: "balo", image: "../img/f10.jpg" },
    { id: 17, name: "Túi xách Modern", price: 850000, quantity: 12, category: "tui-xach", image: "../img/f11.png" },
    { id: 18, name: "Balo School", price: 450000, quantity: 40, category: "balo", image: "../img/f12.jpg" },
    { id: 19, name: "Túi xách Luxury", price: 1200000, quantity: 7, category: "tui-xach", image: "../img/f7.png" },
    { id: 20, name: "Balo Travel", price: 950000, quantity: 25, category: "balo", image: "../img/f8.jpg" },
    { id: 21, name: "Túi xách Classic", price: 750000, quantity: 15, category: "tui-xach", image: "../img/f9.png" },
    { id: 22, name: "Balo Sport", price: 650000, quantity: 30, category: "balo", image: "../img/f10.jpg" },
    { id: 23, name: "Túi xách Modern", price: 850000, quantity: 12, category: "tui-xach", image: "../img/f11.png" },
    { id: 24, name: "Balo School", price: 450000, quantity: 40, category: "balo", image: "../img/f12.jpg" }
];

$(document).ready(function() {
    // Load products with pagination
    loadProducts = function(page = 1) {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedProducts = allProducts.slice(startIndex, endIndex);
        
        const tbody = document.getElementById('productsList');
        tbody.innerHTML = '';
        
        paginatedProducts.forEach(product => {
            tbody.innerHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td><img src="${product.image}" class="product-img"></td>
                    <td>${product.name}</td>
                    <td>${product.price.toLocaleString()}đ</td>
                    <td>${product.quantity}</td>
                    <td>${product.category}</td>
                    <td class="action-buttons">
                        <button class="btn btn-sm btn-info" onclick="editProduct(${product.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        // Update pagination
        updatePagination(allProducts.length, page);
    };

    // Update pagination controls
    function updatePagination(totalItems, currentPage) {
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const pagination = $('#pagination');
        pagination.empty();

        pagination.parent().addClass('d-flex justify-content-center'); // Center pagination container

        // Previous button
        pagination.append(`
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage - 1}">Trước</a>
            </li>
        `);

        // First page
        pagination.append(`
            <li class="page-item ${currentPage === 1 ? 'active' : ''}">
                <a class="page-link" href="#" data-page="1">1</a>
            </li>
        `);

        // Page 2 (if total pages > 1)
        if (totalPages > 1) {
            pagination.append(`
                <li class="page-item ${currentPage === 2 ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="2">2</a>
                </li>
            `);
        }

        // Ellipsis if there are more pages
        if (totalPages > 3) {
            pagination.append('<li class="page-item disabled"><span class="page-link">...</span></li>');
        }

        // Last page (if more than 2 pages)
        if (totalPages > 2) {
            pagination.append(`
                <li class="page-item ${currentPage === totalPages ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
                </li>
            `);
        }

        // Next button
        pagination.append(`
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage + 1}">Sau</a>
            </li>
        `);

        // Handle pagination clicks
        $('.page-link').click(function(e) {
            e.preventDefault();
            const newPage = parseInt($(this).data('page'));
            if (newPage > 0 && newPage <= totalPages) {
                currentPage = newPage;
                loadProducts(currentPage);
            }
        });
    }

    // Initial load
    loadProducts(currentPage);

    // Edit product
    window.editProduct = function(id) {
        // Find the product to edit
        const product = allProducts.find(p => p.id === id);
        
        if (product) {
            // Fill modal with product data
            $('#editProductId').val(product.id);
            $('#editProductCode').val(product.id); // For display
            $('#editProductName').val(product.name);
            $('#editProductPrice').val(product.price);
            $('#editProductQuantity').val(product.quantity);
            $('#editProductCategory').val(product.category);
            
            // Show current image preview
            $('#currentImagePreview').attr('src', product.image).show();

            // Show modal
            $('#editProductModal').modal('show');
        }
    };

    // Preview new image when selected
    $('#editProductImage').change(function() {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#currentImagePreview').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Save edited product
    $('#saveEditButton').click(function() {
        const productId = parseInt($('#editProductId').val());
        const productIndex = allProducts.findIndex(p => p.id === productId);
        
        if (productIndex !== -1) {
            // Update product data
            allProducts[productIndex] = {
                id: productId,
                name: $('#editProductName').val(),
                price: parseFloat($('#editProductPrice').val()),
                quantity: parseInt($('#editProductQuantity').val()),
                category: $('#editProductCategory').val(),
                image: $('#editProductImage')[0].files[0] ? URL.createObjectURL($('#editProductImage')[0].files[0]) : allProducts[productIndex].image
            };
            
            // Close modal
            $('#editProductModal').modal('hide');
            
            // Show success message
            Swal.fire({
                title: 'Thành công!',
                text: 'Đã cập nhật thông tin sản phẩm',
                icon: 'success',
                confirmButtonText: 'Đóng'
            });
            
            // Reload products
            loadProducts(currentPage);
        }
    });

    // Delete product
    window.deleteProduct = function(id) {
        Swal.fire({
            title: 'Xác nhận xóa?',
            text: "Bạn có chắc chắn muốn xóa sản phẩm này?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                const productIndex = window.allProducts.findIndex(product => product.id === id);
                
                if (productIndex !== -1) {
                    window.allProducts.splice(productIndex, 1);
                    
                    // Check if we need to go to previous page
                    const totalPages = Math.ceil(window.allProducts.length / ITEMS_PER_PAGE);
                    if (currentPage > totalPages && currentPage > 1) {
                        currentPage--;
                    }
                    
                    loadProducts(currentPage);
                    
                    Swal.fire({
                        title: 'Đã xóa!',
                        text: 'Sản phẩm đã được xóa thành công.',
                        icon: 'success',
                        confirmButtonText: 'Đóng'
                    });
                }
            }
        });
    };

    // Add search functionality
    $('#searchInput').on('keyup', function() {
        const searchText = $(this).val().toLowerCase();
        const categoryFilter = $('#categoryFilter').val();
        
        const filteredProducts = allProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchText) ||
                                product.id.toString().includes(searchText) ||
                                product.price.toString().includes(searchText);
            
            const matchesCategory = !categoryFilter || product.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });

        // Reset to first page when searching
        currentPage = 1;
        
        if (searchText === '' && !categoryFilter) {
            loadProducts(currentPage);
        } else {
            const startIndex = 0;
            const endIndex = ITEMS_PER_PAGE;
            const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
            
            const tbody = document.getElementById('productsList');
            tbody.innerHTML = '';
            
            paginatedProducts.forEach(product => {
                tbody.innerHTML += `
                    <tr>
                        <td>${product.id}</td>
                        <td><img src="${product.image}" class="product-img"></td>
                        <td>${product.name}</td>
                        <td>${product.price.toLocaleString()}đ</td>
                        <td>${product.quantity}</td>
                        <td>${product.category}</td>
                        <td class="action-buttons">
                            <button class="btn btn-sm btn-info" onclick="editProduct(${product.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });

            updatePagination(filteredProducts.length, currentPage);
        }
    });

    // Add category filter functionality
    $('#categoryFilter').on('change', function() {
        $('#searchInput').trigger('keyup');
    });
});

// Add this after your existing document.ready function
$('#addProductImage').change(function() {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#addImagePreview')
                .attr('src', e.target.result)
                .show();
        }
        reader.readAsDataURL(this.files[0]);
    }
});

// Add helper function to generate new ID
function generateNewId() {
    return Math.max(...window.allProducts.map(p => p.id)) + 1;
}

// Replace existing addProduct function with this updated version
function addProduct() {
    // Get form data
    const name = $('input[name="tenSanPham"]').val();
    const price = parseFloat($('input[name="gia"]').val());
    const quantity = parseInt($('input[name="soLuong"]').val());
    const category = $('select[name="loaiSanPham"]').val();
    const imageFile = $('#addProductImage')[0].files[0];

    // Validate form data
    if (!name || !price || !quantity || !category || !imageFile) {
        Swal.fire({
            title: 'Lỗi!',
            text: 'Vui lòng điền đầy đủ thông tin sản phẩm',
            icon: 'error',
            confirmButtonText: 'Đóng'
        });
        return;
    }

    // Create new product object
    const newProduct = {
        id: generateNewId(),
        name: name,
        price: price,
        quantity: quantity,
        category: category,
        image: URL.createObjectURL(imageFile)
    };

    // Add to beginning of products array
    window.allProducts.unshift(newProduct);
    
    // Reset to first page
    currentPage = 1;

    Swal.fire({
        title: 'Thành công!',
        text: 'Thêm sản phẩm mới thành công',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            // Clear form
            $('#addProductForm')[0].reset();
            $('#addImagePreview').hide();
            
            // Close modal
            $('#addProductModal').modal('hide');
            
            // Reload products list on first page
            loadProducts(1);
        }
    });
}

// Update image preview handler
$('#addProductImage').change(function() {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            $('#addImagePreview')
                .attr('src', e.target.result)
                .show();
        }
        reader.readAsDataURL(this.files[0]);
    }
});
