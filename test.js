class Reminder {
    constructor() {
        this.reminderData = [];
    }

    addReminder = (reminderId, subject, alertType = "sound", repeat = false, notes = "", alertTime) => {
        if (!subject || !alertType || !repeat || !notes) return "Reminder Data Error!";
        const newReminder = {
            reminderId: reminderId,
            subject: subject,
            alertType: alertType,
            repeat: repeat,
            notes: notes,
            alertTime: alertTime,
        };
        this.reminderData.push(newReminder);

        const currentTime = new Date().getTime();
        const timeToAlert = new Date(alertTime).getTime() - currentTime;
        if (timeToAlert > 0) {
            setTimeout(() => {
                this.deleteReminder(reminderId);
                return `Reminder "${subject}" expired!`;
            }, timeToAlert);
        }
    };

    deleteReminder = (reminderId) => {
        const isReminderPresent = this.reminderData.findIndex(reminder => reminder.reminderId === reminderId);
        if (isReminderPresent === -1) return "Error: No reminder found!";

        this.reminderData = this.reminderData.filter((reminder) => reminder.reminderId !== reminderId);
        return "Reminder is deleted!";
    };

    getReminder = () => {
        return this.reminderData;
    };
}


