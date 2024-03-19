import { SafeAreaView, KeyboardAvoidingView, StyleSheet, Text, View, Image, Platform, ScrollView, Button, TouchableOpacity, TextInput, } from "react-native";

export const COLORS = {
  D2: "#b59496",
  D1: "#9a7c7e",
  Mauve: "#826061",
  DarkMauve: "#421b2e",
  L3: "#a48279",
  L2: "#b39887",
  L1: "#d2bb83",
  JB: '#902',
  JB2: '#b94',
  FoggedBackgroundDark: "rgba(0, 0, 0, 0.6)",
  FoggedBackgroundLight: "rgba(255, 255, 255, 0.3)",
}

// export const FONTS = {
//   Banner: "../assets/fonts/Thei_PersonalUse.otf"
// }

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
      color: COLORS.JB2,
      fontFamily: 'initial',
    },
    bannerContainer: {
      width: '100%',
      height: 300, // Adjust height as needed
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bannerImage: {
      width: '100%',
      //height: '100%',
      // alignSelf: 'center',
    },
    bannerText: {
      padding: 50,
      fontSize: 200,
      fontWeight: 'bold',
      color: COLORS.JB,
      textAlign: 'center',
      fontFamily: 'initial',
      fontStyle: 'italic',
      // fontFamily: 'Thei_PersonalUse',
    },
    navigationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    
    
    button: {
      backgroundColor: COLORS.JB,
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
      backgroundColor: COLORS.FoggedBackgroundDark,
    },
    aboutText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: COLORS.JB2,
      fontFamily: 'initial',
    },

    cloudedPanel: {
      width: '80%',
      padding: 20,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: COLORS.FoggedBackgroundDark,
      // backgroundColor: COLORS.FoggedBackgroundLight,
      backdropFilter: 'blur(5px)',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      ...Platform.select({
        ios:{width: '80%'},
        android:{width: '80%'},
      })
    },

    productImage: {
      overflow: "hidden",
      alignSelf: "center",
      width: "100%",
      height: "100%",
      // height: 800,
      // width: 800,
      borderRadius: 20,
    }
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