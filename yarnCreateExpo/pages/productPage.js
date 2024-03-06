import React from "react";
import { onPress } from "react";
import { ScrollView, Text, View, Button, Platform, TextInput, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
//--------------------START OF PRODUCT SCREEN FUNCTION--------------------
function ProductScreen({ route, navigation }) {
  const { productId, url, price, productName } = route.params;
  console.log(route.params);
  const onPress = () => {
    console.log("Add to cart");
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        textAlign: "center",
        // alignItems: "center",
        // justifyContent: 'center',
        paddingTop: 50,
      }}
    >
      {url ? (
        <Image source={{ uri: url }} style={{ height: 200, width: 200}} />
      ) : (
        <Image source={require("../assets/Square_200x200.png")} />
      )}
      <Text style={{ fontSize: 30, textAlign: "center" }}>
        {productName || "none"}
      </Text>
      <Text>${price || "0.00"}</Text>
      <Text style={{ fontSize: 30, textAlign: "center" }}>
        {productName || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: "rgba(173, 216, 230, 0.8)",
          padding: 10,
          borderRadius: 9,
        }}
      >
        <Text style={{ fontSize: 20 }}>Add To Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

  export default ProductScreen;