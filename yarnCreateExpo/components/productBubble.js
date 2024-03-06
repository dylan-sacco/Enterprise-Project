import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProductBubbleStyles } from "../styles/styles";

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
  
  export { ProductBubble };