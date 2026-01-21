// Основной файл приложения с современными функциями
class TuristaApp {
    constructor() {
        this.currentView = 'grid';
        this.currentFilter = 'all';
        this.currentSort = 'popular';
        this.displayedTours = 9;
        this.isLoading = false;
        
        this.init();
    }

    async init() {
        // Инициализация компонентов
        this.initLoading();
        this.initNavigation();
        this.initTheme();
        this.initSearch();
        this.initTours();
        this.initModal();
        this.initForm();
        this.initScroll();
        this.initMobileMenu();
        this.initParticles();
        this.initAnimations();
        this.initRotator();
        
        // Загрузка данных
        await this.loadData();
        
        console.log('Turista App инициализирован');
    }

    initLoading() {
        // Скрываем загрузку через 1.5 секунды
        setTimeout(() => {
            const loader = document.querySelector('.loading-screen');
            loader.classList.add('hidden');
            
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    }

    initNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Удаляем активный класс у всех элементов
                navItems.forEach(i => i.classList.remove('active'));
                
                // Добавляем активный класс текущему элементу
                item.classList.add('active');
                
                // Получаем целевой раздел
                const targetId = item.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Плавная прокрутка
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

    initTheme() {
        const themeSwitch = document.getElementById('themeSwitch');
        const html = document.documentElement;
        
        // Проверяем сохраненную тему
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            html.classList.add('dark');
            themeSwitch.checked = true;
        }
        
        themeSwitch.addEventListener('change', () => {
            html.classList.toggle('dark');
            const theme = html.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }

    initSearch() {
        const searchToggle = document.getElementById('searchToggle');
        const searchOverlay = document.getElementById('searchOverlay');
        const searchClose = document.getElementById('searchClose');
        const searchInput = document.getElementById('searchInput');
        const budgetSlider = document.getElementById('budgetSlider');
        const budgetValue = document.getElementById('budgetValue');
        
        // Открытие/закрытие поиска
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            searchInput.focus();
        });
        
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
        
        // Закрытие по клику вне окна
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });
        
        // Обновление значения бюджета
        budgetSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            budgetValue.textContent = `${value.toLocaleString('ru-RU')} ₽`;
        });
        
        // Поиск
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.searchTours(searchTerm);
        });
        
        // Предложения
        const suggestionTags = document.querySelectorAll('.suggestion-tag');
        suggestionTags.forEach(tag => {
            tag.addEventListener('click', () => {
                searchInput.value = tag.textContent;
                this.searchTours(tag.textContent);
            });
        });
    }

    async loadData() {
        try {
            // Загружаем туры
            this.renderTours();
            
            // Загружаем направления
            this.renderDestinations();
            
            // Анимируем счетчики
            this.animateCounters();
            
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    }

    renderTours() {
        const container = document.getElementById('toursGrid');
        const tours = this.getFilteredTours();
        
        container.innerHTML = '';
        
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
        card.className = `tour-card ${tour.featured ? 'featured' : ''}`;
        card.innerHTML = `
            <div class="tour-image" style="background: linear-gradient(135deg, ${this.getRegionColor(tour.region)}, ${this.getRegionColor(tour.region)}80)">
                <i class="${this.getRegionIcon(tour.region)}"></i>
                ${tour.featured ? '<div class="tour-badge">Хит сезона</div>' : ''}
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
                        <span>${this.getDifficultyLabel(tour.difficulty)}</span>
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
        
        const bookBtn = card.querySelector('.btn-book');
        bookBtn.addEventListener('click', () => {
            this.showTourDetails(tour.id);
        });
        
        return card;
    }

    getFilteredTours() {
        let filteredTours = [...window.toursData];
        
        // Фильтрация по региону
        if (this.currentFilter !== 'all') {
            filteredTours = filteredTours.filter(tour => tour.region === this.currentFilter);
        }
        
        // Сортировка
        filteredTours.sort((a, b) => {
            switch (this.currentSort) {
                case 'price_asc':
                    return this.parsePrice(a.price) - this.parsePrice(b.price);
                case 'price_desc':
                    return this.parsePrice(b.price) - this.parsePrice(a.price);
                case 'duration':
                    return a.days - b.days;
                case 'rating':
                    return b.rating - a.rating;
                case 'popular':
                default:
                    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating;
            }
        });
        
        return filteredTours;
    }

    parsePrice(priceString) {
        return parseInt(priceString.replace(/\s/g, ''));
    }

    getRegionColor(regionId) {
        const colors = {
            golden_ring: '#f59e0b',
            caucasus: '#10b981',
            baikal: '#3b82f6',
            kamchatka: '#ef4444',
            karelia: '#8b5cf6',
            altai: '#84cc16'
        };
        return colors[regionId] || '#6b7280';
    }

    getRegionIcon(regionId) {
        const icons = {
            golden_ring: 'fas fa-church',
            caucasus: 'fas fa-mountain',
            baikal: 'fas fa-water',
            kamchatka: 'fas fa-volcano',
            karelia: 'fas fa-tree',
            altai: 'fas fa-horse'
        };
        return icons[regionId] || 'fas fa-map-marker-alt';
    }

    getDifficultyLabel(difficulty) {
        const labels = {
            easy: 'Легкая',
            medium: 'Средняя',
            hard: 'Сложная'
        };
        return labels[difficulty] || difficulty;
    }

    searchTours(searchTerm) {
        // Реализация поиска
        console.log('Поиск:', searchTerm);
    }

    updateLoadMoreButton(totalTours) {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (!loadMoreBtn) return;
        
        if (this.displayedTours >= totalTours) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'flex';
        }
    }

    renderDestinations() {
        // Реализация отображения направлений
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            setTimeout(() => {
                updateCounter();
            }, 500);
        });
    }

    initModal() {
        // Реализация модальных окон
    }

    initForm() {
        const contactForm = document.getElementById('contactForm');
        const notification = document.getElementById('notification');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Показываем уведомление
                notification.style.display = 'flex';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000);
                
                // Очищаем форму
                contactForm.reset();
            });
        }
    }

    initScroll() {
        const backToTop = document.getElementById('backToTop');
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                backToTop.classList.add('visible');
                header.classList.add('scrolled');
            } else {
                backToTop.classList.remove('visible');
                header.classList.remove('scrolled');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    initMobileMenu() {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.querySelector('.nav-menu');
        
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    closeMobileMenu() {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.querySelector('.nav-menu');
        
        mobileToggle?.classList.remove('active');
        navMenu.style.display = 'none';
    }

    initParticles() {
        // Простая реализация частиц
        const particles = document.getElementById('particles');
        if (!particles) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.1})`;
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            
            particles.appendChild(particle);
        }
    }

    initAnimations() {
        // Анимации при скролле
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Наблюдаем за элементами
        document.querySelectorAll('.feature-card, .tour-card').forEach(el => {
            observer.observe(el);
        });
    }

    initRotator() {
        const rotatorItems = document.querySelectorAll('.rotator-item');
        let currentIndex = 0;
        
        setInterval(() => {
            rotatorItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % rotatorItems.length;
            rotatorItems[currentIndex].classList.add('active');
        }, 3000);
    }

    showTourDetails(tourId) {
        // Реализация показа деталей тура
        console.log('Показать тур:', tourId);
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    window.turistaApp = new TuristaApp();
});