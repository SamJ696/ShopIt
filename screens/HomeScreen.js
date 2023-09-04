import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image:
        "https://img.freepik.com/premium-vector/cake-batter-mixer-flat-icon-logo-design_947353-75.jpg",
      name: "Home",
    },

    {
        id: "1",
        image: "https://cdn4.iconfinder.com/data/icons/flat-pro-business-set-1/32/sale-red-512.png",
        name: "Deals"
    },

    {
        id: "2",
        image: "https://banner2.cleanpng.com/20190615/sob/kisspng-microwave-ovens-computer-icons-home-appliance-vect-microwave-vector-flat-transparent-amp-png-clipar-5d04f3049515f7.0092908315606054446107.jpg",
        name: "Electronics"
    }
  ];

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 30 : 0,
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <ScrollView>
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

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 5,
            padding: 10,
            backgroundColor: "#AFEEEE",
          }}
        >
          <MaterialIcons name="location-pin" size={24} color="black" />
          <Pressable>
            <Text style={{ fontSize: 15, fontWeight: "500", left: 20 }}>
              Deliver to Samyak - Rohini Delhi-110085
            </Text>
          </Pressable>

          <Entypo
            style={{ alignSelf: "center", top: -3, left: 25 }}
            name="chevron-down"
            size={24}
            color="black"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
