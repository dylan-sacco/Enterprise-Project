
import * as React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



//HOME PAGE
function Home({navigation}){
  return(
  <View style={styles.container}>
      <Text>Home Page Test</Text>
      <Button title="Go to Shopping" onPress={() => navigation.navigate('Shopping')}/>
      <Button title="Go to Details" onPress={() => navigation.navigate('Cart')}/>

  </View>
  )
}
//SHOPPING PAGE
function Shopping(){
  return(
  <View style={styles.container}>
      <Text>Shopping Page Test</Text>
  </View>
  )
}
//CART PAGE
function Cart(){
  return(
  <View style={styles.container}>
      <Text>Cart Page Test</Text>
  </View>
  )
}



//this is for declaring the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    //doc said we only need one nav container and all our interface code needs to be in it - Amir
  <NavigationContainer>
   <Stack.Navigator>

      <Stack.Screen name="Home" component={Home} options={{title: 'Home'}}/>

      <Stack.Screen name="Shopping" component={Shopping} options={{title: 'Shopping'}}/>

      <Stack.Screen name="Cart" component={Cart} options={{title: 'Cart'}}/>

   </Stack.Navigator> 
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
