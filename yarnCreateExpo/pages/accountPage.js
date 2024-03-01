import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../auth/AuthContext";

//--------------------START OF ACCOUNT SETTINGS FUNCTION--------------------
function Account({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  return (
    <ScrollView>
      <Text style={{ fontSize: 30, textAlign: "center", width: "100%" }}>
        Account
      </Text>
      <TouchableOpacity
        onPress={() => { signOut() }}>
        <Text style={{ fontSize: 20, textAlign: "center", width: "100%" }}>
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Account;