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
      text: '',
    };
    this.nav = this.nav.bind(this);
  }
  nav(nav) {
    this.props.navigation.navigate(nav);
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
          <Button onPress={() => this.nav('ScanBarcode')} label="Cancel" />
          <Button onPress={() => this.nav('ScanNutrition')} label="Scan Label" cta />
        </View>
      </View>
    );
  }
}

export default withNavigation(ItemNotFoundScreen);
