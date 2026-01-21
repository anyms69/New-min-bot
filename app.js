const container = document.getElementById('cards-container');

// Пример данных JSON
const data = [
  {
    "title": "Обзорная экскурсия",
    "description": "Пешая экскурсия по центру",
    "price": 1500,
    "duration": "2 часа",
    "category": "пешая",
    "city": "Москва",
    "language": "RU",
    "images": ["https://.../city1.jpg","https://.../city2.jpg"],
    "weekdays": ["Mon","Wed","Fri"],
    "max_participants": 20,
    "available": true,
    "booking_link": "https://booking1.com",
    "active": true
  }
  // Добавить остальные экскурсии
];

function buildCards(excurisons) {
  container.innerHTML = '';
  excurisons.forEach(exc => {
    if (!exc.active) return;

    const card = document.createElement('div');
    card.className = 'card';

    // Заголовок
    const h2 = document.createElement('h2');
    h2.textContent = exc.title;
    card.appendChild(h2);

    // Описание
    const desc = document.createElement('p');
    desc.className = 'description';
    desc.textContent = exc.description;
    card.appendChild(desc);

    // Цена и длительность
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `${exc.price} ₽`;
    card.appendChild(price);

    const duration = document.createElement('p');
    duration.className = 'duration';
    duration.textContent = exc.duration;
    card.appendChild(duration);

    // Галерея
    const gallery = document.createElement('div');
    gallery.className = 'gallery';
    exc.images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      gallery.appendChild(img);
    });
    card.appendChild(gallery);

    // Доступные дни
    const days = document.createElement('div');
    days.className = 'weekdays';
    exc.weekdays.forEach(d => {
      const span = document.createElement('span');
      span.className = 'weekday-badge';
      span.textContent = d;
      days.appendChild(span);
    });
    card.appendChild(days);

    // Остаток мест
    const avail = document.createElement('p');
    avail.className = 'availability ' + (exc.available ? 'available' : 'unavailable');
    avail.textContent = exc.available ? `Остаток мест: ${exc.max_participants}` : 'Мест нет';
    card.appendChild(avail);

    // Кнопка бронирования
    const btn = document.createElement('button');
    btn.className = 'book-btn';
    btn.textContent = 'Забронировать';
    if (!exc.available) btn.disabled = true;
    btn.onclick = () => window.open(exc.booking_link, '_blank');
    card.appendChild(btn);

    container.appendChild(card);
  });
}

// Построение карточек
buildCards(data);
