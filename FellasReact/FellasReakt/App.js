
import * as React from 'react';
import * as ReactNative from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



//HOME PAGE
function Home({navigation}){
  <View style={styles.container}>
      <text>Home Page Test</text>
      <Button title="Go to Shopping" onPress={() => navigation.navigate('Shopping')}/>
      <Button title="Go to Details" onPress={() => navigation.navigate('Cart')}/>

  </View>
}
//SHOPPING PAGE
function Shopping(){
  <View style={styles.container}>
      <text>Shopping Page Test</text>
  </View>
}
//CART PAGE
function Cart(){
  <View style={styles.container}>
      <text>Cart Page Test</text>
  </View>
}



//this is for declaring the stack navigator
const Stack = createNativeStackNavigator();

function App() {
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
export default App;


//StyleSheets
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
