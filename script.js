document.addEventListener("DOMContentLoaded", function() {

    // 1. Khai báo danh sách media
    const mediaList = [
        { type: 'video', src: 'main/video1.mp4' },
        { type: 'video', src: 'main/video2.mp4' },
        { type: 'image', src: 'main/image1.jpg' },
        { type: 'image', src: 'main/image2.jpg' }    
    ];

    let currentIndex = 0;
    let autoSlideTimer; // Biến mới: Dùng để lưu trữ đồng hồ đếm ngược

    const mediaContainer = document.getElementById("media-container");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    if (!mediaContainer) {
        console.error("Lỗi: Không tìm thấy id='media-container' trong HTML!");
        return;
    }

    // 2. Hàm khởi tạo (Giữ nguyên)
    function initMedia() {
        mediaList.forEach((media, index) => {
            let element;
            if (media.type === 'video') {
                element = document.createElement("video");
                element.src = media.src;
                element.autoplay = true;
                element.loop = true;
                element.muted = true;
                element.playsInline = true;
            } else {
                element = document.createElement("img");
                element.src = media.src;
            }
            
            if (index === 0) {
                element.classList.add("active");
            }
            mediaContainer.appendChild(element);
        });
    }

    // 3. Hàm cập nhật hiển thị (Giữ nguyên)
    function updateSlider() {
        const allMediaElements = mediaContainer.children;
        for (let i = 0; i < allMediaElements.length; i++) {
            allMediaElements[i].classList.remove("active");
        }
        allMediaElements[currentIndex].classList.add("active");
    }

    // === TÍNH NĂNG MỚI BẮT ĐẦU TỪ ĐÂY ===

    // Hàm chuyển sang slide tiếp theo (dùng chung cho nút bấm và nút tự động)
    function nextSlide() {
        currentIndex = (currentIndex + 1) % mediaList.length;
        updateSlider();
    }

    // Hàm thiết lập/reset lại đồng hồ 10 giây
    function resetAutoSlide() {
        clearInterval(autoSlideTimer); // Xóa bỏ cái đồng hồ cũ đi (nếu có)
        autoSlideTimer = setInterval(nextSlide, 10000); // Đặt đồng hồ mới chạy sau 10000 mili-giây (10 giây)
    }

    // === KẾT THÚC TÍNH NĂNG MỚI ===

    // Chạy khởi tạo
    initMedia();
    resetAutoSlide(); // Kích hoạt đồng hồ chạy ngay khi web tải xong

    // 4. Xử lý nút bấm
    if (rightBtn && leftBtn) {
        rightBtn.addEventListener("click", () => {
            nextSlide(); 
            resetAutoSlide(); // QUAN TRỌNG: Người dùng bấm thì phải reset lại 10 giây từ đầu!
        });

        leftBtn.addEventListener("click", () => {
            // Logic lùi slide
            currentIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
            updateSlider();
            resetAutoSlide(); // Tương tự, reset đồng hồ
        });
    }
});