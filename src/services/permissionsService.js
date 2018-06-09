import { Permissions } from 'expo';

class PermissionsService {
  static async getCalendarPermissions() {
    let { status } = await Permissions.getAsync(Permissions.CALENDAR);
    if (status === 'undetermined') {
      status = await PermissionsService.askAccess(Permissions.CALENDAR);
    }

    return status;
  }

  static async askAccess(type) {
    const { status } = await Permissions.askAsync(type);

    return status;
  }
}

export default PermissionsService;
