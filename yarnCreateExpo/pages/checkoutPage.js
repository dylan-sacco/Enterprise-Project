import React from "react";
import { ScrollView, Text } from "react-native";
//--------------------START OF CHECKOUT FUNCTION--------------------
function Checkout({ navigation }) {
    return (
      <ScrollView>
        <Text style={{ fontSize: 30, textAlign: "center", width: "100%" }}>
          Checkout
        </Text>
      </ScrollView>
    );
  }
  
  export default Checkout;