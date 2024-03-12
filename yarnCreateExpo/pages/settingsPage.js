import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//--------------------START OF SETTINGS FUNCTION--------------------
function SettingsPage({ navigation }) {
  // State variables for address input fields and app mode
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [showAddressInputs, setShowAddressInputs] = useState(false); // State to control visibility of address inputs
  const [darkMode, setDarkMode] = useState(false); // Default to light mode

  // Function to toggle between dark and light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Function to toggle back to light mode
  const toggleLightMode = () => {
    setDarkMode(false);
  };

  // Function to toggle visibility of address input fields
  const toggleAddressInputs = () => {
    setShowAddressInputs(!showAddressInputs);
  };

  return (
    // <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      <ScrollView>
        <Text style={[styles.title, darkMode && styles.titleDark]}>Settings</Text>

        {/* Accessibility Settings */}
        <View style={[styles.section, darkMode && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, darkMode && styles.sectionTitleDark]}>Accessibility</Text>
          {/* Dark Mode and Light Mode buttons */}
          <View style={styles.modeButtons}>
            <TouchableOpacity onPress={toggleDarkMode}>
              <Text style={[styles.modeButton, darkMode && styles.modeButtonActive]}>Dark Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleLightMode}>
              <Text style={[styles.modeButton, !darkMode && styles.modeButtonActive]}>Light Mode</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Settings */}
        <View style={[styles.section, darkMode && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, darkMode && styles.sectionTitleDark]}>Account</Text>
          {/* Button to toggle address input fields */}
          <TouchableOpacity onPress={toggleAddressInputs}>
            <Text style={[styles.toggleButton, darkMode && styles.toggleButtonDark]}>
              {showAddressInputs ? 'Hide Address' : 'Change Address'}
            </Text>
          </TouchableOpacity>
          {/* Address Input Fields */}
          {showAddressInputs && (
            <View style={styles.inputFields}>
              <Text style={[styles.inputLabel, darkMode && styles.inputLabelDark]}>Street:</Text>
              <TextInput
                style={[styles.input, darkMode && styles.inputDark]}
                onChangeText={text => setStreet(text)}
                value={street}
                placeholderTextColor={darkMode ? 'lightgray' : 'gray'}
              />
              <Text style={[styles.inputLabel, darkMode && styles.inputLabelDark]}>City:</Text>
              <TextInput
                style={[styles.input, darkMode && styles.inputDark]}
                onChangeText={text => setCity(text)}
                value={city}
                placeholderTextColor={darkMode ? 'lightgray' : 'gray'}
              />
              <Text style={[styles.inputLabel, darkMode && styles.inputLabelDark]}>Zip Code:</Text>
              <TextInput
                style={[styles.input, darkMode && styles.inputDark]}
                onChangeText={text => setZipCode(text)}
                value={zipCode}
                placeholderTextColor={darkMode ? 'lightgray' : 'gray'}
              />
            </View>
          )}
        </View>
      </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerDark: {
    backgroundColor: '#121212', // Dark background color
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    width: "100%",
    marginBottom: 20,
    color: 'black',
  },
  titleDark: {
    color: 'white',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionDark: {
    backgroundColor: '#1e1e1e', // Dark background color for sections
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
  },
  sectionTitleDark: {
    color: 'white',
  },
  modeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeButton: {
    fontSize: 16,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  modeButtonActive: {
    backgroundColor: 'gray', // Darker background for active mode button
  },
  inputFields: {
    marginLeft: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: 'black',
  },
  inputLabelDark: {
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 10,
  },
  inputDark: {
    color: 'white',
    backgroundColor: '#333', // Dark input background color
  },
  toggleButton: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
  },
  toggleButtonDark: {
    color: 'lightblue', // Adjust button color for dark mode
  },
});

export default SettingsPage;
