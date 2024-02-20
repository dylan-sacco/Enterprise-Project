// Components.js
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
// https://reactnavigation.org/docs/connecting-navigation-prop
// allows me to not have to pass in navigation as a prop every time i use the damn object
import { useNavigation } from "@react-navigation/native";

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
const ProductBubble = (props) => {
  const navigation = useNavigation();
  function onPress() {
    //   console.log('Pressed ', props.name, ' for $', props.price, '!');
    //   console.log("this is where we would navigate to the product page");
    navigation.push("Products", {
      productId: "ca724",
      productName: props.name,
      price: props.price,
      url: props.image,
    }); // use push to create a new screen
  }
  return (
    <View style={ProductBubbleStyles.container}>
      <TouchableOpacity style={ProductBubbleStyles.touch} onPress={onPress}>
        <Image
          style={ProductBubbleStyles.image}
          source={
            { uri: props.image } /*|| require('./assets/Square_200x200.png') */
          }
        />
        <View style={ProductBubbleStyles.textContainer}>
          <Text style={ProductBubbleStyles.text}>{props.name}</Text>
          <Text style={ProductBubbleStyles.text}>${props.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CheckBoxStyles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
  checkBox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
const CheckBox = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View style={CheckBoxStyles.container}>
      <TouchableOpacity style={CheckBoxStyles.CheckBox}>
        <Text style={CheckBoxStyles.text}>X</Text>
      </TouchableOpacity>
      <Text style={CheckBoxStyles.text}>Checkbox</Text>
    </View>
  );
};

export { ProductBubble, CheckBox };
