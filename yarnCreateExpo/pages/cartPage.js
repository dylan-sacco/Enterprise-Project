import React from "react";
import { ScrollView, Text } from "react-native";

function Cart({ navigation }) {
    return (
      <ScrollView>
        <Text style={{ fontSize: 30, textAlign: "center", width: "100%" }}>
          Cart
        </Text>
      </ScrollView>
    );
  }

  export default Cart;