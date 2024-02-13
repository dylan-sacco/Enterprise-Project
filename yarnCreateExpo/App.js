import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={
      { 
        flex: 1, 
        alignItems: 'center', 
        // justifyContent: 'center' 
        paddingTop: 50
    }}>
      <Text style={{fontSize:30, textAlign:'center'}}>Welcome to{"\n"}Fellas Clothing CO</Text>
      <Text>Home Screen</Text>
    </View>
  );
}

function ProductScreen() {
  return (
    <View style={
      { 
        flex: 1, 
        alignItems: 'center', 
        // justifyContent: 'center' 
        paddingTop: 50
    }}>
      <Text style={{fontSize:30, textAlign:'center'}}>Products</Text>
      <Text>Product Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
