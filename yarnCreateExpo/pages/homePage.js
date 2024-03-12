import React from "react";
import { useState } from "react";
import { ScrollView, Text, View, Button, Platform, TextInput, Image, TouchableOpacity,  } from "react-native";
import { ProductBubble } from "../components/productBubble";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "../styles/styles.js";

function HomeScreen({ navigation }) {

  const [products, setProducts] = useState([
    { name: 'Shoe', price: 23.75, image: 'https://media.gucci.com/style/DarkGray_Center_0_0_980x980/1584562506/628717_H9H80_1074_001_100_0000_Light-Mens-Gucci-Off-The-Grid-high-top-sneaker.jpg' },
    { name: 'Belt', price: 23.75, image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQFBGrDfewGS86JSoe8g4ywc4KtHtaomDauwj2HUTkPTZOJBj0tea2cH09Dd3hH_IMwcQSbI8Nmeh7bum0KdvfiyJki0yKWZVr5-F12CCIWWz8Z5SvsRUKh&usqp=CAc' },
    { name: 'Corn Dog', price: 23.75, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg' },
  ]);

  const addMoreProducts = () => {
    setProducts([
      ...products,
      {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg", price: "23.75", name: "Corn Dog"},
      // Add more products here
    ]);
  };

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
      <Button
        title="Print user to Logs"
        onPress={() => {
          console.log(auth.currentUser);
          console.log("User is signed " + isSignedIn);
        }}
        >
      </Button>
      <View 
      style={
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
      

      <View 
        style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'left', width: '100%', alignSelf: 'center', ...Platform.select({ web: { maxWidth:1000 } })}} 
        id=""
      >
        {products.map((product, index) => ( <ProductBubble key={index} image={product.image} price={product.price} name={product.name}/> ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={addMoreProducts}>
        <Text>View More</Text>
      </TouchableOpacity>
    </View>

    </ScrollView>
  );
}


export default HomeScreen;