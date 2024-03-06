import React from "react";
import { useState } from "react";
import { ScrollView, Text, View, Button, Platform, TextInput, Image, TouchableOpacity,  } from "react-native";
import { ProductBubble } from "../components/productBubble";
import { SafeAreaView } from "react-native-safe-area-context";

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
    { name: 'product 5', price: '50.00' }
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
              <Image source={require("../assets/Square_200x200.png")} style={{ height: 200, width: '100%' }} />
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

export default HomeScreen;