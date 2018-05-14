import React from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { DATA_SERVER } from '../constants';

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
    };
  }

  componentDidMount() {
    fetch(`${DATA_SERVER}/events`)
      .then(response => response.json())
      .then(data => {
        const events = data.map(event => ({
          title: event.title,
          id: event._id,
        }));
        this.setState({ events });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.events}
          renderItem={({ item }) => (
            <Button
              key={item.id}
              title={item.title}
              onPress={() => this.props.navigation.navigate('Event', { event: item })}
            />
          )}
        />
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
