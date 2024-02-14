import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform, ScrollView, Button, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductBubble from './Components.js';

function HomeScreen({ navigation }) {
  return (
    <ScrollView>
      <Text style={{fontSize:30, textAlign:'center', width:'100%',}}>Welcome to{"\n"}Fellas Clothing CO</Text>
      <Text>Home Screen</Text>
      <Button
        title="Go to Products"
        onPress={() => {
          // navigation.navigate('Products', {productId: 'ca724'}); // use navigate to go to an existing screen
          navigation.push('Products', {productId: 'ca724'}); // use push to create a new screen
        }}
        >
      </Button>
      <View style={
      { 
        flex: 1, 
        alignItems: 'center', 
        // justifyContent: 'center' 
        paddingTop: 20,
        alignSelf: 'center',
        // borderColor: 'black',
        // borderWidth: 2,
        margin: 10,

        
    }}>
      

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'left',
        width: '100%',
        alignSelf: 'center',
        
        ...Platform.select({
          web: {
            maxWidth:1000
          }
        })
      }}>
      <ProductBubble image="https://media.gucci.com/style/DarkGray_Center_0_0_980x980/1584562506/628717_H9H80_1074_001_100_0000_Light-Mens-Gucci-Off-The-Grid-high-top-sneaker.jpg" price="23.75" name="Shoe" navigation={navigation} />
      <ProductBubble image="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFBGrDfewGS86JSoe8g4ywc4KtHtaomDauwj2HUTkPTZOJBj0tea2cH09Dd3hH_IMwcQSbI8Nmeh7bum0KdvfiyJki0yKWZVr5-F12CCIWWz8Z5SvsRUKh&usqp=CAc" price="23.75" name="Belt" navigation={navigation}/>
      <ProductBubble image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg" price="23.75" name="Corn Dog" navigation={navigation}/>
      <ProductBubble image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg" price="23.75" name="Corn Dog" navigation={navigation}/>
      <ProductBubble image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg" price="23.75" name="Corn Dog" navigation={navigation}/>
      <ProductBubble image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg" price="23.75" name="Corn Dog" navigation={navigation}/>
      <ProductBubble image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg" price="23.75" name="Corn Dog" navigation={navigation}/>
      <ProductBubble image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg" price="23.75" name="Corn Dog" navigation={navigation}/>
      <ProductBubble image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg" price="23.75" name="Corn Dog" navigation={navigation}/>
      </View>
    </View>
    </ScrollView>
  );
}


function ProductScreen({ route, navigation }) {
  const { productId, url, price, productName} = route.params;
  console.log(route.params);
  const onPress = () => {
    console.log('Add to cart');
  }
  return (
    <View style={
      { 
        flex: 1, 
        alignItems: 'center', 
        // justifyContent: 'center' 
        paddingTop: 50
    }}>
    
        {url ?(
          <Image source={{uri: url}} style={{height:200, width:200}}/>
        ) :
          <Image source={require('./assets/Square_200x200.png')}/>
        }
      <Text style={{fontSize:30, textAlign:'center'}}>{productName || "none"}</Text>
      <Text>${price|| "0.00"}</Text>
      <TouchableOpacity onPress={onPress} style={{backgroundColor: 'rgba(173, 216, 230, 0.8)', padding: 10, borderRadius:9 }}>
        <Text style={{fontSize:20}}>Add To Cart</Text>
      </TouchableOpacity>

    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Products" component={ProductScreen} initialParams={{productId:'ca724'}} />
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
