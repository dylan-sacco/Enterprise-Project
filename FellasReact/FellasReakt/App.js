
import * as React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



//HOME PAGE
function Home({navigation}){
  return(
  <View style={styles.container}>
      <Text>Home Page Test</Text>
      <Button title="Go to Shopping" onPress={() => navigation.navigate('Shopping')}/>
  </View>
  )
}
//SHOPPING PAGE
function Shopping({navigation}){
  return(
  <View style={styles.container}>
      <Text>Shopping Page Test</Text>
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')}/>
  </View>
  )
}
//CART PAGE
function Cart({navigation}){
  return(
  <View style={styles.container}>
      <Text>Cart Page Test</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')}/>
  </View>
  )
}



//this is for declaring the stack navigator
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


export default function App() {
  return (
    //doc said we only need one nav container and all our interface code needs to be in it - Amir
  <NavigationContainer>
   <Drawer.Navigator initialRouteName="Home" >

      <Drawer.Screen name="Home" component={Home} options={{title: 'Home'}}/>

      <Drawer.Screen name="Shopping" component={Shopping} options={{title: 'Shopping'}}/>

      <Drawer.Screen name="Cart" component={Cart} options={{title: 'Cart'}}/>

   </Drawer.Navigator> 
  </NavigationContainer>
  );
}



//StyleSheets
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
