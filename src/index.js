import { YellowBox } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './screens/home';
import Event from './screens/event';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Event: {
      screen: Event,
    },
  },
  {
    initialRouteName: 'Home',
  }
);
