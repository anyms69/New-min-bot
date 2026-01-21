
// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация навигации
    initNavigation();
    
    // Загрузка туров
    loadTours();
    
    // Инициализация фильтров
    initFilters();
    
    // Инициализация формы
    initForm();
    
    // Инициализация модального окна
    initModal();
    
    // Инициализация мобильного меню
    initMobileMenu();
});

// Навигация по страницам
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем active класс у всех ссылок
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Добавляем active класс текущей ссылке
            this.classList.add('active');
            
            // Получаем ID целевой секции
            const targetId = this.getAttribute('href').substring(1);
            
            // Скрываем все секции
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Показываем целевую секцию
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Прокрутка к началу секции
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // Закрываем мобильное меню если оно открыто
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
        });
    });
}

// Загрузка туров
function loadTours(filter = 'all') {
    const toursContainer = document.getElementById('tours-container');
    toursContainer.innerHTML = '';
    
    let filteredTours = toursData;
    
    if (filter !== 'all') {
        filteredTours = toursData.filter(tour => tour.region === filter);
    }
    
    if (filteredTours.length === 0) {
        toursContainer.innerHTML = `
            <div class="no-tours">
                <i class="fas fa-map-marked-alt"></i>
                <h3>Туры не найдены</h3>
                <p>Попробуйте выбрать другой регион</p>
            </div>
        `;
        return;
    }
    
    filteredTours.forEach(tour => {
        const tourCard = document.createElement('div');
        tourCard.className = 'tour-card';
        tourCard.innerHTML = `
            <div class="tour-image">
                <i class="fas fa-${tour.icon || 'mountain'}"></i>
                <h3>${tour.region}</h3>
            </div>
            <div class="tour-info">
                <h3 class="tour-title">${tour.name}</h3>
                <p class="tour-description">${tour.description}</p>
                <div class="tour-details">
                    <span><i class="fas fa-calendar"></i> ${tour.days} дней</span>
                    <span><i class="fas fa-users"></i> До ${tour.maxPeople} чел.</span>
                </div>
                <div class="tour-details">
                    <span><i class="fas fa-map-marker-alt"></i> ${tour.location}</span>
                    <span class="tour-price">${tour.price} ₽</span>
                </div>
                <button class="tour-button" data-id="${tour.id}">
                    <i class="fas fa-info-circle"></i> Подробнее
                </button>
            </div>
        `;
        
        toursContainer.appendChild(tourCard);
    });
    
    // Добавляем обработчики кнопок
    document.querySelectorAll('.tour-button').forEach(button => {
        button.addEventListener('click', function() {
            const tourId = this.getAttribute('data-id');
            showTourDetails(tourId);
        });
    });
}

// Инициализация фильтров
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем active класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем active класс текущей кнопке
            this.classList.add('active');
            
            // Загружаем туры с выбранным фильтром
            const filter = this.textContent.toLowerCase();
            let filterKey = 'all';
            
            if (filter === 'золотое кольцо') filterKey = 'golden_ring';
            else if (filter === 'кавказ') filterKey = 'caucasus';
            else if (filter === 'сибирь') filterKey = 'siberia';
            else if (filter === 'карелия') filterKey = 'karelia';
            
            loadTours(filterKey);
        });
    });
}

// Показать детали тура
function showTourDetails(tourId) {
    const tour = toursData.find(t => t.id == tourId);
    if (!tour) return;
    
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <h2>${tour.name}</h2>
        <div class="tour-modal-info">
            <div class="tour-modal-image">
                <i class="fas fa-${tour.icon || 'mountain'}"></i>
                <h3>${tour.region}</h3>
            </div>
            <div class="tour-modal-details">
                <p><strong>Описание:</strong> ${tour.fullDescription || tour.description}</p>
                <p><strong>Локация:</strong> ${tour.location}</p>
                <p><strong>Длительность:</strong> ${tour.days} дней</p>
                <p><strong>Группа:</strong> ${tour.minPeople || 2}-${tour.maxPeople} человек</p>
                <p><strong>Сложность:</strong> ${tour.difficulty || 'Средняя'}</p>
                <p><strong>Лучший сезон:</strong> ${tour.season || 'Круглый год'}</p>
                
                <div class="tour-includes">
                    <h4>Включено:</h4>
                    <ul>
                        ${tour.includes ? tour.includes.map(item => `<li>${item}</li>`).join('') : 
                        '<li>Проживание</li><li>Питание</li><li>Транспорт</li><li>Гид</li>'}
                    </ul>
                </div>
                
                <div class="tour-price-section">
                    <h3>Цена: ${tour.price} ₽</h3>
                    <button class="book-button"><i class="fas fa-shopping-cart"></i> Забронировать</button>
                </div>
            </div>
        </div>
    `;
    
    // Показываем модальное окно
    const modal = document.getElementById('tour-modal');
    modal.style.display = 'flex';
    
    // Добавляем обработчик кнопки бронирования
    const bookButton = modalContent.querySelector('.book-button');
    if (bookButton) {
        bookButton.addEventListener('click', function() {
            alert('Функция бронирования будет добавлена позже!');
        });
    }
}

// Инициализация модального окна
function initModal() {
    const modal = document.getElementById('tour-modal');
    const closeModal = document.querySelector('.close-modal');
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Инициализация формы
function initForm() {
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('success-msg');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь должна быть отправка на сервер
            // Для демо просто показываем сообщение об успехе
            
            successMsg.style.display = 'flex';
            
            // Скрываем сообщение через 3 секунды
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
            
            // Очищаем форму
            contactForm.reset();
        });
    }
    
    // Кнопка добавления тура
    const addTourBtn = document.getElementById('add-tour-btn');
    if (addTourBtn) {
        addTourBtn.addEventListener('click', function() {
            alert('Функция добавления тура будет доступна после подключения таблицы!');
        });
    }
}

// Инициализация мобильного меню
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Кнопки входа/регистрации
document.querySelector('.btn-login')?.addEventListener('click', function() {
    alert('Форма входа будет добавлена позже!');
});

document.querySelector('.btn-register')?.addEventListener('click', function() {
    alert('Форма регистрации будет добавлена позже!');
});