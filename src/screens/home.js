import React from 'react';
import { View, FlatList, Button, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { DATA_SERVER, PAGE_SIZE } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Events list',
  };

  constructor() {
    super();
    this.state = {
      events: [],
      nextPage: 1,
    };
  }

  componentDidMount() {
    this.fetchEventsPage(this.state.nextPage);
  }

  onEndReached = () => {
    if (this.state.nextPage !== null) {
      this.fetchEventsPage(this.state.nextPage);
    }
  };

  fetchEventsPage = page => {
    fetch(`${DATA_SERVER}/events?page=${page}`)
      .then(response => response.json())
      .then(data => {
        const events = data.map(event => ({
          title: event.title,
          id: event._id,
        }));

        this.setState({
          events: this.state.events.concat(events),
          nextPage: events.length === PAGE_SIZE ? page + 1 : null,
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.events}
          onEndReached={this.onEndReached}
          renderItem={({ item }) => (
            <Button
              key={item.id}
              title={item.title}
              onPress={() => this.props.navigation.navigate('Event', { event: item })}
            />
          )}
        />
        <Text>All events were loaded</Text>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeScreen;
