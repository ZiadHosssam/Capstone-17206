const photos = [
  "photo_2026-04-20_17-42-40.jpg",
  "photo_2026-04-20_17-43-00.jpg",
  "photo_2026-04-20_17-43-02.jpg",
  "photo_2026-04-20_17-43-28.jpg",
  "photo_2026-04-20_17-43-31.jpg",
  "photo_2026-04-20_17-43-33.jpg",
  "photo_2026-04-20_17-43-36.jpg",
  "photo_2026-04-20_17-43-40.jpg",
  "photo_2026-04-20_17-43-53.jpg",
  "photo_2026-04-20_17-43-55.jpg",
  "photo_2026-04-20_17-44-05.jpg",
  "photo_2026-04-20_17-44-08.jpg",
  "photo_2026-04-20_17-44-13.jpg",
  "photo_2026-04-20_17-44-15.jpg",
  "photo_2026-04-20_17-44-18.jpg",
  "photo_2026-04-20_17-44-21.jpg",
  "photo_2026-04-20_17-44-24.jpg",
  "photo_2026-04-20_17-44-29.jpg",
  "photo_2026-04-20_17-44-32.jpg",
  "photo_2026-04-20_17-44-36.jpg",
  "photo_2026-04-20_17-44-41.jpg",
  "photo_2026-04-20_17-44-44.jpg",
  "photo_2026-04-20_17-44-47.jpg",
  "photo_2026-04-20_17-44-49.jpg",
  "photo_2026-04-20_17-44-52.jpg",
  "photo_2026-04-20_17-44-55.jpg",
  "photo_2026-04-20_17-44-58.jpg",
  "photo_2026-04-20_17-45-00.jpg",
  "photo_2026-04-20_17-45-03.jpg",
  "photo_2026-04-20_17-45-06.jpg",
  "photo_2026-04-20_17-45-08.jpg",
  "photo_2026-04-20_17-45-10.jpg",
  "photo_2026-04-20_17-45-13.jpg",
  "photo_2026-04-20_17-45-15.jpg",
  "photo_2026-04-20_17-45-19.jpg",
  "photo_2026-04-20_17-45-21.jpg",
  "photo_2026-04-20_17-45-24.jpg",
  "photo_2026-04-20_17-45-27.jpg",
  "photo_2026-04-20_17-45-31.jpg",
  "photo_2026-04-20_17-45-34.jpg",
  "photo_2026-04-20_17-45-36.jpg",
  "photo_2026-04-20_17-45-40.jpg",
  "photo_2026-04-20_17-45-42.jpg",
  "photo_2026-04-20_17-45-45.jpg",
  "photo_2026-04-20_17-45-47.jpg",
  "photo_2026-04-20_17-45-57.jpg",
  "photo_2026-04-20_17-46-00.jpg",
  "photo_2026-04-20_17-46-02.jpg",
  "photo_2026-04-20_17-46-05.jpg",
  "photo_2026-04-20_17-46-10.jpg",
  "photo_2026-04-20_17-46-13.jpg",
  "photo_2026-04-20_17-46-15.jpg",
  "photo_2026-04-20_17-46-17.jpg",
  "photo_2026-04-20_17-46-19.jpg"
];

const videos = [
  "video_2026-04-20_17-43-05.mp4",
  "video_2026-04-20_17-43-09.mp4",
  "video_2026-04-20_17-43-12.mp4",
  "video_2026-04-20_17-43-15.mp4",
  "video_2026-04-20_17-43-18.mp4",
  "video_2026-04-20_17-43-20.mp4",
  "video_2026-04-20_17-43-23.mp4",
  "video_2026-04-20_17-43-43.mp4",
  "video_2026-04-20_17-43-46.mp4",
  "video_2026-04-20_17-43-50.mp4",
  "video_2026-04-20_17-43-58.mp4",
  "video_2026-04-20_17-44-00.mp4",
  "video_2026-04-20_17-44-02.mp4",
  "video_2026-04-20_17-44-10.mp4",
  "video_2026-04-20_17-44-38.mp4",
  "video_2026-04-20_17-45-50.mp4",
  "video_2026-04-20_17-45-53.mp4",
  "video_2026-04-20_17-45-55.mp4",
  "video_2026-04-20_17-46-08.mp4",
  "video_2026-04-20_17-46-23.mp4",
  "video_2026-04-20_17-46-28.mp4",
  "video_2026-04-20_17-46-31.mp4"
];

const media = [
  ...photos.map((name) => ({ type: "photo", name, src: `Assets/${name}` })),
  ...videos.map((name) => ({ type: "video", name, src: `Assets/${name}` }))
];

const galleryGrid = document.getElementById("galleryGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("closeLightbox");
const prevItem = document.getElementById("prevItem");
const nextItem = document.getElementById("nextItem");

let currentFilter = "all";
let currentList = [...media];
let currentIndex = 0;

function displayName(filename) {
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function renderCards(list) {
  galleryGrid.innerHTML = "";

  list.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.index = String(index);

    const mediaElement =
      item.type === "photo"
        ? `<img class="card-media" src="${item.src}" alt="${displayName(item.name)}" loading="lazy" />`
        : `<video class="card-media" src="${item.src}" muted playsinline preload="metadata"></video>`;

    card.innerHTML = `
      <span class="card-tag">${item.type}</span>
      ${mediaElement}
      <p class="card-name" title="${displayName(item.name)}">${displayName(item.name)}</p>
    `;

    card.addEventListener("click", () => openLightbox(index));
    galleryGrid.appendChild(card);
  });
}

function applyFilter(filter) {
  currentFilter = filter;
  currentList =
    filter === "all" ? [...media] : media.filter((item) => item.type === filter);
  renderCards(currentList);
}

function openLightbox(index) {
  currentIndex = index;
  const item = currentList[index];

  lightboxContent.innerHTML =
    item.type === "photo"
      ? `<img src="${item.src}" alt="${displayName(item.name)}" />`
      : `<video src="${item.src}" controls autoplay playsinline></video>`;

  lightboxCaption.textContent = displayName(item.name);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeViewer() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxContent.innerHTML = "";
  document.body.style.overflow = "";
}

function changeItem(direction) {
  if (!currentList.length) {
    return;
  }
  currentIndex = (currentIndex + direction + currentList.length) % currentList.length;
  openLightbox(currentIndex);
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    applyFilter(btn.dataset.filter);
  });
});

closeLightbox.addEventListener("click", closeViewer);
prevItem.addEventListener("click", () => changeItem(-1));
nextItem.addEventListener("click", () => changeItem(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeViewer();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) {
    return;
  }
  if (event.key === "Escape") {
    closeViewer();
  }
  if (event.key === "ArrowLeft") {
    changeItem(-1);
  }
  if (event.key === "ArrowRight") {
    changeItem(1);
  }
});

renderCards(media);
