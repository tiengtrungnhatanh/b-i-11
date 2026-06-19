// Dữ liệu chính của website.
// Muốn đổi tên trình độ hoặc số lượng bài, chỉnh trực tiếp ở mảng này.
const hskLevels = [
  {
    id: "hsk1",
    name: "HSK 1",
    description: "Bài tập nền tảng cho người mới bắt đầu.",
    lessonCount: 15
  },
  {
    id: "hsk2",
    name: "HSK 2",
    description: "Luyện tập câu ngắn, từ vựng và mẫu câu cơ bản.",
    lessonCount: 15
  },
  {
    id: "hsk3",
    name: "HSK 3",
    description: "Củng cố đọc hiểu, ngữ pháp và giao tiếp thường dùng.",
    lessonCount: 15
  },
  {
    id: "hsk4",
    name: "HSK 4",
    description: "Bài tập nâng cao hơn về đọc hiểu và diễn đạt.",
    lessonCount: 15
  }
];

const levelView = document.querySelector("#level-view");
const lessonListView = document.querySelector("#lesson-list-view");
const lessonDetailView = document.querySelector("#lesson-detail-view");
const levelList = document.querySelector("#level-list");
const lessonList = document.querySelector("#lesson-list");
const lessonListTitle = document.querySelector("#lesson-list-title");
const lessonListDesc = document.querySelector("#lesson-list-desc");
const lessonContent = document.querySelector("#lesson-content");

let currentLevelId = "";

function findLevel(levelId) {
  return hskLevels.find((level) => level.id === levelId);
}

function showOnly(viewName) {
  levelView.classList.toggle("hidden", viewName !== "levels");
  lessonListView.classList.toggle("hidden", viewName !== "lessons");
  lessonDetailView.classList.toggle("hidden", viewName !== "detail");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderLevels() {
  levelList.innerHTML = hskLevels
    .map((level, index) => {
      return `
        <button class="level-card" type="button" data-level-id="${level.id}">
          <span class="level-number">${index + 1}</span>
          <h3>${level.name}</h3>
          <p>${level.description}</p>
        </button>
      `;
    })
    .join("");
}

function renderLessons(levelId) {
  const level = findLevel(levelId);

  if (!level) {
    renderLevels();
    showOnly("levels");
    return;
  }

  currentLevelId = level.id;
  lessonListTitle.textContent = level.name;
  lessonListDesc.textContent = `${level.lessonCount} bài tập`;

  lessonList.innerHTML = Array.from({ length: level.lessonCount }, (_, index) => {
    const lessonNumber = index + 1;

    return `
      <button class="lesson-button" type="button" data-level-id="${level.id}" data-lesson-number="${lessonNumber}">
        Bài ${lessonNumber}
        <span>${level.name} - Bài ${lessonNumber}</span>
      </button>
    `;
  }).join("");

  history.replaceState(null, "", `#${level.id}`);
  showOnly("lessons");
}

function renderLessonDetail(levelId, lessonNumber) {
  const level = findLevel(levelId);
  const template = document.querySelector(`#${levelId}-bai-${lessonNumber}`);

  if (!level) {
    renderLevels();
    showOnly("levels");
    return;
  }

  currentLevelId = level.id;

  // Nội dung bài được lấy từ các thẻ <template> trong index.html.
  if (template) {
    lessonContent.innerHTML = template.innerHTML;
  } else {
    lessonContent.innerHTML = `
      <h2>${level.name} - Bài ${lessonNumber}</h2>
      <p>Phần đề bài sẽ được bổ sung tại đây.</p>
    `;
  }

  history.replaceState(null, "", `#${level.id}-bai-${lessonNumber}`);
  showOnly("detail");
}

function handleHashOnLoad() {
  const hash = window.location.hash.replace("#", "");
  const lessonMatch = hash.match(/^(hsk\d+)-bai-(\d+)$/);

  if (lessonMatch) {
    renderLessonDetail(lessonMatch[1], Number(lessonMatch[2]));
    return;
  }

  if (findLevel(hash)) {
    renderLessons(hash);
    return;
  }

  showOnly("levels");
}

document.addEventListener("click", (event) => {
  const levelCard = event.target.closest("[data-level-id]:not([data-lesson-number])");
  const lessonButton = event.target.closest("[data-lesson-number]");
  const actionButton = event.target.closest("[data-action]");

  if (lessonButton) {
    renderLessonDetail(lessonButton.dataset.levelId, Number(lessonButton.dataset.lessonNumber));
    return;
  }

  if (levelCard) {
    renderLessons(levelCard.dataset.levelId);
    return;
  }

  if (!actionButton) {
    return;
  }

  if (actionButton.dataset.action === "back-to-levels") {
    history.replaceState(null, "", window.location.pathname);
    showOnly("levels");
  }

  if (actionButton.dataset.action === "back-to-lessons") {
    renderLessons(currentLevelId);
  }
});

window.addEventListener("hashchange", handleHashOnLoad);

renderLevels();
handleHashOnLoad();
