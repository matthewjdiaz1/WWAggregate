import React from 'react';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';

class ItemNotFoundModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>ItemNotFoundModal</Text>
      </View>
    );
  }
}

export default ItemNotFoundModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  text: {
    top: 25,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(111, 218, 242)',
  },
});
