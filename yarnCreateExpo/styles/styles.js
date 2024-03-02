import { SafeAreaView, KeyboardAvoidingView, StyleSheet, Text, View, Image, Platform, ScrollView, Button, TouchableOpacity, TextInput, } from "react-native";

export const COLORS = {
  D2: "#b59496",
  D1: "#9a7c7e",
  Mauve: "#826061",
  DarkMauve: "#421b2e",
  L3: "#a48279",
  L2: "#b39887",
  L1: "#d2bb83",

}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingVertical: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    bannerContainer: {
      width: '100%',
      height: 200, // Adjust height as needed
      marginBottom: 20,
    },
    bannerImage: {
      width: '100%',
      height: '100%',
    },
    navigationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    
    
    button: {
      backgroundColor: '#007bff',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 10, // Adjust horizontal margin
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    aboutContainer: {
      width: '80%',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
    },
    aboutText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });

  const ProductBubbleStyles = StyleSheet.create({
    touch: {
      overflow: "hidden",
      width: "100%",
      height: "100%",
      borderRadius: 20,
    },
    container: {
      ...Platform.select({
        ios: {
          minWidth: 150,
        },
        android: {
          minWidth: 150,
        },
        web: {
          minWidth: 300,
        },
      }),
      // width: '100%',
      height: 200,
      borderRadius: 20,
      margin: 10,
      flex: 1,
      shadowColor: "black",
      shadowOffset: { width: 4, height: 6 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
      backgroundColor: "rgba(0,0,0,0.2)",
    },
    text: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "left",
      padding: 2,
    },
    textContainer: {
      backgroundColor: "rgba(0,0,0,0.4)",
      bottom: 0,
      position: "absolute",
      width: "100%",
      borderRadius: 9,
      padding: 9,
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "fill",
      resizeMode: "cover",
      // resizeMode: 'contain',
      // resizeMode: 'stretch',
      // backgroundColor: 'rgba(0,0,0,0.2)',
    },
  });


export {styles, ProductBubbleStyles};