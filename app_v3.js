const pages = document.querySelectorAll(".page");
const buttons = document.querySelectorAll("#nav button");

buttons.forEach(function(btn) {
  btn.addEventListener("click", function() {
    buttons.forEach(function(b) { b.classList.remove("active"); });
    btn.classList.add("active");

    pages.forEach(function(p) { p.classList.remove("active"); });
    document.getElementById(btn.dataset.page).classList.add("active");
  });
});

// Реальные экскурсии по Анталии
const tours = [
  {
    title: "Античный город Перге",
    price: "20 €",
    img: "https://images.unsplash.com/photo-1586023492126-4b4b91c76f69"
  },
  {
    title: "Водопады Дюден",
    price: "15 €",
    img: "https://images.unsplash.com/photo-1575202450980-4624c51b5b0c"
  },
  {
    title: "Каньон Гёйнюк",
    price: "35 €",
    img: "https://images.unsplash.com/photo-1612392061835-0dc7fcf34129"
  },
  {
    title: "Старый город Калейчи",
    price: "Бесплатно",
    img: "https://images.unsplash.com/photo-1582906670580-2ff56cf6ab6d"
  },
  {
    title: "Аквариум Анталии",
    price: "12 €",
    img: "https://images.unsplash.com/photo-1562458243-6f130e7038d2"
  },
  {
    title: "Пляж Коньяалты",
    price: "Бесплатно",
    img: "https://images.unsplash.com/photo-1591252054384-7c5ec2a4ff7e"
  },
  {
    title: "Римский амфитеатр Аспендоса",
    price: "25 €",
    img: "https://images.unsplash.com/photo-1602821549637-bd6f5c6cd8c6"
  },
  {
    title: "Поездка в Кемер",
    price: "40 €",
    img: "https://images.unsplash.com/photo-1601758123927-bf322b36b36c"
  },
  {
    title: "Термальные источники Памуккале",
    price: "60 €",
    img: "https://images.unsplash.com/photo-1611623449651-2e2c1a8c4730"
  },
  {
    title: "Рафтинг на реке Манавгат",
    price: "30 €",
    img: "https://images.unsplash.com/photo-1588511725787-798d8a6b3c37"
  }
];

const cars = [
  {
    title: "Fiat Egea",
    price: "45 € / день",
    img: "https://images.unsplash.com/photo-1549924231-f129b911e442"
  },
  {
    title: "Renault Clio",
    price: "50 € / день",
    img: "https://images.unsplash.com/photo-1611844241345-191a2a1b13e2"
  }
];

// Функция рендера карточек
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

// Рендерим сразу обе секции
render(tours, "tours");
render(cars, "cars");
