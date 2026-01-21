// Основной файл приложения
class TourApp {
    constructor() {
        this.currentView = 'grid';
        this.currentSort = 'popular';
        this.currentFilter = 'all';
        this.displayedTours = 9;
        
        this.init();
    }

    init() {
        // Инициализация компонентов
        this.initPreloader();
        this.initNavigation();
        this.initThemeToggle();
        this.initSearch();
        this.initTours();
        this.initRegions();
        this.initModal();
        this.initForm();
        this.initVideoModal();
        this.initSwiper();
        this.initMobileMenu();
        
        // События
        this.bindEvents();
        
        console.log('Tour App инициализирован');
    }

    initPreloader() {
        // Скрываем прелоадер через 1.5 секунды
        setTimeout(() => {
            document.querySelector('.preloader').classList.add('hidden');
            
            // Удаляем прелоадер из DOM через анимацию
            setTimeout(() => {
                document.querySelector('.preloader').remove();
            }, 500);
        }, 1500);
    }

    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Удаляем активный класс у всех ссылок
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Добавляем активный класс текущей ссылке
                link.classList.add('active');
                
                // Получаем ID целевой секции
                const targetId = link.getAttribute('href').substring(1);
                
                // Скрываем все секции
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Показываем целевую секцию
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    
                    // Плавная прокрутка к началу секции
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                
                // Закрываем мобильное меню
                this.closeMobileMenu();
            });
        });
    }

    initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark-mode');
            
            // Сохраняем настройку в localStorage
            const isDark = html.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
        
        // Восстанавливаем тему из localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            html.classList.add('dark-mode');
        }
    }

    initSearch() {
        const searchToggle = document.getElementById('searchToggle');
        const searchModal = document.querySelector('.search-modal');
        const closeSearch = document.querySelector('.close-search');
        const globalSearch = document.getElementById('globalSearch');
        const budgetSlider = document.querySelector('.budget-slider');
        const budgetValue = document.querySelector('.budget-value');
        
        // Открытие/закрытие поиска
        searchToggle.addEventListener('click', () => {
            searchModal.classList.add('active');
            globalSearch.focus();
        });
        
        closeSearch.addEventListener('click', () => {
            searchModal.classList.remove('active');
        });
        
        // Закрытие по клику вне модального окна
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
            }
        });
        
        // Обновление значения бюджета
        budgetSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            budgetValue.textContent = `до ${value.toLocaleString('ru-RU')} ₽`;
        });
        
        // Поиск туров
        globalSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.filterTours(searchTerm);
        });
    }

    initTours() {
        this.renderTours();
        this.initViewControls();
        this.initSortControls();
        this.initLoadMore();
    }

    renderTours() {
        const container = document.getElementById('toursContainer');
        const tours = this.getFilteredTours();
        
        // Очищаем контейнер
        container.innerHTML = '';
        
        // Отображаем туры (ограничиваем количество)
        const toursToShow = tours.slice(0, this.displayedTours);
        
        if (toursToShow.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>Туры не найдены</h3>
                    <p>Попробуйте изменить параметры поиска</p>
                </div>
            `;
            return;
        }
        
        toursToShow.forEach(tour => {
            const tourCard = this.createTourCard(tour);
            container.appendChild(tourCard);
        });
        
        // Обновляем кнопку "Показать еще"
        this.updateLoadMoreButton(tours.length);
    }

    createTourCard(tour) {
        const card = document.createElement('div');
        card.className = `tour-card ${this.currentView === 'list' ? 'list-view' : ''}`;
        card.innerHTML = `
            <div class="tour-image" style="background: linear-gradient(135deg, ${getRegionColor(tour.region)}, color-mix(in srgb, ${getRegionColor(tour.region)} 50%, white))">
                <i class="${getRegionIcon(tour.region)}"></i>
                ${tour.featured ? '<span class="tour-badge">Хит</span>' : ''}
            </div>
            <div class="tour-content">
                <div class="tour-header">
                    <div>
                        <h3 class="tour-title">${tour.name}</h3>
                        <div class="tour-rating">
                            <i class="fas fa-star"></i>
                            <span>${tour.rating}</span>
                        </div>
                    </div>
                </div>
                <p class="tour-description">${tour.description}</p>
                <div class="tour-meta">
                    <div class="meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${tour.days} дней</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${tour.location}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-signal"></i>
                        <span>${difficulties[tour.difficulty].label}</span>
                    </div>
                </div>
                <div class="tour-footer">
                    <div class="tour-price">
                        <span class="price-from">от</span>
                        ${tour.price} ₽
                    </div>
                    <button class="btn-book" data-id="${tour.id}">
                        <i class="fas fa-info-circle"></i>
                        Подробнее
                    </button>
                </div>
            </div>
        `;
        
        // Добавляем обработчик для кнопки "Подробнее"
        const bookBtn = card.querySelector('.btn-book');
        bookBtn.addEventListener('click', () => {
            this.showTourDetails(tour.id);
        });
        
        return card;
    }

    initViewControls() {
        const viewBtns = document.querySelectorAll('.view-btn');
        const toursContainer = document.getElementById('toursContainer');
        
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Удаляем активный класс у всех кнопок
                viewBtns.forEach(b => b.classList.remove('active'));
                
                // Добавляем активный класс текущей кнопке
                btn.classList.add('active');
                
                // Обновляем вид
                this.currentView = btn.getAttribute('data-view');
                toursContainer.className = `tours-container ${this.currentView}-view`;
                
                // Перерисовываем туры
                this.renderTours();
            });
        });
    }

    initSortControls() {
        const sortSelect = document.getElementById('sortTours');
        
        sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderTours();
        });
    }

    initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMore');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.displayedTours += 6;
                this.renderTours();
            });
        }
    }

    updateLoadMoreButton(totalTours) {
        const loadMoreBtn = document.getElementById('loadMore');
        
        if (!loadMoreBtn) return;
        
        if (this.displayedTours >= totalTours) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'flex';
        }
    }

    getFilteredTours() {
        let filteredTours = [...toursData];
        
        // Фильтрация по региону
        if (this.currentFilter !== 'all') {
            filteredTours = filteredTours.filter(tour => tour.region === this.currentFilter);
        }
        
        // Сортировка
        switch (this.currentSort) {
            case 'price_asc':
                filteredTours.sort((a, b) => this.parsePrice(a.price) - this.parsePrice(b.price));
                break;
            case 'price_desc':
                filteredTours.sort((a, b) => this.parsePrice(b.price) - this.parsePrice(a.price));
                break;
            case 'duration':
                filteredTours.sort((a, b) => a.days - b.days);
                break;
            case 'popular':
            default:
                filteredTours.sort((a, b) => b.rating - a.rating);
        }
        
        return filteredTours;
    }

    parsePrice(priceString) {
        return parseInt(priceString.replace(/\s/g, ''));
    }

    filterTours(searchTerm) {
        const tours = toursData.filter(tour => {
            const searchFields = [
                tour.name,
                tour.description,
                tour.location,
                tour.region
            ].join(' ').toLowerCase();
            
            return searchFields.includes(searchTerm);
        });
        
        // Временно отображаем результаты
        const container = document.getElementById('toursContainer');
        container.innerHTML = '';
        
        if (tours.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>По запросу "${searchTerm}" ничего не найдено</h3>
                    <p>Попробуйте другой запрос</p>
                </div>
            `;
            return;
        }
        
        tours.slice(0, 6).forEach(tour => {
            const tourCard = this.createTourCard(tour);
            container.appendChild(tourCard);
        });
    }

    initRegions() {
        this.renderRegions();
        this.initRegionMap();
    }

    renderRegions() {
        const container = document.getElementById('regionsGrid');
        container.innerHTML = '';
        
        regionsData.forEach(region => {
            const regionCard = document.createElement('div');
            regionCard.className = 'region-card';
            regionCard.innerHTML = `
                <div class="region-image" style="background: linear-gradient(135deg, ${region.color}, color-mix(in srgb, ${region.color} 50%, white))">
                    <i class="${getRegionIcon(region.id)}"></i>
                </div>
                <div class="region-content">
                    <h3>${region.name}</h3>
                    <p class="region-count">${region.tourCount} туров</p>
                    <p>${region.description}</p>
                    <button class="btn-region" data-region="${region.id}">
                        Смотреть туры
                    </button>
                </div>
            `;
            
            // Добавляем обработчик для кнопки
            const btn = regionCard.querySelector('.btn-region');
            btn.addEventListener('click', () => {
                this.filterByRegion(region.id);
                
                // Переходим в раздел туров
                document.querySelector('[href="#tours"]').click();
            });
            
            container.appendChild(regionCard);
        });
    }

    initRegionMap() {
        const regionPoints = document.querySelectorAll('.region-point');
        
        regionPoints.forEach(point => {
            point.addEventListener('click', () => {
                const regionId = point.getAttribute('data-region');
                this.filterByRegion(regionId);
                document.querySelector('[href="#tours"]').click();
            });
        });
    }

    filterByRegion(regionId) {
        this.currentFilter = regionId;
        this.displayedTours = 9;
        this.renderTours();
    }

    initModal() {
        this.tourModal = document.getElementById('tourModal');
        this.modalContent = document.getElementById('tourModalContent');
        const closeBtn = this.tourModal.querySelector('.modal-close');
        
        // Закрытие модального окна
        closeBtn.addEventListener('click', () => {
            this.tourModal.classList.remove('active');
        });
        
        // Закрытие по клику вне окна
        this.tourModal.addEventListener('click', (e) => {
            if (e.target === this.tourModal) {
                this.tourModal.classList.remove('active');
            }
        });
    }

    showTourDetails(tourId) {
        const tour = toursData.find(t => t.id === tourId);
        
        if (!tour) return;
        
        // Заполняем содержимое модального окна
        this.modalContent.innerHTML = `
            <div class="tour-modal">
                <div class="tour-modal-header">
                    <div class="tour-modal-image" style="background: linear-gradient(135deg, ${getRegionColor(tour.region)}, color-mix(in srgb, ${getRegionColor(tour.region)} 50%, white))">
                        <i class="${getRegionIcon(tour.region)}"></i>
                    </div>
                    <div class="tour-modal-info">
                        <h2>${tour.name}</h2>
                        <div class="tour-modal-meta">
                            <span class="tour-rating">
                                <i class="fas fa-star"></i>
                                ${tour.rating}
                            </span>
                            <span class="tour-difficulty" style="color: ${difficulties[tour.difficulty].color}">
                                <i class="fas fa-signal"></i>
                                ${difficulties[tour.difficulty].label}
                            </span>
                            <span class="tour-duration">
                                <i class="fas fa-calendar"></i>
                                ${tour.days} дней
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="tour-modal-body">
                    <div class="tour-description-full">
                        <h3>Описание тура</h3>
                        <p>${tour.fullDescription || tour.description}</p>
                    </div>
                    
                    <div class="tour-details-grid">
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Место проведения</h4>
                                <p>${tour.location}</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <div>
                                <h4>Группа</h4>
                                <p>${tour.minPeople || 2}-${tour.maxPeople} человек</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-calendar-alt"></i>
                            <div>
                                <h4>Сезон</h4>
                                <p>${tour.season || 'Круглый год'}</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-wallet"></i>
                            <div>
                                <h4>Цена</h4>
                                <p class="tour-price-large">${tour.price} ₽</p>
                            </div>
                        </div>
                    </div>
                    
                    ${tour.highlights ? `
                    <div class="tour-highlights">
                        <h3>Основные моменты</h3>
                        <ul>
                            ${tour.highlights.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${tour.includes ? `
                    <div class="tour-includes">
                        <h3>Что включено</h3>
                        <ul>
                            ${tour.includes.map(i => `<li>${i}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    <div class="tour-modal-actions">
                        <button class="btn-primary btn-book-now">
                            <i class="fas fa-shopping-cart"></i>
                            Забронировать сейчас
                        </button>
                        <button class="btn-secondary btn-consult">
                            <i class="fas fa-comment-alt"></i>
                            Бесплатная консультация
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Добавляем обработчики для кнопок
        const bookBtn = this.modalContent.querySelector('.btn-book-now');
        const consultBtn = this.modalContent.querySelector('.btn-consult');
        
        bookBtn?.addEventListener('click', () => {
            alert('Функция бронирования будет подключена позже!');
        });
        
        consultBtn?.addEventListener('click', () => {
            document.querySelector('[href="#contacts"]').click();
        });
        
        // Показываем модальное окно
        this.tourModal.classList.add('active');
    }

    initForm() {
        const contactForm = document.getElementById('contactForm');
        const notification = document.getElementById('successNotification');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.pre