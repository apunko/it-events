import React from "react";
import { Text, View } from 'react-native';
import storage from '../libs/storage'

class EventScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.event.title : 'Event',
    }
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
    storage.load({ key: 'event', id: propsEvent.id }).then(event => {
      this.setState({event})
    }).catch(error => {
      console.warn(error)
    })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{this.state.event.title}</Text>
        <Text>{this.state.event.address}</Text>
        <Text>{this.state.event.link}</Text>
      </View>
    );
  }
}

export default EventScreen;
