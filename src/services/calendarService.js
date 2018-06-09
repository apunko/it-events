import { Calendar } from 'expo';
import { Alert } from 'react-native';

const { CalendarType } = Calendar;

class CalendarService {
  static async getEditableCalendar() {
    const calendars = await Calendar.getCalendarsAsync();
    const editableCalendars = calendars.filter(({ allowsModifications }) => allowsModifications);
    if (!editableCalendars.length) {
      return null;
    }

    const ownerCalendar = calendars.find(({ type }) => type === CalendarType.LOCAL);

    return ownerCalendar || editableCalendars[editableCalendars.length - 1];
  }

  static async findSimilarEvent(calendarId, { title, startDate, finishDate }) {
    const events = await Calendar.getEventsAsync([calendarId], startDate, finishDate);

    return events.find(event => event.title === title);
  }

  static createEvent(calendarId, { title, startDate, finishDate }) {
    return Calendar.createEventAsync(calendarId, {
      title,
      startDate,
      endDate: finishDate,
    });
  }

  static async addEvent(event = {}) {
    try {
      const calendar = await CalendarService.getEditableCalendar();
      if (!calendar) {
        return;
      }

      const similarEvent = await CalendarService.findSimilarEvent(calendar.id, event);
      if (similarEvent) {
        Alert.alert('Event was already added!');
      } else {
        await CalendarService.createEvent(calendar.id, event);
        Alert.alert('Event was added!');
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Sorry can not add event!');
    }
  }
}

export default CalendarService;
