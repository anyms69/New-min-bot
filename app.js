const container = document.getElementById('cards-container');
const filterButtons = document.querySelectorAll('.filter-btn');

const data = [
  {
    title: "Обзорная экскурсия",
    description: "Пешая экскурсия по центру города.",
    price: 1500,
    duration: "2 часа",
    category: "пешая",
    city: "Москва",
    language: "RU",
    images: [
      "https://images.unsplash.com/photo-1578693674148-37dcaa3546f8?crop=entropy&cs=tinysrgb&fit=max&h=200",
      "https://images.unsplash.com/photo-1581091012184-168d9bc39a6c?crop=entropy&cs=tinysrgb&fit=max&h=200"
    ],
    weekdays: ["Mon","Wed","Fri"],
    max_participants: 20,
    available: true,
    booking_link: "https://example.com/booking1",
    active: true
  },
  {
    title: "Ночная экскурсия",
    description: "Город вечером, огни и легенды.",
    price: 2000,
    duration: "3 часа",
    category: "ночная",
    city: "Москва",
    language: "RU",
    images: [
      "https://images.unsplash.com/photo-1506349680387-930e372f9a52?crop=entropy&cs=tinysrgb&fit=max&h=200",
      "https://images.unsplash.com/photo-1509403271361-6b8a29fba5cf?crop=entropy&cs=tinysrgb&fit=max&h=200"
    ],
    weekdays: ["Fri","Sat"],
    max_participants: 15,
    available: true,
    booking_link: "https://example.com/booking2",
    active: true
  }
];

function buildCards(excurisons) {
  container.innerHTML = '';
  excurisons.forEach(exc => {
    if (!exc.active) return;
    const card = document.createElement('div'); card.className='card';

    const h2=document.createElement('h2'); h2.textContent=exc.title; card.appendChild(h2);
    const desc=document.createElement('p'); desc.className='description'; desc.textContent=exc.description; card.appendChild(desc);
    const price=document.createElement('p'); price.className='price'; price.textContent=`${exc.price} ₽`; card.appendChild(price);
    const duration=document.createElement('p'); duration.className='duration'; duration.textContent=exc.duration; card.appendChild(duration);

    const gallery=document.createElement('div'); gallery.className='gallery'; exc.images.forEach(src=>{const img=document.createElement('img'); img.src=src; gallery.appendChild(img);}); card.appendChild(gallery);

    const days=document.createElement('div'); days.className='weekdays'; exc.weekdays.forEach(d=>{const span=document.createElement('span'); span.className='weekday-badge'; span.textContent=d; days.appendChild(span);}); card.appendChild(days);

    const avail=document.createElement('p'); avail.className='availability '+(exc.available?'available':'unavailable'); avail.textContent=exc.available?`Остаток мест: ${exc.max_participants}`:'Мест нет'; card.appendChild(avail);

    const btn=document.createElement('button'); btn.className='book-btn'; btn.textContent='Забронировать'; if(!exc.available) btn.disabled=true; btn.onclick=()=>window.open(exc.booking_link,'_blank'); card.appendChild(btn);

    container.appendChild(card);
  });
}

filterButtons.forEach(btn=>{btn.addEventListener('click',()=>{filterButtons.forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const type=btn.dataset.type; if(type==='all') buildCards(data); else buildCards(data.filter(exc=>exc.category===type));});});

buildCards(data);

