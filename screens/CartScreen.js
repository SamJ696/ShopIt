import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacityBase,
} from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
    const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <ScrollView style={{ marginTop: 30, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 5,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 5,
            flex: 1,
            height: 35,
          }}
        >
          <Ionicons
            style={{ marginLeft: 10 }}
            name="search"
            size={24}
            color="black"
          />
          <TextInput placeholder="Search" />
        </Pressable>

        <Feather name="mic" size={24} color="black" />
      </View>

      <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal : </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>₹{total}</Text>
      </View>

      {/* <Text style={{ marginHorizontal: 10 }}>EMI Details</Text> */}

      {cart.length >= 1 ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Confirm")}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Text>Proceed to buy {cart.length} items.</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text
            style={{ textAlign: "center", fontSize: 18, fontWeight: "600" }}
          >
            Add Items into your cart
          </Text>
        </>
      )}

      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 1,
          marginTop: 16,
        }}
      />

      <View style={{ marginHorizontal: 10 }}>
        {cart.map((item, index) => (
          <View
            style={{
              backgroundColor: "white",
              marginVertical: 10,
              borderBottomColor: "#F0F0F0",
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
            key={index}
          >
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: "row",
                marginBottom: 15,
              }}
            >
              <Image
                style={{ width: 140, height: 140, resizeMode: "contain" }}
                source={{ uri: item.image }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text numberOfLines={2} style={{ width: 230, marginTop: 10 }}>
                  {item.title}
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}
                >
                  ₹{item.price}
                </Text>

                <Image
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                  source={{
                    uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                  }}
                />
                <Text style={{ color: "green" }}>In Stock</Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                marginTop: 7,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 8,
                }}
              >
                {item.quantity > 1 ? (
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 10,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <Entypo name="minus" size={24} color="black" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => deleteItem(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 10,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                )}

                <Pressable
                  style={{
                    paddingHorizontal: 18,
                    paddingVertical: 6,
                    backgroundColor: "white",
                  }}
                >
                  <Text>{item.quantity}</Text>
                </Pressable>

                <TouchableOpacity
                  onPress={() => increaseQuantity(item)}
                  style={{
                    backgroundColor: "#D8D8D8",
                    padding: 10,
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                >
                  <Feather name="plus" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => deleteItem(item)}
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 8,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 8,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>Save For Later</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 8,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>See more like this</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
