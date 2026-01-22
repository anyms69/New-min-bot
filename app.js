const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".bottom-nav button");

navButtons.forEach(btn => {
  btn.onclick = () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(btn.dataset.page).classList.add("active");
  };
});

const tours = [
  {
    title: "Каппадокия на 2 дня",
    image: "https://images.unsplash.com/photo-1526481280691-3d0f3a1a1b1b",
    price: "120 €",
    badges: ["🔥 Хит", "🚌 Трансфер"],
    description: "Полет на шарах, подземные города, каньоны."
  },
  {
    title: "Рафтинг + Каньон",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    price: "35 €",
    badges: ["💦 Актив", "🍴 Обед"],
    description: "Адреналин и природа Таврских гор."
  },
  {
    title: "Дайвинг в Анталии",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: "40 €",
    badges: ["🤿 Море"],
    description: "Два погружения, инструктор, оборудование."
  }
];

const cars = [
  {
    title: "Fiat Egea",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
    price: "45 € / день",
    badges: ["🚗 Автомат", "❄️ Кондиционер"]
  },
  {
    title: "BMW 3 Series",
    image: "https://images.unsplash.com/photo-1549921296-3c7d5f5c77c4",
    price: "95 € / день",
    badges: ["✨ Премиум"]
  }
];

function renderCards(data, container) {
  container.innerHTML = "";
  data.forEach(e => {
    const div = document.createElement("div");
    div.className = "card glass";
    div.innerHTML = `
      <img src="${e.image}">
      <div class="card-body">
        <h3>${e.title}</h3>
        <div class="badges">${e.badges.map(b=>`<span>${b}</span>`).join("")}</div>
        <p>${e.description || ""}</p>
        <div class="price">${e.price}</div>
        <button class="action">Забронировать</button>
      </div>
    `;
    container.appendChild(div);
  });
}

renderCards(tours, document.getElementById("tours"));
renderCards(cars, document.getElementById("cars"));
