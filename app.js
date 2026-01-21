const cards = document.getElementById("cards");
const search = document.getElementById("search");
const filterBtns = document.querySelectorAll(".filters button");

const data = [
  {
    title: "Ночной хребург",
    city: "СПБ",
    category: "ночная",
    price: 1900,
    duration: "3 часа",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb",
    available: true
  },
  {
    title: "Музеи Москвы",
    city: "Москва",
    category: "музейная",
    price: 2100,
    duration: "2 часа",
    image: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8",
    available: false
  },
  {
    title: "Центр Казани",
    city: "Казань",
    category: "пешая",
    price: 1500,
    duration: "2 часа",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
    available: true
  }
];

let currentFilter = "all";

function render(list) {
  cards.innerHTML = "";
  list.forEach(e => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${e.image}">
      <div class="card-body">
        <h3>${e.title}</h3>
        <div class="meta">${e.city} · ${e.duration}</div>
        <div class="price">${e.price} ₽</div>
        <button ${!e.available ? "disabled" : ""}>
          ${e.available ? "Забронировать" : "Нет мест"}
        </button>
      </div>
    `;
    cards.appendChild(div);
  });
}

filterBtns.forEach(btn => {
  btn.onclick = () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.type;
    update();
  };
});

search.oninput = update;

function update() {
  const q = search.value.toLowerCase();
  render(data.filter(e =>
    (currentFilter === "all" || e.category === currentFilter) &&
    e.title.toLowerCase().includes(q)
  ));
}

update();
