import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { Card, Button, Icon } from "@rneui/themed";

import Deck from "./src/Deck";
import { useState } from "react";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "https://images.pexels.com/photos/7979104/pexels-photo-7979104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "https://images.pexels.com/photos/8389802/pexels-photo-8389802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "https://images.pexels.com/photos/8389962/pexels-photo-8389962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "https://images.pexels.com/photos/7503464/pexels-photo-7503464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];
const DATA2 = [
  {
    id: 5,
    text: "Card #5",
    uri: "https://images.pexels.com/photos/1193942/pexels-photo-1193942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 6,
    text: "Card #6",
    uri: "https://images.pexels.com/photos/4386403/pexels-photo-4386403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 7,
    text: "Card #7",
    uri: "https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 8,
    text: "Card #8",
    uri: "https://images.pexels.com/photos/3656275/pexels-photo-3656275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function App() {
  const [dataToRender, setDataToRender] = useState(DATA);
  const renderCard = (item) => {
    return (
      <Card key={item.id}>
        <Card.Title>{item.text}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: item.uri }} />
        <Button
          icon={
            <Icon name="code" color="white" iconStyle={{ marginRight: 10 }} />
          }
        >
          VIEW NOW
        </Button>
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>All Done!</Card.Title>
        <Card.Divider />
        <Text>There's no more content here!</Text>
        <Button
          onPress={() => {
            setDataToRender(DATA2);
          }}
          icon={
            <Icon name="code" color="white" iconStyle={{ marginRight: 10 }} />
          }
        >
          GET MORE!
        </Button>
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <Deck
        data={dataToRender}
        renderCard={renderCard}
        onSwipeRight={() => {
          console.log("right");
        }}
        onSwipeLeft={() => {
          console.log("left");
        }}
        renderNoMoreCards={renderNoMoreCards}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
