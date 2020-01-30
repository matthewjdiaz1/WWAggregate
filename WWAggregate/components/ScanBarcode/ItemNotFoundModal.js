import React from 'react';
import { StyleSheet, Text, TextInput, View, Modal } from 'react-native';

class ItemNotFoundModal extends React.Component {
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
          <Text style={styles.buttonCancel}>Cancel</Text>
          <Text style={styles.buttonScan}>Scan Label</Text>
        </View>
      </View>
    );
  }
}

export default ItemNotFoundModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    position: "relative",
    // height: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#E5E5E5",
    color: '#000000',
  },
  header: {
    textAlign: "center",
    paddingTop: "30%",
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 46,
  },
  text: {
    textAlign: "left",
    paddingTop: "18%",
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 23,
  },
  input: {
    top: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: "solid",
    borderColor: "#D2DBE2",
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 23,
    color: "#B8B6B6",
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    paddingBottom: "30%",
    paddingHorizontal: 40,
  },
  buttonCancel: {
    margin: 10,
    paddingHorizontal: 29,
    paddingVertical: 21,

    // borderWidth: 1,
    borderRadius: 4,
    borderStyle: "solid",
    borderColor: "white",

    fontSize: 18,
    fontWeight: '500',
    lineHeight: 23,
  },
  buttonScan: {
    margin: 10,
    paddingHorizontal: 29,
    paddingVertical: 21,
    backgroundColor: "#6EDAF2",

    // borderWidth: 1,
    borderRadius: 4,
    borderStyle: "solid",
    borderColor: "white",

    fontSize: 18,
    fontWeight: '500',
    lineHeight: 23,
  }
});
