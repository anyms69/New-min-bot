// Telegram Mini App для туров
class TourTelegramApp {
    constructor() {
        this.tg = window.Telegram?.WebApp;
        this.currentTab = 'homeTab';
        this.currentView = 'grid';
        this.currentCategory = 'all';
        this.displayedTours = 6;
        this.allTours = [];
        
        this.init();
    }
    
    init() {
        // Инициализация Telegram Web App
        if (this.tg) {
            this.tg.expand();
            this.tg.enableClosingConfirmation();
            this.tg.BackButton.onClick(() => this.goBack());
        }
        
        // Инициализация приложения
        this.loadData();
        this.bindEvents();
        this.initNavigation();
        this.showNotification('Приложение загружено!', 'success');
        
        console.log('Tour Telegram App инициализирован');
    }
    
    loadData() {
        // Используем данные из data.js
        this.allTours = window.toursData || [];
        this.renderFeaturedTours();
        this.renderAllTours();
    }
    
    bindEvents() {
        // Навигация
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = btn.dataset.tab;
                if (tab) {
                    this.switchTab(tab);
                    this.updateNavButtons(btn);
                }
            });
        });
        
        // Кнопка назад
        document.getElementById('backBtn').addEventListener('click', () => this.goBack());
        
        // Поиск
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.switchTab('searchTab');
            document.getElementById('searchInput').focus();
        });
        
        document.getElementById('closeSearch').addEventListener('click', () => {
            this.switchTab('homeTab');
        });
        
        // Меню
        document.getElementById('menuBtn').addEventListener('click', () => {
            this.openMenu();
        });
        
        document.getElementById('closeMenu').addEventListener('click', () => {
            this.closeMenu();
        });
        
        document.getElementById('menuOverlay').addEventListener('click', () => {
            this.closeMenu();
        });
        
        // Поиск в реальном времени
        const searchInput = document.getElementById('searchInput');
        const mainSearch = document.getElementById('mainSearch');
        
        searchInput.addEventListener('input', (e) => {
            this.searchTours(e.target.value);
        });
        
        mainSearch.addEventListener('input', (e) => {
            this.searchTours(e.target.value);
        });
        
        // Категории
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.filterToursByCategory();
            });
        });
        
        // Вид отображения
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (btn.classList.contains('active')) return;
                
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentView = btn.dataset.view;
                this.updateView();
            });
        });
        
        // Фильтры цены
        const priceSlider = document.getElementById('priceSlider');
        const currentPrice = document.getElementById('currentPrice');
        
        priceSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            currentPrice.textContent = value.toLocaleString('ru-RU');
            this.filterByPrice(value);
        });
        
        // Кнопка "Показать еще"
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.loadMoreTours();
        });
        
        // Кнопка "Все туры"
        document.getElementById('seeAllTours').addEventListener('click', () => {
            this.switchTab('filtersTab');
        });
        
        // Очистка поиска
        document.getElementById('clearSearch').addEventListener('click', () => {
            searchInput.value = '';
            this.searchTours('');
        });
    }
    
    initNavigation() {
        // Инициализация навигации
        this.updateNavButtons(document.querySelector('.nav-btn.active'));
    }
    
    switchTab(tabId) {
        // Скрыть все вкладки
        document.querySelectorAll('.tg-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Показать выбранную вкладку
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.classList.add('active');
            this.currentTab = tabId;
            
            // Показать/скрыть кнопку назад
            if (tabId === 'homeTab') {
                this.hideBackButton();
            } else {
                this.showBackButton();
            }
            
            // Обновить заголовок
            this.updateHeaderTitle(tabId);
        }
    }
    
    updateNavButtons(activeBtn) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
    
    updateHeaderTitle(tabId) {
        const titles = {
            'homeTab': 'Turista',
            'searchTab': 'Поиск',
            'filtersTab': 'Фильтры',
            'tourDetailTab': 'Тур'
        };
        
        const title = titles[tabId] || 'Turista';
        document.querySelector('.tg-header-title').innerHTML = `
            <div class="tg-logo">
                <i class="fas fa-mountain-sun"></i>
                <span>${title}</span>
            </div>
        `;
    }
    
    showBackButton() {
        document.getElementById('backBtn').style.display = 'flex';
        if (this.tg) {
            this.tg.BackButton.show();
        }
    }
    
    hideBackButton() {
        document.getElementById('backBtn').style.display = 'none';
        if (this.tg) {
            this.tg.BackButton.hide();
        }
    }
    
    goBack() {
        if (this.currentTab === 'tourDetailTab') {
            this.switchTab('homeTab');
        } else if (this.currentTab !== 'homeTab') {
            this.switchTab('homeTab');
        }
    }
    
    openMenu() {
        document.getElementById('quickMenu').classList.add('active');
    }
    
    closeMenu() {
        document.getElementById('quickMenu').classList.remove('active');
    }
    
    renderFeaturedTours() {
        const container = document.getElementById('featuredSlider');
        const featuredTours = this.allTours.filter(tour => tour.featured).slice(0, 5);
        
        container.innerHTML = featuredTours.map(tour => `
            <div class="featured-card" data-id="${tour.id}">
                <div class="featured-image" style="background: linear-gradient(135deg, ${this.getRegionColor(tour.region)}, ${this.getRegionColor(tour.region)}80)">
                    <i class="${this.getRegionIcon(tour.region)}"></i>
                    <div class="featured-badge">Хит</div>
                </div>
                <div class="featured-content">
                    <h3 class="featured-title">${tour.name}</h3>
                    <p class="featured-description">${tour.description}</p>
                    <div class="featured-meta">
                        <span><i class="fas fa-calendar"></i> ${tour.days} дней</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${tour.location}</span>
                    </div>
                    <div class="featured-footer">
                        <div class="featured-price">${tour.price} ₽</div>
                        <button class="featured-btn" data-id="${tour.id}">
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Добавляем обработчики для карточек
        container.querySelectorAll('.featured-card, .featured-btn').forEach(el => {
            el.addEventListener('click', (e) => {
                const tourId = e.currentTarget.dataset.id;
                this.showTourDetails(tourId);
            });
        });
    }
    
    renderAllTours() {
        const container = document.getElementById('toursGrid');
        const tours = this.getFilteredTours();
        
        if (tours.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>Туры не найдены</h3>
                    <p>Попробуйте изменить фильтры</p>
                </div>
            `;
            return;
        }
        
        const toursToShow = tours.slice(0, this.displayedTours);
        
        container.innerHTML = toursToShow.map(tour => `
            <div class="tour-card" data-id="${tour.id}">
                <div class="tour-image" style="background: linear-gradient(135deg, ${this.getRegionColor(tour.region)}, ${this.getRegionColor(tour.region)}80)">
                    <i class="${this.getRegionIcon(tour.region)}"></i>
                    ${tour.featured ? '<div class="tour-badge">Хит</div>' : ''}
                </div>
                <div class="tour-content">
                    <div class="tour-header">
                        <h3 class="tour-title">${tour.name}</h3>
                        <div class="tour-rating">
                            <i class="fas fa-star"></i>
                            <span>${tour.rating}</span>
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
                            <span>${this.getDifficultyLabel(tour.difficulty)}</span>
                        </div>
                    </div>
                    <div class="tour-footer">
                        <div class="tour-price">${tour.price} ₽</div>
                        <button class="tour-btn" data-id="${tour.id}">
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Добавляем обработчики
        container.querySelectorAll('.tour-card, .tour-btn').forEach(el => {
            el.addEventListener('click', (e) => {
                const tourId = e.currentTarget.dataset.id;
                this.showTourDetails(tourId);
            });
        });
        
        // Обновляем кнопку "Показать еще"
        this.updateLoadMoreButton(tours.length);
    }
    
    getFilteredTours() {
        let filtered = [...this.allTours];
        
        // Фильтрация по категории
        if (this.currentCategory !== 'all') {
            if (this.currentCategory === 'popular') {
                filtered = filtered.filter(tour => tour.featured);
            } else if (this.currentCategory === 'mountains') {
                filtered = filtered.filter(tour => 
                    tour.region === 'caucasus' || tour.name.toLowerCase().includes('гор')
                );
            } else {
                filtered = filtered.filter(tour => tour.region === this.currentCategory);
            }
        }
        
        return filtered;
    }
    
    filterToursByCategory() {
        this.displayedTours = 6;
        this.renderAllTours();
    }
    
    filterByPrice(maxPrice) {
        // Фильтрация по цене
        const numericPrice = parseInt(maxPrice);
        const filtered = this.allTours.filter(tour => {
            const price = parseInt(tour.price.replace(/\s/g, ''));
            return price <= numericPrice;
        });
        
        this.displayFilteredTours(filtered);
    }
    
    searchTours(query) {
        if (!query.trim()) {
            this.renderAllTours();
            return;
        }
        
        const searchTerm = query.toLowerCase();
        const filtered = this.allTours.filter(tour => {
            return tour.name.toLowerCase().includes(searchTerm) ||
                   tour.description.toLowerCase().includes(searchTerm) ||
                   tour.location.toLowerCase().includes(searchTerm) ||
                   tour.region.toLowerCase().includes(searchTerm);
        });
        
        this.displayFilteredTours(filtered, 'searchResults');
    }
    
    displayFilteredTours(tours, containerId = 'toursGrid') {
        const container = document.getElementById(containerId);
        
        if (tours.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>Ничего не найдено</h3>
                    <p>Попробуйте другой запрос</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = tours.map(tour => `
            <div class="tour-card" data-id="${tour.id}">
                <div class="tour-image" style="background: linear-gradient(135deg, ${this.getRegionColor(tour.region)}, ${this.getRegionColor(tour.region)}80)">
                    <i class="${this.getRegionIcon(tour.region)}"></i>
                    ${tour.featured ? '<div class="tour-badge">Хит</div>' : ''}
                </div>
                <div class="tour-content">
                    <h3 class="tour-title">${tour.name}</h3>
                    <p class="tour-description">${tour.description}</p>
                    <div class="tour-meta">
                        <span><i class="fas fa-calendar"></i> ${tour.days} дней</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${tour.location}</span>
                    </div>
                    <div class="tour-footer">
                        <div class="tour-price">${tour.price} ₽</div>
                        <button class="tour-btn" data-id="${tour.id}">
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Добавляем обработчики
        container.querySelectorAll('.tour-card, .tour-btn').forEach(el => {
            el.addEventListener('click', (e) => {
                const tourId = e.currentTarget.dataset.id;
                this.showTourDetails(tourId);
            });
        });
    }
    
    loadMoreTours() {
        this.displayedTours += 6;
        this.renderAllTours();
    }
    
    updateLoadMoreButton(totalTours) {
        const btn = document.getElementById('loadMoreBtn');
        if (this.displayedTours >= totalTours) {
            btn.style.display = 'none';
        } else {
            btn.style.display = 'flex';
        }
    }
    
    updateView() {
        const container = document.getElementById('toursGrid');
        container.className = `tg-tours-grid ${this.currentView}-view`;
    }
    
    showTourDetails(tourId) {
        const tour = this.allTours.find(t => t.id == tourId);
        if (!tour) return;
        
        // Заполняем модальное окно
        document.getElementById('modalTourName').textContent = tour.name;
        
        document.getElementById('modalTourContent').innerHTML = `
            <div class="tour-detail-info">
                <div class="tour-detail-image" style="background: linear-gradient(135deg, ${this.getRegionColor(tour.region)}, ${this.getRegionColor(tour.region)}80)">
                    <i class="${this.getRegionIcon(tour.region)}"></i>
                </div>
                <div class="tour-detail-content">
                    <div class="tour-detail-meta">
                        <p><strong>Регион:</strong> ${this.getRegionName(tour.region)}</p>
                        <p><strong>Длительность:</strong> ${tour.days} дней</p>
                        <p><strong>Сложность:</strong> ${this.getDifficultyLabel(tour.difficulty)}</p>
                        <p><strong>Лучший сезон:</strong> ${tour.season || 'Круглый год'}</p>
                        <p><strong>Группа:</strong> ${tour.minPeople || 2}-${tour.maxPeople} человек</p>
                    </div>
                    
                    <div class="tour-detail-description">
                        <h4>Описание</h4>
                        <p>${tour.fullDescription || tour.description}</p>
                    </div>
                    
                    ${tour.includes ? `
                    <div class="tour-detail-includes">
                        <h4>Включено в стоимость:</h4>
                        <ul>
                            ${tour.includes.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    <div class="tour-detail-price">
                        <h4>Стоимость:</h4>
                        <div class="price-tag">${tour.price} ₽</div>
                    </div>
                </div>
            </div>
        `;
        
        // Показываем модальное окно
        document.getElementById('tourModal').classList.add('active');
        
        // Добавляем обработчики для кнопок модального окна
        document.getElementById('tourBook').onclick = () => {
            this.showNotification(`Тур "${tour.name}" добавлен в корзину!`, 'success');
            this.closeModal();
        };
        
        document.getElementById('tourConsult').onclick = () => {
            this.showNotification('Запрос на консультацию отправлен!', 'success');
            this.closeModal();
        };
    }
    
    closeModal() {
        document.getElementById('tourModal').classList.remove('active');
    }
    
    // Вспомогательные методы
    getRegionColor(regionId) {
        const colors = {
            'golden_ring': '#f59e0b',
            'caucasus': '#10b981',
            'baikal': '#3b82f6',
            'kamchatka': '#ef4444',
            'karelia': '#8b5cf6',
            'altai': '#84cc16'
        };
        return colors[regionId] || '#6b7280';
    }
    
    getRegionIcon(regionId) {
        const icons = {
            'golden_ring': 'fas fa-church',
            'caucasus': 'fas fa-mountain',
            'baikal': 'fas fa-water',
            'kamchatka': 'fas fa-volcano',
            'karelia': 'fas fa-tree',
            'altai': 'fas fa-horse'
        };
        return icons[regionId] || 'fas fa-map-marker-alt';
    }
    
    getRegionName(regionId) {
        const names = {
            'golden_ring': 'Золотое кольцо',
            'caucasus': 'Кавказ',
            'baikal': 'Байкал',
            'kamchatka': 'Камчатка',
            'karelia': 'Карелия',
            'altai': 'Алтай'
        };
        return names[regionId] || regionId;
    }
    
    getDifficultyLabel(difficulty) {
        const labels = {
            'easy': 'Легкая',
            'medium': 'Средняя',
            'hard': 'Сложная'
        };
        return labels[difficulty] || difficulty;
    }
    
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const text = document.getElementById('notificationText');
        
        text.textContent = message;
        
        if (type === 'success') {
            notification.style.background = 'var(--tg-success)';
        } else if (type === 'error') {
            notification.style.background = 'var(--tg-danger)';
        }
        
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
    
    showLoading() {
        document.getElementById('loading').style.display = 'flex';
    }
    
    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, находимся ли мы в Telegram
    if (window.Telegram?.WebApp) {
        window.app = new TourTelegramApp();
    } else {
        // Режим отладки вне Telegram
        console.log('Запуск вне Telegram');
        window.app = new TourTelegramApp();
    }
});