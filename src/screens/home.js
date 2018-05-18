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
      loading: false,
      refreshing: false,
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

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchEventsPage(1, true);
  };

  fetchEventsPage = (page, refreshing = false) => {
    if (this.state.loading) return;

    this.setState({ loading: true });
    fetch(`${DATA_SERVER}/events?page=${page}`)
      .then(response => response.json())
      .then(data => {
        const events = data.map(event => ({
          title: event.title,
          id: event._id,
        }));

        this.setState({
          events: refreshing ? events : this.state.events.concat(events),
          nextPage: events.length === PAGE_SIZE ? page + 1 : null,
          loading: false,
          refreshing: false,
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.events}
          onEndReachedThreshold={0.5}
          onEndReached={this.onEndReached}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          renderItem={({ item }) => (
            <Button
              key={item.id}
              title={item.title}
              onPress={() => this.props.navigation.navigate('Event', { event: item })}
            />
          )}
        />
        {this.state.nextPage === null && <Text>All events were loaded</Text>}
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
