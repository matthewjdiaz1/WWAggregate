import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Button from '../../components/Button';
import styles from './styles';

class ItemNotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Item not found</Text>
        <Text style={styles.text}>Add a product name and scan a nutrition label to add it to your library</Text>
        <Text style={styles.text}>Item Name</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: Organic Applesauce"
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}>
        </TextInput>
        <View style={styles.buttonContainer}>
          <Button label="Cancel" />
          <Button label="Scan Label" cta />
        </View>
      </View>
    );
  }
}

export default ItemNotFound;
