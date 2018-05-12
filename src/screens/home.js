import React from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import { DATA_SERVER } from '../constants';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Events list',
  };

  constructor() {
    super();
    this.state = {
      events: [],
    }
  }

  componentDidMount() {
    fetch(`${DATA_SERVER}/events`).then(response => {
      return response.json()
    }).then(data => {
      const events = data.map(event => {
        return {
          title: event.title,
          id: event._id,
        }
      });
      this.setState({events})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.events}
          renderItem={({item}) => {
            return (
              <Button
                key={item.id}
                title={item.title}
                onPress={() => this.props.navigation.navigate('Event', { event: item })}
              />
            )}
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
