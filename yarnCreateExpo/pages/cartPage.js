import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  item:{
    padding: 10,
    borderColor: "black",
    borderBottomWidth: 1,
    backgroundColor: "#e5e5e5",
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  padding: {
    padding: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    // borderColor: "black",
    // borderWidth: 1,
  },
  button: {
    padding: 10,
    backgroundColor: "#f77",
    borderRadius: 7,
    flex: 1,
    alignItems: "center",
  },
  checkoutButton: {
    padding: 10,
    margin: 10,
    backgroundColor: "lightblue",
    borderRadius: 7,
    alignItems: "center",
  }
});

const CartItem = (props) => {

  return (
    <View style={style.item}>
      {/* Image and text */}
      <View style={[style.container]}>
        <Text>Image</Text>
        <View>
          <View style={style.padding}>
            <Text>Product ID:</Text>
            <Text>{props.productID}</Text>
          </View>
          <View style={style.padding}>
            <Text>Product Name: </Text>
            <Text>Name</Text>
          </View>
          <View style={style.padding}>
            <Text>price: </Text>
            <Text>$0.00</Text>
          </View>
          <View style={style.padding}>
            <Text>Quantity: </Text>
            <Text>0</Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={style.container}>
        <TouchableOpacity style={style.button}>
          <Text>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function Cart({ navigation }) {
  let navToCheckout = () => {
    navigation.push('Checkout')
    
  };
  return (
    <View style={{justifyContent: "space-between", flex: 1}}>
      <ScrollView>
        <View  style={{maxWidth: "800px", alignSelf: "center", width: "100%"}}>
        <CartItem productID="1" />
        <CartItem productID="2" />
        <CartItem productID="3" />
        <CartItem productID="4" />
        <CartItem productID="5" />
        </View>
      </ScrollView>
      

      <View>
        <TouchableOpacity style={style.checkoutButton}
        onPress={navToCheckout}>
          <Text>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Cart;