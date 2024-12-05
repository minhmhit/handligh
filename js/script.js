// Khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  // Xử lý sự kiện khi nhấn nút thêm vào giỏ
  document.querySelectorAll('.cartbtn').forEach((button, index) => {
      button.addEventListener('click', (event) => {
          const productWrapper = event.target.closest('.product-wrapper');

          if (!productWrapper) {
              console.error("Không tìm thấy sản phẩm.");
              return;
          }

          // Lấy thông tin sản phẩm
          const productKey = productWrapper.getAttribute('data-key') || `product-${index + 1}`;
          const productName = productWrapper.querySelector('h5').innerText;
          const productPrice = productWrapper.querySelector('.text-danger').innerText;
          const productImage = productWrapper.querySelector('img').src;

          // Cấu trúc sản phẩm để thêm vào giỏ hàng
          const cartItem = {
              key: productKey,
              name: productName,
              price: productPrice,
              image: productImage,
              quantity: 1
          };

          // Thêm vào localStorage
          let cart = JSON.parse(localStorage.getItem('cart')) || [];
          const existingItemIndex = cart.findIndex(item => item.key === productKey);

          if (existingItemIndex > -1) {
              cart[existingItemIndex].quantity += 1; // Tăng số lượng nếu đã có trong giỏ
          } else {
              cart.push(cartItem); // Thêm sản phẩm mới
          }

          localStorage.setItem('cart', JSON.stringify(cart));

          // Hiển thị thông báo
          showNotification(productName);

          // Cập nhật số lượng sản phẩm trong biểu tượng giỏ hàng
          updateCartCount();
      });
  });

  // Cập nhật số lượng sản phẩm trong biểu tượng giỏ hàng
  function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

      const cartCountElement = document.querySelector('.cart-count');
      if (cartCountElement) {
          cartCountElement.innerText = totalQuantity;
      }
  }

//   // Hiển thị thông báo thêm vào giỏ hàng
//   function showNotification(productName) {
//       // Tạo thông báo
//       let notification = document.getElementById('cart-toast');
//       if (!notification) {
//           notification = document.createElement('div');
//           notification.id = 'cart-toast';
//           notification.classList.add('cart-toast');
//           document.body.appendChild(notification);
//       }

//       // Cập nhật nội dung và hiển thị
//       notification.innerText = `Sản phẩm "${productName}" đã được thêm vào giỏ hàng.`;
//       notification.classList.add('show');

//       // Tự động ẩn thông báo sau 5 giây
//       setTimeout(() => {
//           hideNotification(notification);
//       }, 5000);

//       // Ẩn thông báo khi click bất kỳ đâu
//       document.addEventListener('click', () => hideNotification(notification), { once: true });
//   }

//   // Ẩn thông báo
//   function hideNotification(notification) {
//       notification.classList.remove('show');
//   }

  // Khởi tạo số lượng trong biểu tượng giỏ hàng khi tải trang
  updateCartCount();
});
