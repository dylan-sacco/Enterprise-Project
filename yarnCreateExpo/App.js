


//--------------------SYSTEM IMPORTS--------------------
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";

//--------------------NAVIGATION IMPORTS--------------------
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer'; // Import createDrawerNavigator
import {
  useNavigation,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

//--------------------CUSTOM IMPORTS--------------------
import { ProductBubble, CheckBox } from "./Components.js";

//--------------------FIREBASE IMPORTS--------------------
import "./firebaseConfig.js";
import { app, auth } from "./firebaseConfig.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCustomToken,
  createCustomToken,
} from "firebase/auth";

//--------------------NAV DECLARATIONS--------------------
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthContext = React.createContext();

//--------------------STACK METHODS--------------------
function CheckoutNavigator(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={Cart}/>
      <Stack.Screen name="Checkout" component={Checkout}/>
      <Stack.Screen name="Thanks" component={Thanks}/>
    </Stack.Navigator>
  );
}
function SettingsNavigator(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={settings} />
      <Stack.Screen name="Account" component={account} />
    </Stack.Navigator>
  );
}
function WelcomeNavigator(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={welcome} />
    </Stack.Navigator>
  );
}
function ShoppingNavigator(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
          
      <Stack.Screen name="Products" component={ProductScreen} initialParams={{ productId: 'ca724' }} />

      
      
    </Stack.Navigator>
  );
}
//--------------------START OF SIGNIN FUNCTION--------------------
function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { signIn } = React.useContext(AuthContext);
  function setErrorCodes(error) {
    const { code, message } = error;
    let formattedCode =
      code !== null
        ? code.replace("auth/", "").replace(/-/g, " ").toUpperCase()
        : "";
    setEmailError(formattedCode);
  }
  const signin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        signIn({ token: user.stsTokenManager.accessToken });
      })
      .catch((error) => {
        setErrorCodes(error);
      });
  };
  const signup = async () => {
    // empty for now
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        signIn({ token: user.stsTokenManager.accessToken });
      })
      .catch((error) => {
        setErrorCodes(error);
      });
  };

  return (
    <View style={{ padding: 20, maxWidth: 800 }}>
      <Text>Sign In</Text>
      <Text>Email</Text>

      <TextInput
        autoComplete="email"
        placeholder="Email"
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text>Password</Text>
      <TextInput
        placeholder="Password"
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      {emailError ? <Text style={{ color: "red" }}>{emailError}</Text> : null}
      <Button title="Log In" onPress={signin} />
      <Button title="Sign Up" onPress={signup} />
    </View>
  );
}
//--------------------START OF HOMESCREEN FUNCTION--------------------
function HomeScreen({ navigation }) {
  return (
    <ScrollView>
      <Text style={{ fontSize: 30, textAlign: "center", width: "100%" }}>
        Welcome to{"\n"}Fellas Clothing CO
      </Text>
      
      {/*<Button
        title="Go to Products"
        onPress={() => {
          // navigation.navigate('Products', {productId: 'ca724'}); // use navigate to go to an existing screen
          navigation.push("Products", { productId: "ca724" }); // use push to create a new screen
        }}
      ></Button>*/}

      <Button
        title="Print user to Logs"
        onPress={() => {
          console.log(auth.currentUser);
          console.log("User is signed " + isSignedIn);
        }}
      ></Button>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          // justifyContent: 'center'
          paddingTop: 20,
          alignSelf: "center",
          // borderColor: 'black',
          // borderWidth: 2,
          margin: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "left",
            width: "100%",
            alignSelf: "center",

            ...Platform.select({
              web: {
                maxWidth: 1200,
              },
            }),
          }}
        >
          <ProductBubble
            image="https://media.gucci.com/style/DarkGray_Center_0_0_980x980/1584562506/628717_H9H80_1074_001_100_0000_Light-Mens-Gucci-Off-The-Grid-high-top-sneaker.jpg"
            price="23.75"
            name="Shoe"
          />

          <ProductBubble
            image="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFBGrDfewGS86JSoe8g4ywc4KtHtaomDauwj2HUTkPTZOJBj0tea2cH09Dd3hH_IMwcQSbI8Nmeh7bum0KdvfiyJki0yKWZVr5-F12CCIWWz8Z5SvsRUKh&usqp=CAc"
            price="23.75"
            name="Belt"
          />

          <ProductBubble
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg"
            price="23.75"
            name="Corn Dog"
          />

          <ProductBubble
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg"
            price="23.75"
            name="Corn Dog"
          />

          <ProductBubble
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg"
            price="23.75"
            name="Corn Dog"
          />

          <ProductBubble
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg"
            price="23.75"
            name="Corn Dog"
          />

          <ProductBubble
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg"
            price="23.75"
            name="Corn Dog"
          />

          <ProductBubble
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg"
            price="23.75"
            name="Corn Dog"
          />

          <ProductBubble
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg"
            price="23.75"
            name="Corn Dog"
          />

          <ProductBubble
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg"
            price="23.75"
            name="Corn Dog"
          />
        </View>
      </View>
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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        // justifyContent: 'center'
        paddingTop: 50,
      }}
    >
      {url ? (
        <Image source={{ uri: url }} style={{ height: 200, width: 200 }} />
      ) : (
        <Image source={require("./assets/Square_200x200.png")} />
      )}
      <Text style={{ fontSize: 30, textAlign: "center" }}>
        {productName || "none"}
      </Text>
      <Text>${price || "0.00"}</Text>
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
    </View>
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
  return(
  <ScrollView>
    <Text style={{ fontSize: 30, textAlign: "center", width: "100%" }}>
      Welcome!
    </Text>
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
  // const navigation = useNavigation();
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return { ...prevState, userToken: action.token, isLoading: false };
        case "SIGN_IN":
          return { ...prevState, isSignout: false, userToken: action.token };
        case "SIGN_OUT":
          return { ...prevState, isSignout: true, userToken: null };
      }
    },
    { isLoading: true, isSignout: false, userToken: null },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
        console.log(e);
        console.log("Failed to restore token");
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.

      // dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        console.log(data);
        // In a production app, we need to send some data (usually username, password) to server and get a token

        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        dispatch({ type: "SIGN_IN", token: data.token });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <Drawer.Navigator>
        {state.userToken != null ? (
          //START FRAGMENT
          <>
          <Drawer.Screen name="Home" component={WelcomeNavigator} />
          <Drawer.Screen name="Shopping" component={ShoppingNavigator} />
          <Drawer.Screen name="Settings" component={SettingsNavigator} />
          </>
          //END FRAGMENT
        ) : (
          <Drawer.Screen name="SignIn" component={SignIn} />
        )}
        
      </Drawer.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
  },
});
//hi
