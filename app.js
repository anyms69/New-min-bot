const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll("#nav button");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(btn.dataset.page).classList.add("active");
  });
});

const tours = [
  {
    title: "Каппадокия",
    price: "120 €",
    img: "https://images.unsplash.com/photo-1526481280691-3d0f3a1a1b1b"
  },
  {
    title: "Рафтинг",
    price: "35 €",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  }
];

const cars = [
  {
    title: "Fiat Egea",
    price: "45 € / день",
    img: "https://images.unsplash.com/photo-1549924231-f129b911e442"
  }
];

function render(data, id) {
  const el = document.getElementById(id);
  el.innerHTML = "";
  data.forEach(e => {
    el.innerHTML += `
      <div class="card">
        <img src="${e.img}">
        <div class="card-body">
          <h3>${e.title}</h3>
          <p>${e.price}</p>
        </div>
      </div>
    `;
  });
}

render(tours, "tours");
render(cars, "cars");
navButtons[0].click();
