// IntersectionObserver 생성
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 화면에 나타나면 animate 클래스를 추가합니다.
      entry.target.classList.add("animate");
    } else {
      // 화면에서 사라지면 animate 클래스를 제거합니다.
      entry.target.classList.remove("animate");
    }
  });
});

// 스킬 컨테이너 요소를 관찰합니다.
const skillContainer = document.querySelector(".skills-container");
observer.observe(skillContainer);

// 백분율 위치를 업데이트하는 함수
function updatePercentagePositions() {
  const barWidth = document.querySelector(".bar").clientWidth;
  const percentages = document.querySelectorAll(".percentage");
  percentages.forEach((percentage) => {
    const widthPercentage = parseFloat(percentage.textContent) / 100;
    percentage.style.left = `${barWidth * widthPercentage - 12.5}px`;
  });
}

// 초기에 백분율 위치를 업데이트합니다.
updatePercentagePositions();

// 슬라이드 추가코드
function resetSlideIndex() {
  slideIndex = 0; // 모달이 열릴 때 슬라이드 인덱스를 0으로 초기화
}

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; // 모든 슬라이드를 숨깁니다.
  }
  if (slideIndex >= slides.length) {
    slideIndex = 0; // 마지막 슬라이드일 경우 처음 슬라이드로 돌아갑니다.
  }
  if (slideIndex < 0) {
    slideIndex = slides.length - 1; // 첫 번째 슬라이드일 경우 마지막 슬라이드로 이동합니다.
  }
  slides[slideIndex].style.display = "block"; // 현재 슬라이드를 표시합니다.
}

function prevSlide() {
  slideIndex--;
  var slides = document.getElementsByClassName("mySlides"); // 이 부분을 추가합니다.
  if (slideIndex < 0) {
    slideIndex = slides.length - 1; // 첫 번째 슬라이드일 경우 마지막 슬라이드로 이동합니다.
  }
  showSlides(); // 이전 슬라이드를 표시합니다.
}

function nextSlide() {
  slideIndex++;
  var slides = document.getElementsByClassName("mySlides"); // 이 부분을 추가합니다.
  if (slideIndex >= slides.length) {
    slideIndex = 0; // 마지막 슬라이드일 경우 처음 슬라이드로 돌아갑니다.
  }
  showSlides(); // 다음 슬라이드를 표시합니다.
}
// 모달 닫기 버튼 클릭 시 스크롤 이벤트 중지
var modalCloseBtn = document.querySelector(".modal-close-btn");
modalCloseBtn.addEventListener("click", function () {
  enableScroll(); // 스크롤 이벤트 다시 활성화
  // 슬라이드 이벤트 핸들러 제거
  deregisterSlideEvent();
});

// 슬라이드 이벤트 핸들러 해제 함수
function deregisterSlideEvent() {
  // 슬라이드 버튼에 추가된 이벤트 핸들러 제거
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  prevButton.removeEventListener("click", prevSlide);
  nextButton.removeEventListener("click", nextSlide);
}
