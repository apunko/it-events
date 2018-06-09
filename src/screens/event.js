import React from 'react';
import { Text, View, Button, Alert } from 'react-native';
import PropTypes from 'prop-types';
import storage from '../libs/storage';
import PermissionsService from '../services/permissionsService';
import CalendarService from '../services/calendarService';

class EventScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.event.title : 'Event',
    };
  };

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    const event = params ? params.event : {};

    this.state = {
      event,
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const propsEvent = params ? params.event : {};
    storage
      .load({ key: 'event', id: propsEvent.id })
      .then(event => {
        this.setState({
          event: {
            title: event.title,
            address: event.address,
            link: event.link,
            startDate: event.start_date,
            finishDate: event.finish_date,
          },
        });
      })
      .catch(error => {
        console.warn(error);
      });
  }

  addToCalendar = () => {
    PermissionsService.getCalendarPermissions().then(async accessStatus => {
      if (accessStatus === 'granted') {
        await CalendarService.addEvent(this.state.event);
      } else {
        Alert.alert('Sorry, no permissions!');
      }
    });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{this.state.event.title}</Text>
        <Text>{this.state.event.address}</Text>
        <Text>{this.state.event.link}</Text>
        <Text>{this.state.event.startDate}</Text>
        <Text>{this.state.event.finishDate}</Text>
        <Button title="Add to calendar" onPress={this.addToCalendar} />
      </View>
    );
  }
}

EventScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.object,
    }),
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default EventScreen;
