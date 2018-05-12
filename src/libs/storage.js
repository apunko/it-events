import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import { DATA_SERVER } from '../constants';
import { fetch } from '../helpers';

const storage = new Storage({
  enableCache: true,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,

  sync: {
    async event({ id, reject, resolve }) {
      try {
        const event = await fetch(`${DATA_SERVER}/events/${id}`);
        await storage.save({ key: 'event', id, data: event });
        resolve(event);
      } catch (err) {
        reject(err);
      }
    },
  },
});

export default storage;
