//--------------------SYSTEM IMPORTS--------------------
import React, { useState, useContext } from "react";
import { StatusBar, setStatusBarStyle } from "expo-status-bar";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView, KeyboardAvoidingView, StyleSheet, Text, View, Image, Platform, ScrollView, Button, TouchableOpacity, TextInput, } from "react-native";

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
    <Stack.Navigator screenOptions={{ headerShown: true }} >
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Thanks" component={Thanks} />
    </Stack.Navigator>
  );
}
function SettingsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
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
    <Tab.Navigator screenOptions={{ headerShown: false}}>
      <Tab.Screen name="Profile" component={SettingsNavigator} />
      <Tab.Screen name="HomeStack" component={ShoppingNavigator} />
      <Tab.Screen name="Cart" component={CheckoutNavigator} />
    </Tab.Navigator>
  );
}
//--------------------START OF HOMESCREEN FUNCTION--------------------
function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  
  const onPress = () => {
    console.log("Add to cart");
  };
  
  //placeholders :3
  const products = [
    { name: 'Product', price: '10.00' },
    { name: 'different product', price: '20.00' },
    { name: 'title', price: '30.00' },
    { name: 'joe ball', price: '40.00' },
    { name: 'product 5', price: '50.00' },
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView>
      <Text style={{ fontSize: 30, textAlign: "center", width: "100%" }}>
        Welcome to{"\n"}Fellas Clothing CO
      </Text>

      <Button
        title="Print user to Logs"
        onPress={() => {
          console.log(auth.currentUser);
          console.log("User is signed " + isSignedIn);
        }}
      />

      <Button
        title="Go to Products"
        onPress={() => {
          // navigation.navigate('Products', {productId: 'ca724'}); // use navigate to go to an existing screen
          navigation.push("Products", { productId: "ca724" }); // use push to create a new screen
        }}
      ></Button>

      <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 15, width: 400}}
          onChangeText={text => setSearch(text)}
          value={search}
          placeholder="Search products"
        />
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 10 }}>
          {filteredProducts.map((product, i) => (
            <View key={i} style={{ width: '45%', margin: 10, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden' }}>
              <Image source={require("./assets/Square_200x200.png")} style={{ height: 200, width: '100%' }} />
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, textAlign: "center" }}>{product.name}</Text>
                <Text style={{ fontSize: 15, textAlign: "center" }}>${product.price}</Text>
                <TouchableOpacity
                  onPress={onPress}
                  style={{
                    backgroundColor: "rgba(173, 216, 230, 0.8)",
                    padding: 10,
                    borderRadius: 9,
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 20, textAlign: "center" }}>Add To Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

//--------------------START OF PRODUCT SCREEN FUNCTION--------------------
function ProductScreen({ route, navigation }) {
  const { productId, url, price, productName } = route.params;
  console.log(route.params);
  const onPress = () => {
    console.log("Add to cart");
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        textAlign: "center",
        // alignItems: "center",
        // justifyContent: 'center',
        paddingTop: 50,
      }}
    >
      {url ? (
        <Image source={{ uri: url }} style={{ height: 200, width: 200}} />
      ) : (
        <Image source={require("./assets/Square_200x200.png")} />
      )}
      <Text style={{ fontSize: 30, textAlign: "center" }}>
        {productName || "none"}
      </Text>
      <Text>${price || "0.00"}</Text>
      <Text style={{ fontSize: 30, textAlign: "center" }}>
        {productName || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
      </Text>
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
    </ScrollView>
  );
}
//--------------------START OF ACCOUNT SETTINGS FUNCTION--------------------
function account({ navigation }){
  return(
    <ScrollView>
      <Text style={{ fontSize: 30, textAlign: "center", width: "100%" }}>
        Account
      </Text>
    </ScrollView>
  );
}
//--------------------START OF SETTINGS FUNCTION--------------------
function settings({ navigation }){
  return(
    <ScrollView>
      <Text style={{ fontSize: 30, textAlign: "center", width: "100%" }}>
        Settings
      </Text>
    </ScrollView>
  );
}
//--------------------START OF WELCOME FUNCTION--------------------
function welcome({ navigation }){
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Welcome to The Fellas</Text>
      <View style={styles.bannerContainer}>
        <Image source={require('./assets/WelcomeBanner2.png')}
        resizeMode="cover"
        style={styles.bannerImage}></Image>
      
      {/*
      <View style={styles.navigationContainer}>
      <Button
          
          title="Shop Now"
          onPress={() => navigation.navigate('Shopping', { screen: 'Home' })}
          style={{ padding: 20, marginHorizontal: 20 }}
          
        />
        <Button
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
            style={{ padding: 20, marginHorizontal: 20 }}
        />
        </View>
        */}
       
        {/* Add more buttons as needed. i was going to have a link to the products stack and maybe one or two other places. ik we wanted a favorites page but idk if thats feasible */}
      </View>
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutText}>At Fellas Co., our mission is simple: to provide an unparalleled shopping experience centered around you. We're more than just a store; we're a community dedicated to delivering exceptional service and satisfaction to every customer. Whether you're seeking timeless fashion pieces or curated lifestyle products, we're here to inspire and support you on your journey. Welcome to Fellas Co., where your satisfaction is our top priority."</Text>
        
      </View>
      <View>

      </View>
    </ScrollView>
  );
}
//--------------------START OF CHECKOUT FUNCTION--------------------
function Checkout({ navigation }){
  return(
  <ScrollView>
    <Text style={{ fontSize: 30, textAlign: "center", width: "100%" }}>
      Checkout
    </Text>
  </ScrollView>
  );
}
//--------------------START OF THANKS FUNCTION--------------------
function Thanks({ navigation }){
  return(
  <ScrollView>
    <Text style={{ fontSize: 30, textAlign: "center", width: "100%" }}>
      Thank You!
    </Text>
  </ScrollView>
  );
}
//--------------------START OF CART FUNCTION--------------------
function Cart({ navigation }){
  return(
  <ScrollView>
    <Text style={{ fontSize: 30, textAlign: "center", width: "100%" }}>
      Cart
    </Text>
  </ScrollView>
  );
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
