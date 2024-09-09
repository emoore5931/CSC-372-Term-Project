class UINotification {

    /**
     * Defines notification type for notification methods.
     */
    static NotificationType = Object.freeze({
        topCenter: 0,
        topLeft: 1,
        topRight: 2,
        bottomCenter: 3
    });

    /**
     * Displays a notification with the given message to the page, characteristics are
     * defined by the {@link UINotification.NotificationType}
     * @param {string} message 
     * @param {Notification.NotificationType} notificationType
     */
    static displayNotification(message, notificationType) {
        
    }
}