// 1. Khai báo danh sách sắp xếp: Video trước, Ảnh sau
// Bạn chỉ cần thay tên file tương ứng có trong thư mục của bạn
const mediaList = [
    { type: 'video', src: 'main/video1.mp4' }, // Video 1
    { type: 'video', src: 'main/video2.mp4' }, // Video 2
    { type: 'image', src: 'main/image1.jpg' }, // Ảnh 1
    { type: 'image', src: 'main/image2.jpg' }  // Ảnh 2
];

let currentIndex = 0;

const mediaContainer = document.getElementById("media-container");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

// 2. Hàm khởi tạo: Nhúng sẵn tất cả video và ảnh vào HTML
function initMedia() {
    mediaList.forEach((media, index) => {
        let element;
        
        // Nếu là video thì tạo thẻ <video>
        if (media.type === 'video') {
            element = document.createElement("video");
            element.src = media.src;
            element.autoplay = true;
            element.loop = true;
            element.muted = true;
            element.playsInline = true;
        } 
        // Nếu là ảnh thì tạo thẻ <img>
        else {
            element = document.createElement("img");
            element.src = media.src;
        }
        
        // Bật hiển thị cho phần tử đầu tiên (vị trí số 0)
        if (index === 0) {
            element.classList.add("active");
        }
        
        // Đưa phần tử vào khung chứa
        mediaContainer.appendChild(element);
    });
}

// 3. Hàm chuyển đổi hiển thị
function updateSlider() {
    const allMediaElements = mediaContainer.children;
    
    // Tắt hiển thị của TẤT CẢ các media
    for (let i = 0; i < allMediaElements.length; i++) {
        allMediaElements[i].classList.remove("active");
    }
    
    // Chỉ bật hiển thị cho media ở vị trí hiện tại
    allMediaElements[currentIndex].classList.add("active");
}

// Chạy hàm khởi tạo khi trang web vừa load xong
initMedia();

// 4. Xử lý khi bấm mũi tên Phải
rightBtn.addEventListener("click", () => {
    // Vòng lặp tiến: Nếu đến cuối thì quay lại 0 (Video 1)
    currentIndex = (currentIndex + 1) % mediaList.length;
    updateSlider();
});

// 5. Xử lý khi bấm mũi tên Trái
leftBtn.addEventListener("click", () => {
    // Vòng lặp lùi: Nếu đang ở 0 mà lùi thì nhảy xuống cuối cùng
    currentIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
    updateSlider();
});