const pages = document.querySelectorAll(".page");
const buttons = document.querySelectorAll("#nav button");

buttons.forEach(function(btn) {
  btn.addEventListener("click", function() {
    buttons.forEach(function(b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");

    pages.forEach(function(p) {
      p.classList.remove("active");
    });
    document.getElementById(btn.dataset.page).classList.add("active");
  });
});

const tours = [
  {
    title: "Каппадокия (2 дня)",
    price: "120 €",
    img: "https://images.unsplash.com/photo-1526481280691-3d0f3a1a1b1b"
  },
  {
    title: "Рафтинг + Каньон",
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

  data.forEach(function(item) {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = item.img;

    const body = document.createElement("div");
    body.className = "card-body";

    const h3 = document.createElement("h3");
    h3.textContent = item.title;

    const p = document.createElement("p");
    p.textContent = item.price;

    body.appendChild(h3);
    body.appendChild(p);

    card.appendChild(img);
    card.appendChild(body);

    el.appendChild(card);
  });
}

render(tours, "tours");
render(cars, "cars");
