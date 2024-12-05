$(document).ready(function() {
    // Sample revenue data with different years and months
    const revenueData = [
        // December 2024 data
        { id: 51, date: "01/12/2024", amount: "25,800,000" },
        { id: 52, date: "02/12/2024", amount: "22,500,000" },
        { id: 53, date: "03/12/2024", amount: "28,200,000" },
        { id: 54, date: "04/12/2024", amount: "24,900,000" },
        { id: 55, date: "05/12/2024", amount: "26,100,000" },
        { id: 56, date: "06/12/2024", amount: "23,300,000" },
        { id: 57, date: "07/12/2024", amount: "27,500,000" },
        { id: 58, date: "08/12/2024", amount: "29,200,000" },
        { id: 59, date: "09/12/2024", amount: "25,800,000" },
        { id: 60, date: "10/12/2024", amount: "26,600,000" },
        { id: 61, date: "11/12/2024", amount: "24,300,000" },
        { id: 62, date: "12/12/2024", amount: "27,900,000" },
        { id: 63, date: "13/12/2024", amount: "26,200,000" },
        { id: 64, date: "14/12/2024", amount: "25,400,000" },
        { id: 65, date: "15/12/2024", amount: "28,800,000" },

        // 2024 data
        { id: 1, date: "01/01/2024", amount: "15,000,000" },
        { id: 2, date: "02/01/2024", amount: "12,500,000" },
        { id: 3, date: "03/01/2024", amount: "18,200,000" },
        { id: 4, date: "04/01/2024", amount: "14,300,000" },
        { id: 5, date: "05/01/2024", amount: "16,700,000" },
        { id: 6, date: "06/01/2024", amount: "13,900,000" },
        { id: 7, date: "07/01/2024", amount: "17,500,000" },
        { id: 8, date: "08/01/2024", amount: "19,200,000" },
        { id: 9, date: "09/01/2024", amount: "15,800,000" },
        { id: 10, date: "10/01/2024", amount: "14,600,000" },
        { id: 11, date: "11/01/2024", amount: "16,300,000" },
        { id: 12, date: "12/01/2024", amount: "18,900,000" },
        { id: 13, date: "13/01/2024", amount: "17,200,000" },
        { id: 14, date: "14/01/2024", amount: "15,400,000" },
        { id: 15, date: "15/01/2024", amount: "16,800,000" },
        { id: 16, date: "16/01/2024", amount: "14,700,000" },
        { id: 17, date: "17/01/2024", amount: "19,500,000" },
        { id: 18, date: "18/01/2024", amount: "16,200,000" },
        { id: 19, date: "19/01/2024", amount: "15,900,000" },
        { id: 20, date: "20/01/2024", amount: "13,800,000" },

        // 2023 data 
        { id: 21, date: "01/12/2023", amount: "16,500,000" },
        { id: 22, date: "15/12/2023", amount: "18,200,000" },
        { id: 23, date: "30/12/2023", amount: "14,800,000" },
        { id: 24, date: "01/11/2023", amount: "13,900,000" },
        { id: 25, date: "15/11/2023", amount: "15,600,000" },
        { id: 26, date: "30/11/2023", amount: "17,300,000" },
        { id: 27, date: "01/10/2023", amount: "12,800,000" },
        { id: 28, date: "15/10/2023", amount: "14,500,000" },
        { id: 29, date: "30/10/2023", amount: "16,200,000" },

        // 2022 data
        { id: 30, date: "01/12/2022", amount: "12,500,000" },
        { id: 31, date: "15/12/2022", amount: "13,800,000" },
        { id: 32, date: "30/12/2022", amount: "15,300,000" },
        { id: 33, date: "01/06/2022", amount: "11,900,000" },
        { id: 34, date: "15/06/2022", amount: "13,200,000" },
        { id: 35, date: "30/06/2022", amount: "14,800,000" }
    ];

    // Add pagination constants
    const ITEMS_PER_PAGE = 5; // Changed from 10 to 5 to match nguoiDung
    let currentPage = 1;

    // Sample sales data for revenue entries
    const salesData = {
        // January 2024
        1: {
            date: "01/01/2024",
            products: [
                { name: "Túi xách A", quantity: 3, price: "500,000" },
                { name: "Balo Sport B", quantity: 2, price: "800,000" }
            ]
        },
        2: {
            date: "02/01/2024", 
            products: [
                { name: "Túi xách Classic", quantity: 1, price: "750,000" },
                { name: "Balo Travel", quantity: 2, price: "950,000" }
            ]
        },
        // December 2024
        51: {
            date: "01/12/2024",
            products: [
                { name: "Túi xách Luxury", quantity: 2, price: "1,200,000" },
                { name: "Balo Modern", quantity: 3, price: "850,000" }
            ]
        },
        52: {
            date: "02/12/2024",
            products: [
                { name: "Túi xách Luxury", quantity: 2, price: "1,200,000" },
                { name: "Balo Modern", quantity: 3, price: "850,000" }
            ]
        },
        53: {
            date: "03/12/2024",
            products: [
                { name: "Túi xách Luxury", quantity: 2, price: "1,200,000" },
                { name: "Balo Modern", quantity: 3, price: "850,000" }
            ]
        },
        54: {
            date: "04/12/2024",
            products: [
                { name: "Túi xách Luxury", quantity: 2, price: "1,200,000" },
                { name: "Balo Modern", quantity: 3, price: "850,000" }
            ]
        },
        55: {
            date: "05/12/2024",
            products: [
                { name: "Túi xách Luxury", quantity: 2, price: "1,200,000" },
                { name: "Balo Modern", quantity: 3, price: "850,000" }
            ]
        }
        
        // Add more entries as needed
    };

    // Function to load revenue data
    function loadRevenueData() {
        const tbody = $('#revenueTableBody');
        tbody.empty();

        revenueData.forEach(revenue => {
            tbody.append(`
                <tr>
                    <td>${revenue.id}</td>
                    <td>${revenue.date}</td>
                    <td>${revenue.amount}đ</td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="viewSaleDetails(${revenue.id})">
                            <i class="fas fa-eye"></i> Xem chi tiết
                        </button>
                    </td>
                </tr>
            `);
        });
    }

    // Initial load
    loadRevenueData();

    // Handle filter type change
    $('.filterSelect').change(function() {
        const filterType = $(this).val();
        $('#dateFilter, #dateRangeFilter').hide();
        
        if (filterType === 'date') {
            $('#dateFilter').show();
            $('#yearSelect').val('Chọn năm');
            $('#monthSelect').prop('disabled', true).val('Chọn tháng');
        } else if (filterType === 'range') {
            $('#dateRangeFilter').show();
            // Reset date inputs
            $('#startDateRange, #endDateRange').val('');
        }

        filterData(filterType);
    });

    // Handle year selection
    $('#yearSelect').change(function() {
        const selectedYear = $(this).val();
        if (selectedYear) {
            $('#monthSelect').prop('disabled', false).val('Chọn tháng');
        } else {
            $('#monthSelect').prop('disabled', true).val('Chọn tháng');
        }
    });

    // Handle apply date filter
    $('#applyDateFilter').click(function() {
        const selectedYear = $('#yearSelect').val();
        const selectedMonth = $('#monthSelect').val();

        if (!selectedYear) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Vui lòng chọn năm',
                icon: 'error'
            });
            return;
        }

        let filteredData = revenueData.filter(item => {
            const itemDate = parseDate(item.date);
            if (selectedMonth) {
                // Filter by both year and month
                return itemDate.getFullYear() === parseInt(selectedYear) && 
                       itemDate.getMonth() === parseInt(selectedMonth);
            } else {
                // Filter by year only
                return itemDate.getFullYear() === parseInt(selectedYear);
            }
        });

        if (filteredData.length === 0) {
            const timeText = selectedMonth ? 
                `tháng ${parseInt(selectedMonth) + 1}/${selectedYear}` : 
                `năm ${selectedYear}`;
            
            Swal.fire({
                title: 'Thông báo',
                text: `Không có dữ liệu doanh thu cho ${timeText}`,
                icon: 'info'
            });
        }

        updateRevenueTotals(filteredData);
        displayFilteredData(filteredData);
    });

    // Handle date range filter
    $('#applyDateRangeFilter').click(function() {
        const startDate = new Date($('#startDateRange').val());
        const endDate = new Date($('#endDateRange').val());
        endDate.setHours(23, 59, 59); // Include entire end date

        // Validate dates
        if (!startDate || !endDate || isNaN(startDate) || isNaN(endDate)) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Vui lòng chọn khoảng thời gian hợp lệ',
                icon: 'error'
            });
            return;
        }

        if (startDate > endDate) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc',
                icon: 'error'
            });
            return;
        }

        // Filter data by date range
        const filteredData = revenueData.filter(item => {
            const itemDate = parseDate(item.date);
            return itemDate >= startDate && itemDate <= endDate;
        });

        if (filteredData.length === 0) {
            Swal.fire({
                title: 'Thông báo',
                text: 'Không có dữ liệu doanh thu trong khoảng thời gian này',
                icon: 'info'
            });
        }

        // Show summary
        const totalAmount = filteredData.reduce((sum, item) => 
            sum + parseInt(item.amount.replace(/,/g, '')), 0);
            
        Swal.fire({
            title: 'Thống kê doanh thu',
            html: `
                <div class="text-left">
                    <p>Từ: ${startDate.toLocaleDateString('vi-VN')}</p>
                    <p>Đến: ${endDate.toLocaleDateString('vi-VN')}</p>
                    <p>Tổng doanh thu: ${totalAmount.toLocaleString()}đ</p>
                    <p>Số giao dịch: ${filteredData.length}</p>
                </div>
            `,
            icon: 'info'
        });

        updateRevenueTotals(filteredData);
        displayFilteredData(filteredData);
    });

    // Function to parse date string (DD/MM/YYYY)
    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/');
        return new Date(year, month - 1, day);
    }

    // Compare only dates without time
    function isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate();
    }

    // Enhanced custom date filter
    $('#applyFilter').click(function() {
        currentPage = 1; // Reset to first page on new filter
        const selectedDate = new Date($('#selectedDate').val());

        if (!selectedDate || isNaN(selectedDate)) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Vui lòng chọn ngày hợp lệ',
                icon: 'error'
            });
            return;
        }

        const filteredData = revenueData.filter(item => {
            const itemDate = parseDate(item.date);
            return isSameDay(itemDate, selectedDate);
        });

        if (filteredData.length === 0) {
            Swal.fire({
                title: 'Thông báo',
                text: 'Không có dữ liệu doanh thu cho ngày đã chọn',
                icon: 'info'
            });
        }

        updateRevenueTotals(filteredData);
        displayFilteredData(filteredData);
    });

    function filterData(filterType) {
        let filteredData = [...revenueData];
        const today = new Date();

        switch(filterType) {
            case 'today':
                filteredData = revenueData.filter(item => {
                    const itemDate = parseDate(item.date);
                    return isSameDay(itemDate, today);
                });
                break;
            case 'all':
                // Keep all data
                break;
        }

        updateRevenueTotals(filteredData);
        displayFilteredData(filteredData);
    }

    function displayFilteredData(data) {
        // Sort data by date in descending order
        const sortedData = data.sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateB - dateA; // For descending order
        });
        
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedData = sortedData.slice(startIndex, endIndex);
        
        const tbody = $('#revenueTableBody');
        tbody.empty();
        
        paginatedData.forEach(revenue => {
            tbody.append(`
                <tr>
                    <td>${revenue.id}</td>
                    <td>${revenue.date}</td>
                    <td>${revenue.amount}đ</td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="viewSaleDetails(${revenue.id})">
                            <i class="fas fa-eye"></i> Xem chi tiết
                        </button>
                    </td>
                </tr>
            `);
        });

        updatePagination(data.length);
        calculateTotalRevenue();
        updateCurrentMonthRevenue();
    }

    // Enhanced view sales details function
    window.viewSaleDetails = function(id) {
        const saleInfo = salesData[id] || {
            date: revenueData.find(r => r.id === id)?.date || 'Unknown',
            products: []
        };

        let productsHtml = saleInfo.products.map(p => {
            const subtotal = (parseInt(p.price.replace(/,/g, '')) * p.quantity);
            return `
                <tr>
                    <td>${p.name}</td>
                    <td class="text-center">${p.quantity}</td>
                    <td class="text-right">${p.price}đ</td>
                    <td class="text-right">${subtotal.toLocaleString()}đ</td>
                </tr>
            `;
        }).join('');

        const total = saleInfo.products.reduce((sum, p) => 
            sum + (parseInt(p.price.replace(/,/g, '')) * p.quantity), 0);

        Swal.fire({
            title: `Chi tiết bán hàng ngày ${saleInfo.date}`,
            html: `
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead class="thead-light">
                            <tr>
                                <th>Sản phẩm</th>
                                <th class="text-center">Số lượng</th>
                                <th class="text-right">Đơn giá</th>
                                <th class="text-right">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productsHtml || '<tr><td colspan="4" class="text-center">Không có dữ liệu bán hàng</td></tr>'}
                        </tbody>
                        <tfoot>
                            <tr class="font-weight-bold">
                                <td colspan="3" class="text-right">Tổng cộng:</td>
                                <td class="text-right">${total.toLocaleString()}đ</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            `,
            width: '800px',
            showCloseButton: true,
            customClass: {
                container: 'sales-detail-popup'
            }
        });
    };

    // Update pagination function to match nguoiDung style
    function updatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const pagination = $('#pagination');
        pagination.empty();

        // Previous button
        pagination.append(`
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage - 1}">Trước</a>
            </li>
        `);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // First page
                i === totalPages || // Last page
                (i >= currentPage - 1 && i <= currentPage + 1) // Pages around current
            ) {
                pagination.append(`
                    <li class="page-item ${i === currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${i}">${i}</a>
                    </li>
                `);
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                pagination.append('<li class="page-item disabled"><span class="page-link">...</span></li>');
            }
        }

        // Next button
        pagination.append(`
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage + 1}">Sau</a>
            </li>
        `);

        // Update click handlers
        $('.page-link').click(function(e) {
            e.preventDefault();
            const newPage = parseInt($(this).data('page'));
            if (newPage && newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
                currentPage = newPage;
                const filterType = $('.filterSelect').val();
                if (filterType === 'custom') {
                    $('#applyFilter').trigger('click');
                } else if (filterType === 'range') {
                    $('#applyDateRangeFilter').trigger('click');
                } else if (filterType === 'date') {
                    $('#applyDateFilter').trigger('click');
                } else {
                    filterData(filterType);
                }
            }
        });
    }

    // Function to update revenue totals
    function updateRevenueTotals(data) {
        const total = data.reduce((sum, item) => {
            return sum + parseInt(item.amount.replace(/,/g, ''));
        }, 0);

        // Update total revenue card
        $('.text-primary + .h5').text(total.toLocaleString() + 'đ');
        
        // Update current month revenue
        updateCurrentMonthRevenue();
    }

    // Function to update current month revenue
    function updateCurrentMonthRevenue() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        const currentMonthData = revenueData.filter(item => {
            const itemDate = parseDate(item.date);
            return itemDate.getMonth() === currentMonth && 
                   itemDate.getFullYear() === currentYear;
        });

        const monthlyTotal = currentMonthData.reduce((sum, item) => {
            return sum + parseInt(item.amount.replace(/,/g, ''));
        }, 0);

        $('#currentMonthRevenue').text(monthlyTotal.toLocaleString() + 'đ');
    }

    // Calculate and display total revenue
    function calculateTotalRevenue() {
        const totalRevenue = revenueData.reduce((sum, item) => {
            return sum + parseInt(item.amount.replace(/,/g, ''));
        }, 0);

        // Update total revenue in the card
        $('.text-primary + .h5').text(totalRevenue.toLocaleString() + 'đ');
    }

    // Export functions
    $('#exportExcel').click(function() {
        const filterType = $('.filterSelect').val();
        let filterText = 'tất cả';
        
        if (filterType === 'date') {
            const selectedYear = $('#yearSelect').val();
            const selectedMonth = $('#monthSelect').val();
            if (selectedYear && selectedMonth) {
                filterText = `tháng ${parseInt(selectedMonth) + 1}/${selectedYear}`;
            } else if (selectedYear) {
                filterText = `năm ${selectedYear}`;
            }
        } else if (filterType === 'range') {
            const startDate = new Date($('#startDateRange').val());
            const endDate = new Date($('#endDateRange').val());
            if (!isNaN(startDate) && !isNaN(endDate)) {
                filterText = `từ ${startDate.toLocaleDateString('vi-VN')} đến ${endDate.toLocaleDateString('vi-VN')}`;
            }
        } else if (filterType === 'custom') {
            filterText = 'tùy chọn';
        }

        Swal.fire({
            title: 'Xuất Excel',
            text: `Xuất báo cáo doanh thu ${filterText}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xuất',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                // Add Excel export logic here
                Swal.fire('Thành công!', 'Đã xuất file Excel', 'success');
            }
        });
    });

    $('#exportPDF').click(function() {
        const filterType = $('.filterSelect').val();
        let filterText = 'tất cả';
        
        if (filterType === 'date') {
            const selectedYear = $('#yearSelect').val();
            const selectedMonth = $('#monthSelect').val();
            if (selectedYear && selectedMonth) {
                filterText = `tháng ${parseInt(selectedMonth) + 1}/${selectedYear}`;
            } else if (selectedYear) {
                filterText = `năm ${selectedYear}`;
            }
        } else if (filterType === 'range') {
            const startDate = new Date($('#startDateRange').val());
            const endDate = new Date($('#endDateRange').val());
            if (!isNaN(startDate) && !isNaN(endDate)) {
                filterText = `từ ${startDate.toLocaleDateString('vi-VN')} đến ${endDate.toLocaleDateString('vi-VN')}`;
            }
        } else if (filterType === 'custom') {
            filterText = 'tùy chọn';
        }

        Swal.fire({
            title: 'Xuất PDF',
            text: `Xuất báo cáo doanh thu ${filterText}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xuất',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                // Add PDF export logic here
                Swal.fire('Thành công!', 'Đã xuất file PDF', 'success');
            }
        });
    });

    // Initial load with default filter (day)
    $('.filterSelect').trigger('change');

    // Initialize with all data
    currentPage = 1;
    $('.filterSelect').val('all').trigger('change');
    
    // Initialize with current month revenue
    updateCurrentMonthRevenue();
    calculateTotalRevenue();
});