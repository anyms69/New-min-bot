// Конфигурация Telegram Web App
const TGConfig = {
    // Основные настройки
    appName: 'Turista Tours',
    appVersion: '1.0.0',
    
    // Цвета Telegram
    themeParams: {
        bg_color: '#ffffff',
        text_color: '#000000',
        hint_color: '#707579',
        link_color: '#3390ec',
        button_color: '#3390ec',
        button_text_color: '#ffffff'
    },
    
    // Настройки приложения
    settings: {
        expandOnStart: true,
        disableVerticalSwipes: true,
        enableClosingConfirmation: true
    },
    
    // Кнопки
    mainButton: {
        text: 'Забронировать тур',
        color: '#3390ec',
        textColor: '#ffffff',
        isVisible: false,
        isActive: true
    },
    
    // Методы для работы с Telegram
    initTelegram() {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            
            // Устанавливаем тему
            tg.themeParams = this.themeParams;
            
            // Настройки приложения
            if (this.settings.expandOnStart) tg.expand();
            if (this.settings.enableClosingConfirmation) tg.enableClosingConfirmation();
            
            // Инициализация кнопки
            this.initMainButton(tg);
            
            return tg;
        }
        return null;
    },
    
    initMainButton(tg) {
        const mainButton = tg.MainButton;
        mainButton.text = this.mainButton.text;
        mainButton.color = this.mainButton.color;
        mainButton.textColor = this.mainButton.textColor;
        mainButton.isVisible = this.mainButton.isVisible;
        mainButton.isActive = this.mainButton.isActive;
        
        return mainButton;
    },
    
    // Утилиты
    showAlert(message) {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.showAlert(message);
        } else {
            alert(message);
        }
    },
    
    showConfirm(message, callback) {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.showConfirm(message, callback);
        } else {
            const result = confirm(message);
            callback(result);
        }
    },
    
    // Отправка данных в Telegram
    sendData(data) {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.sendData(JSON.stringify(data));
        } else {
            console.log('Data to send:', data);
        }
    },
    
    // Закрытие приложения
    closeApp() {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.close();
        }
    }
};

// Экспорт конфигурации
window.TGConfig = TGConfig;