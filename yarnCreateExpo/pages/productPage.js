import React from "react";
import { SafeAreaView, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
//--------------------START OF PRODUCT SCREEN FUNCTION--------------------
function ProductScreen({ route, navigation }) {
    const { productId, url, price, productName } = route.params;
    console.log(route.params);
    const onPress = () => {
      console.log("Add to cart");
    };
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          // justifyContent: 'center'
          paddingTop: 50,
        }}
      >
        {url ? (
          <Image source={{ uri: url }} style={{ height: 200, width: 200 }} />
        ) : (
          <Image source={require("../assets/Square_200x200.png")} />
        )}
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          {productName || "none"}
        </Text>
        <Text>${price || "0.00"}</Text>
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
      </SafeAreaView>
    );
  }

  export default ProductScreen;