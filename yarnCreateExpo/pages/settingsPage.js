import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//--------------------START OF SETTINGS FUNCTION--------------------
function SettingsPage({ navigation }) {
    return (
      <SafeAreaView>
      <ScrollView>
        <Text style={{ fontSize: 30, textAlign: "center", width: "100%" }}>
          Settings
        </Text>
      </ScrollView>
      </SafeAreaView>
    );
  }

  export default SettingsPage;