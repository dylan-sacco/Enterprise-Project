import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e5e5e5",
    padding: 10
  },
  padding: {
    padding: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    padding: 10,
    backgroundColor: "#f77",
    borderRadius: 7,
    flex: 1,
    alignItems: "center",
  }
});

const CartItem = (props) => {

  return (
    <View>
      {/* Image and text */}
      <View style={style.container}>
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
  return (
    <View style={{justifyContent: "space-between", flex: 1}}>
      <ScrollView>
        <CartItem productID="1" />
        <CartItem productID="2" />
        <CartItem productID="3" />
        <CartItem productID="4" />
        <CartItem productID="5" />
      </ScrollView>
      

      <View>
        <TouchableOpacity style={[style.button, {flex:0, margin:10, backgroundColor:"lightblue"}]}>
          <Text>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Cart;