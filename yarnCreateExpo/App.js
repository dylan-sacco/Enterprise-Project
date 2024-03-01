


//--------------------SYSTEM IMPORTS--------------------
import React, { useState, useContext } from "react";
import { StatusBar, setStatusBarStyle } from "expo-status-bar";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView, KeyboardAvoidingView, StyleSheet, Text, View, Image, Platform, ScrollView, Button, TouchableOpacity, TextInput, Settings, } from "react-native";

//--------------------NAVIGATION IMPORTS--------------------
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation, DefaultTheme, DarkTheme, } from "@react-navigation/native";

//--------------------FIREBASE IMPORTS--------------------
import "./firebaseConfig.js";

//--------------------AUTHENTICATION IMPORTS--------------------
import { AuthContext } from "./auth/AuthContext";

//--------------------PAGES IMPORTS--------------------
import SignIn from "./pages/signinpage.js";
import HomeScreen from "./pages/homePage.js";
import ProductScreen from "./pages/productPage.js";
import Cart from "./pages/cartPage.js";
import Checkout from "./pages/checkoutPage.js";
import Thanks from "./pages/thanksPage.js";
import SettingsPage from "./pages/settingsPage.js";
import Account from "./pages/accountPage.js";
import Welcome from "./pages/welcomePage.js";

//--------------------STYLES IMPORTS--------------------
import { styles } from "./styles/styles.js";


//--------------------NAV DECLARATIONS--------------------

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


//--------------------STACK METHODS--------------------
function CheckoutNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Thanks" component={Thanks} />
    </Stack.Navigator>
  );
}
function SettingsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Settings" component={SettingsPage} />
    </Stack.Navigator>
  );
}
function ShoppingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Products" component={ProductScreen} initialParams={{ productId: 'ca724' }} />
    </Stack.Navigator>
  );
}
function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Profile" component={SettingsNavigator} />
      <Tab.Screen name="HomeStack" component={ShoppingNavigator} />
      <Tab.Screen name="Cart" component={CheckoutNavigator} />
    </Tab.Navigator>
  );
          console.log(auth.currentUser);

}


//--------------------START OF APP FUNCTION--------------------
export default function App() {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (

    <AuthContext.Provider value={authContext} >
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.userToken != null ? (
            //START FRAGMENT
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="HomeTabs" component={HomeTabs} />
              <Stack.Screen name="Shopping" component={ShoppingNavigator} />
            </>
            //END FRAGMENT
          ) : (
            <Stack.Screen name="SignIn" component={SignIn} />
          )}

        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
