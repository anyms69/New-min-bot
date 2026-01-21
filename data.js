// Данные туров (25+ направлений)
const toursData = [
    {
        id: 1,
        name: "Золотое кольцо России: Классика",
        region: "golden_ring",
        price: "45 000",
        days: 7,
        difficulty: "easy",
        rating: 4.9,
        description: "Путешествие по 8 древним городам с богатой историей",
        fullDescription: "Маршрут проходит через Владимир, Суздаль, Ярославль, Кострому, Ростов Великий, Переславль-Залесский, Сергиев Посад и Иваново. Вы увидите белокаменные храмы XII века, древние монастыри, познакомитесь с традиционными ремеслами и русской кухней. Включены мастер-классы по гончарному делу и росписи матрешек.",
        location: "Владимирская, Ярославская, Костромская области",
        maxPeople: 20,
        minPeople: 6,
        season: "Круглый год",
        includes: ["Проживание в отелях 3*", "Питание: завтраки и обеды", "Транспорт", "Экскурсии с гидом", "Входные билеты"],
        highlights: ["Успенский собор XII века", "Суздальский кремль", "Ярославская набережная", "Ипатьевский монастырь"],
        image: "golden-ring.jpg",
        featured: true
    },
    {
        id: 2,
        name: "Восхождение на Эльбрус",
        region: "caucasus",
        price: "85 000",
        days: 10,
        difficulty: "hard",
        rating: 4.8,
        description: "Покорите самую высокую вершину Европы",
        location: "Приэльбрусье, Кабардино-Балкария",
        featured: true
    },
    {
        id: 3,
        name: "Озеро Байкал: Ледовое сафари",
        region: "baikal",
        price: "65 000",
        days: 8,
        difficulty: "medium",
        rating: 4.9,
        description: "Уникальное путешествие по льду самого глубокого озера",
        location: "Иркутская область",
        featured: true
    },
    {
        id: 4,
        name: "Камчатка: Земля вулканов",
        region: "kamchatka",
        price: "120 000",
        days: 12,
        difficulty: "hard",
        rating: 4.7,
        description: "Экспедиция к действующим вулканам и гейзерам",
        location: "Камчатский край",
        featured: true
    },
    {
        id: 5,
        name: "Карельские шхеры на байдарках",
        region: "karelia",
        price: "38 000",
        days: 6,
        difficulty: "medium",
        rating: 4.6,
        description: "Сплав по живописным озерам Карелии",
        location: "Республика Карелия"
    },
    {
        id: 6,
        name: "Сочи и Красная Поляна",
        region: "caucasus",
        price: "52 000",
        days: 7,
        difficulty: "easy",
        rating: 4.5,
        description: "Горный отдых на черноморском побережье",
        location: "Краснодарский край"
    },
    {
        id: 7,
        name: "Алтай: Горная Шория",
        region: "altai",
        price: "42 000",
        days: 7,
        difficulty: "medium",
        rating: 4.8,
        description: "Конные походы и знакомство с культурой алтайцев",
        location: "Республика Алтай"
    },
    {
        id: 8,
        name: "Крым: Южный берег",
        region: "crimea",
        price: "48 000",
        days: 8,
        difficulty: "easy",
        rating: 4.7,
        description: "Отдых на черноморском побережье Крыма",
        location: "Республика Крым"
    },
    {
        id: 9,
        name: "Кольский полуостров",
        region: "murmansk",
        price: "68 000",
        days: 9,
        difficulty: "hard",
        rating: 4.6,
        description: "Северное сияние и саамская культура",
        location: "Мурманская область"
    },
    {
        id: 10,
        name: "Великий Устюг: Вотчина Деда Мороза",
        region: "vologda",
        price: "35 000",
        days: 5,
        difficulty: "easy",
        rating: 4.9,
        description: "Новогоднее путешествие в резиденцию Деда Мороза",
        location: "Вологодская область"
    },
    {
        id: 11,
        name: "Соловецкие острова",
        region: "arkhangelsk",
        price: "55 000",
        days: 7,
        difficulty: "medium",
        rating: 4.7,
        description: "Духовный центр Русского Севера",
        location: "Архангельская область"
    },
    {
        id: 12,
        name: "Уральские горы",
        region: "ural",
        price: "44 000",
        days: 6,
        difficulty: "medium",
        rating: 4.5,
        description: "Поход по самым старым горам России",
        location: "Свердловская область"
    },
    {
        id: 13,
        name: "Петербург и пригороды",
        region: "petersburg",
        price: "58 000",
        days: 6,
        difficulty: "easy",
        rating: 4.9,
        description: "Культурная столица России",
        location: "Санкт-Петербург"
    },
    {
        id: 14,
        name: "Валдай и озерный край",
        region: "novgorod",
        price: "32 000",
        days: 4,
        difficulty: "easy",
        rating: 4.4,
        description: "Отдых на живописных озерах Валдая",
        location: "Новгородская область"
    },
    {
        id: 15,
        name: "Плато Путорана",
        region: "krasnoyarsk",
        price: "95 000",
        days: 10,
        difficulty: "hard",
        rating: 4.8,
        description: "Затерянный мир Сибири",
        location: "Красноярский край"
    },
    {
        id: 16,
        name: "Куршская коса",
        region: "kaliningrad",
        price: "41 000",
        days: 5,
        difficulty: "easy",
        rating: 4.6,
        description: "Уникальная песчаная коса в Балтийском море",
        location: "Калининградская область"
    },
    {
        id: 17,
        name: "Сахалин: Остров сокровищ",
        region: "sakhalin",
        price: "89 000",
        days: 9,
        difficulty: "medium",
        rating: 4.7,
        description: "Край земли с уникальной природой",
        location: "Сахалинская область"
    },
    {
        id: 18,
        name: "Астраханские плавни",
        region: "astrakhan",
        price: "37 000",
        days: 5,
        difficulty: "easy",
        rating: 4.5,
        description: "Рыбалка и дельта Волги",
        location: "Астраханская область"
    },
    {
        id: 19,
        name: "Бурятия: Байкал с востока",
        region: "buryatia",
        price: "53 000",
        days: 7,
        difficulty: "medium",
        rating: 4.6,
        description: "Буддийские монастыри и восточное побережье Байкала",
        location: "Республика Бурятия"
    },
    {
        id: 20,
        name: "Татарстан: Казань и Болгар",
        region: "tatarstan",
        price: "39 000",
        days: 5,
        difficulty: "easy",
        rating: 4.8,
        description: "Встреча Европы и Азии",
        location: "Республика Татарстан"
    },
    {
        id: 21,
        name: "Чукотка: Крайний Север",
        region: "chukotka",
        price: "145 000",
        days: 14,
        difficulty: "hard",
        rating: 4.9,
        description: "Экспедиция на край света",
        location: "Чукотский автономный округ"
    },
    {
        id: 22,
        name: "Хакасия: Древние курганы",
        region: "khakassia",
        price: "46 000",
        days: 6,
        difficulty: "medium",
        rating: 4.5,
        description: "Загадки древних цивилизаций",
        location: "Республика Хакасия"
    },
    {
        id: 23,
        name: "Якутия: Полюс холода",
        region: "yakutia",
        price: "78 000",
        days: 8,
        difficulty: "hard",
        rating: 4.7,
        description: "Оймякон - самое холодное место на Земле",
        location: "Республика Саха"
    },
    {
        id: 24,
        name: "Дагестан: Страна гор",
        region: "dagestan",
        price: "49 000",
        days: 7,
        difficulty: "medium",
        rating: 4.6,
        description: "Древние аулы и уникальная культура",
        location: "Республика Дагестан"
    },
    {
        id: 25,
        name: "Коми: Девственные леса",
        region: "komi",
        price: "51 000",
        days: 7,
        difficulty: "hard",
        rating: 4.8,
        description: "Объект всемирного наследия ЮНЕСКО",
        location: "Республика Коми"
    },
    {
        id: 26,
        name: "Тува: Центр Азии",
        region: "tuva",
        price: "47 000",
        days: 7,
        difficulty: "medium",
        rating: 4.5,
        description: "Горловое пение и шаманизм",
        location: "Республика Тыва"
    }
];

// Данные регионов
const regionsData = [
    {
        id: "golden_ring",
        name: "Золотое кольцо",
        description: "Древние города с богатой историей",
        tourCount: 8,
        color: "#f59e0b"
    },
    {
        id: "caucasus",
        name: "Кавказ",
        description: "Высокие горы и теплое море",
        tourCount: 6,
        color: "#10b981"
    },
    {
        id: "baikal",
        name: "Байкал",
        description: "Самое глубокое озеро в мире",
        tourCount: 5,
        color: "#3b82f6"
    },
    {
        id: "kamchatka",
        name: "Камчатка",
        description: "Земля вулканов и гейзеров",
        tourCount: 4,
        color: "#ef4444"
    },
    {
        id: "karelia",
        name: "Карелия",
        description: "Озера и северная природа",
        tourCount: 5,
        color: "#8b5cf6"
    },
    {
        id: "altai",
        name: "Алтай",
        description: "Золотые горы и чистейшие реки",
        tourCount: 4,
        color: "#84cc16"
    },
    {
        id: "crimea",
        name: "Крым",
        description: "Черноморское побережье и горы",
        tourCount: 5,
        color: "#06b6d4"
    },
    {
        id: "siberia",
        name: "Сибирь",
        description: "Бескрайние просторы и суровая природа",
        tourCount: 7,
        color: "#6366f1"
    }
];

// Иконки для регионов
const regionIcons = {
    golden_ring: "fas fa-church",
    caucasus: "fas fa-mountain",
    baikal: "fas fa-water",
    kamchatka: "fas fa-volcano",
    karelia: "fas fa-tree",
    altai: "fas fa-horse",
    crimea: "fas fa-umbrella-beach",
    siberia: "fas fa-snowflake"
};

// Сложности туров
const difficulties = {
    easy: { label: "Легкая", color: "#10b981" },
    medium: { label: "Средняя", color: "#f59e0b" },
    hard: { label: "Сложная", color: "#ef4444" }
};

// Функция для получения иконки региона
function getRegionIcon(regionId) {
    return regionIcons[regionId] || "fas fa-map-marker-alt";
}

// Функция для получения цвета региона
function getRegionColor(regionId) {
    const region = regionsData.find(r => r.id === regionId);
    return region ? region.color : "#6b7280";
}
