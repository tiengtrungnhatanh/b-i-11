// ==========================================================
//  SCRIPT.JS – Logic điều hướng SPA
//  Không tải lại trang, chuyển màn hình bằng class "active"
// ==========================================================

// ----------------------------------------------------------
// DỮ LIỆU CÁC TRÌNH ĐỘ VÀ BÀI TẬP
// ----------------------------------------------------------
const HSK_DATA = {
  1: {
    name: 'HSK 1', subtitle: 'Sơ Cấp',
    lessons: [
      { id: 'hsk1-bai1', title: 'Bài 1', content: `<h2>HSK 1 – Bài 1</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p><p class="placeholder-hint">👉 Mở file <strong>script.js</strong>, tìm <code>hsk1-bai1</code> rồi thay thế phần <code>content</code>.</p>` },
      { id: 'hsk1-bai2',  title: 'Bài 2',  content: `<h2>HSK 1 – Bài 2</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` },
      { id: 'hsk1-bai3',  title: 'Bài 3',  content: `<h2>HSK 1 – Bài 3</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` },
      { id: 'hsk1-bai4',  title: 'Bài 4',  content: `<h2>HSK 1 – Bài 4</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` },
      { id: 'hsk1-bai5',  title: 'Bài 5',  content: `<h2>HSK 1 – Bài 5</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` },
      { id: 'hsk1-bai6',  title: 'Bài 6',  content: `<h2>HSK 1 – Bài 6</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` },
      { id: 'hsk1-bai7',  title: 'Bài 7',  content: `<h2>HSK 1 – Bài 7</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` },
      { id: 'hsk1-bai8',  title: 'Bài 8',  content: `<h2>HSK 1 – Bài 8</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` },
      { id: 'hsk1-bai9',  title: 'Bài 9',  content: `<h2>HSK 1 – Bài 9</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` },
      { id: 'hsk1-bai10', title: 'Bài 10', content: `<h2>HSK 1 – Bài 10</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` },
      { id: 'hsk1-bai11', title: 'Bài 11', content: `<h2>HSK 1 – Bài 11</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` },
      { id: 'hsk1-bai12', title: 'Bài 12', content: `<h2>HSK 1 – Bài 12</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` },
      { id: 'hsk1-bai13', title: 'Bài 13', content: `<h2>HSK 1 – Bài 13</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` },
      { id: 'hsk1-bai14', title: 'Bài 14', content: `<h2>HSK 1 – Bài 14</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` },
      { id: 'hsk1-bai15', title: 'Bài 15', content: `<h2>HSK 1 – Bài 15</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>` }
    ]
  },
  2: {
    name: 'HSK 2', subtitle: 'Sơ-Trung Cấp',
    lessons: Array.from({ length: 15 }, (_, i) => ({
      id: `hsk2-bai${i+1}`, title: `Bài ${i+1}`,
      content: `<h2>HSK 2 – Bài ${i+1}</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>`
    }))
  },
  3: {
    name: 'HSK 3', subtitle: 'Trung Cấp',
    lessons: Array.from({ length: 15 }, (_, i) => ({
      id: `hsk3-bai${i+1}`, title: `Bài ${i+1}`,
      content: `<h2>HSK 3 – Bài ${i+1}</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>`
    }))
  },
  4: {
    name: 'HSK 4', subtitle: 'Trung-Cao Cấp',
    lessons: Array.from({ length: 15 }, (_, i) => ({
      id: `hsk4-bai${i+1}`, title: `Bài ${i+1}`,
      content: `<h2>HSK 4 – Bài ${i+1}</h2><p>Phần đề bài sẽ được bổ sung tại đây.</p>`
    }))
  }
};

let currentLevel  = null;
let currentLesson = null;

// Chuyển màn hình
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) { target.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
}

// Mở trình độ HSK
function openLevel(levelNum) {
  currentLevel = levelNum;
  const levelData = HSK_DATA[levelNum];
  if (!levelData) return;

  document.getElementById('list-title').textContent = levelData.name + ' – ' + levelData.subtitle;

  const grid = document.getElementById('lesson-grid');
  grid.innerHTML = '';

  levelData.lessons.forEach((lesson, index) => {
    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `<span class="lesson-number">${index + 1}</span><span class="lesson-label">${lesson.title}</span>`;
    card.addEventListener('click', () => openLesson(index));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openLesson(index); });
    grid.appendChild(card);
  });

  showScreen('screen-list');
}

// Mở nội dung bài tập
function openLesson(lessonIndex) {
  const levelData = HSK_DATA[currentLevel];
  if (!levelData) return;
  const lesson = levelData.lessons[lessonIndex];
  if (!lesson) return;
  currentLesson = lesson;

  document.getElementById('lesson-title').textContent = levelData.name + ' – ' + lesson.title;

  const body = document.getElementById('lesson-body');
  const isPlaceholder = lesson.content.includes('bổ sung tại đây');

  if (isPlaceholder) {
    body.innerHTML = `
      <div class="placeholder-block">
        <div class="placeholder-hanzi">学</div>
        <h2 style="color:var(--red-deep);font-family:'Noto Serif SC',serif;">${levelData.name} – ${lesson.title}</h2>
        <p class="placeholder-text">Nội dung bài tập chưa được bổ sung.<br/>Mở <strong>script.js</strong> và chỉnh sửa phần <code>${lesson.id}</code>.</p>
        <p class="placeholder-hint">💡 Tìm <strong>id: '${lesson.id}'</strong> rồi thay <code>content</code> bằng HTML bài tập.</p>
      </div>`;
  } else {
    body.innerHTML = lesson.content;
  }

  showScreen('screen-lesson');
}

// Nút quay lại
document.getElementById('btn-back-home').addEventListener('click', () => showScreen('screen-home'));
document.getElementById('btn-back-list').addEventListener('click', () => showScreen('screen-list'));

// Gắn sự kiện cho các level card
document.querySelectorAll('.level-card').forEach(card => {
  const level = parseInt(card.getAttribute('data-level'), 10);
  card.addEventListener('click', () => openLevel(level));
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openLevel(level); });
});

// Khởi động
showScreen('screen-home');// Dữ liệu chính của website.
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
