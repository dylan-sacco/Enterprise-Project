import React from "react";
import { onPress } from "react";
import { ScrollView, Text, View, Button, Platform, TextInput, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../styles/styles";
import { styles } from "../styles/styles";
//--------------------START OF PRODUCT SCREEN FUNCTION--------------------
function ProductScreen({ route, navigation }) {
  const { productId, url, price, productName } = route.params;
  console.log(route.params);
  const onPress = () => {
    console.log("Add to cart");
  };
  return (
    <ScrollView style={{backgroundColor: '#222', height: '100%',}}>
      <View contentContainerStyle={styles.container} style={{backgroundColor: '#111', 
                                                             height: '100%',
                                                             width: '100%',
                                                             minHeight: 700,
                                                             maxWidth: 1400, 
                                                             alignSelf: 'center',
                                                             flex: 1,
                                                             flexDirection: 'row',
                                                             flexWrap: 'wrap'}}>
        <View style={{width: '40%', height: '80%', alignContent: 'center', justifyContent: 'center', marginHorizontal: 'auto', marginTop: 30}}>
          {url ? (
            <Image source={{ uri: url }} style={styles.productImage} />
          ) : (
            <Image source={require("../assets/Square_200x200.png")} />
          )}
        </View>
        <View style={{width: '40%', height: '80%', alignContent: 'center', justifyContent: 'center', marginHorizontal: 'auto', marginTop: 30}}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: "left", color: COLORS.JB2 }}>
            {productName || "none"}
          </Text>
          <Text style={{ fontSize: 20, textAlign: "left", color: COLORS.JB2 }}>${price || "0.00"}</Text>
          <Text style={{ fontSize: 25, textAlign: "left", color: COLORS.JB2, marginVertical: 20 }}>
            {productName || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
          </Text>
          <TouchableOpacity onPress={onPress} style={{backgroundColor: COLORS.JB, padding: 20, margin: 10, borderRadius: 10,}}>
            <Text style={{ fontSize: 20 }}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

  export default ProductScreen;