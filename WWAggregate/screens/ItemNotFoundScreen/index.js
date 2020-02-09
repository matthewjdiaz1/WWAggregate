import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import Button from '../../components/Button';
import styles from './styles';

// const ItemNotFoundScreen = () => {
//   const [text, setText] = useState('');

// }
class ItemNotFoundScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      barcode: this.props.navigation.state.params.barcode,
    };
  }

  render() {
    console.log(this.state.name);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Item not found</Text>
        <Text style={styles.text}>Add a product name and scan a nutrition label to add it to your library</Text>
        <Text style={styles.text}>Item Name</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: Organic Applesauce"
          onChangeText={(name) => this.setState({ name })}
          value={this.state.text}>
        </TextInput>
        <View style={styles.buttonContainer}>
          <Button onPress={() => this.props.navigation.goBack()} label="Cancel" />
          <Button
            onPress={() => this.props.navigation.navigate('ScanNutrition', {
              name: this.state.name,
              barcode: this.state.barcode,
            })}
            label="Scan Label" cta />
        </View>
      </View>
    );
  }
}

export default withNavigation(ItemNotFoundScreen);
