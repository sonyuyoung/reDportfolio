// ============== IntersectionObserver ==============
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("animate");
    else entry.target.classList.remove("animate");
  });
});

// 스킬 컨테이너가 없을 수도 있으니 가드
const skillContainer = document.querySelector(".skills-container");
if (skillContainer) observer.observe(skillContainer);

// ============== 백분율 위치 업데이트 ==============
// .bar가 1개 이상 존재하는지 확인하고, 각 .percentage를 자기 바 기준으로 계산
function updatePercentagePositions() {
  const bars = document.querySelectorAll(".bar");
  const percentages = document.querySelectorAll(".percentage");
  if (!bars.length || !percentages.length) return;

  percentages.forEach((percentage) => {
    const bar = percentage.parentElement?.querySelector(".bar");
    const barWidth = bar?.clientWidth || 0;
    if (!barWidth) return;
    const widthPercentage = parseFloat(percentage.textContent) / 100;
    // 배지 가운데 맞춘 오프셋(12.5px) — 필요에 맞게 조정 가능
    percentage.style.left = `${barWidth * widthPercentage - 12.5}px`;
  });
}
updatePercentagePositions();

// ============== 슬라이드 ==============
// 현재 페이지에 .mySlides가 없을 때를 대비한 가드 + 인덱스 보정
let slideIndex = 0;

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  if (!slides || slides.length === 0) return; // ★ 가드

  // n이 넘어오면 설정(없으면 기존 인덱스 유지)
  if (typeof n === "number") slideIndex = n;

  // 인덱스 보정
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  // 모두 숨기고 현재만 표시
  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  slides[slideIndex].style.display = "block";
}

// 모달 열릴 때 인덱스 초기화만
function resetSlideIndex() {
  slideIndex = 0;
  showSlides(slideIndex);
}

// 이전/다음 버튼 핸들러(HTML에서 onclick 호출 시에도 안전)
function prevSlide(e) {
  if (e && e.preventDefault) e.preventDefault();
  slideIndex--;
  showSlides(slideIndex);
}
function nextSlide(e) {
  if (e && e.preventDefault) e.preventDefault();
  slideIndex++;
  showSlides(slideIndex);
}

// 초기 렌더 — 슬라이드가 없으면 아무 일도 안 함(가드가 막아줌)
document.addEventListener("DOMContentLoaded", () => showSlides(slideIndex));

// ============== 모달 닫힘 처리 ==============
// 선택자가 없을 수 있으므로 가드
const modalCloseBtn = document.querySelector(".modal-close-btn");
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", function () {
    // enableScroll()이 전역에 있을 때만 실행
    if (typeof enableScroll === "function") enableScroll();
    deregisterSlideEvent();
  });
}

// HTML에서 a.prev/a.next에 inline onclick을 쓰고 있으면
// removeEventListener로는 지워지지 않습니다. (inline 핸들러 != addEventListener)
// 다만 null 에러는 막아야 하므로 널 가드만 둡니다.
function deregisterSlideEvent() {
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  if (prevButton) {
    // addEventListener로 등록한 적이 없는 경우 removeEventListener는 효과 없음
    try { prevButton.removeEventListener("click", prevSlide); } catch (_) {}
  }
  if (nextButton) {
    try { nextButton.removeEventListener("click", nextSlide); } catch (_) {}
  }
}
