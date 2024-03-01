import React from "react";
import { ScrollView, Text, View, Button, Platform } from "react-native";
import { ProductBubble } from "../components/productBubble";
import { SafeAreaView } from "react-native-safe-area-context";

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


          </View>
        </View>
      </ScrollView>
  );
}

export default HomeScreen;