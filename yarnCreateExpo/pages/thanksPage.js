import React from "react";
import { ScrollView, Text } from "react-native";

//--------------------START OF THANKS FUNCTION--------------------
function Thanks({ navigation }) {
    return (
      <ScrollView>
        <Text style={{ fontSize: 30, textAlign: "center", width: "100%" }}>
          Thank You!
        </Text>
      </ScrollView>
    );
  }

  export default Thanks;