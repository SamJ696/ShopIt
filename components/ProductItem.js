import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

const ProductItem = ({ item }) => {
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 30 }}>
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item.image }}
      />
      <Text numberOfLines={2} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹{item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rating.rate} rating
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10
        }}
      >
        <Text>Add To Cart</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
