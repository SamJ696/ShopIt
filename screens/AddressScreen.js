import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };

    axios
      .post("http://localhost:8000/addresses", { userId, address })
      .then((response) => {
        Alert.alert("Success", "Address added successfully");
        setName("");
        setMobileNo("");
        setHouseNo("");
        setStreet("");
        setLandmark("");
        setPostalCode("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to Add Address");
        console.log("Error", error);
      });
  };

  return (
    <ScrollView style={{ marginTop: 30 }}>
      <View style={{ height: 50, backgroundColor: "#00CED1" }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new Address
        </Text>

        <TextInput
          placeholderTextColor={"black"}
          placeholder="India"
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 7,
          }}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 7,
            }}
            placeholder="Enter Your Name"
            placeholderTextColor={"black"}
          />
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Mobile Number
          </Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            keyboardType="numeric"
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 7,
            }}
            placeholder="Enter Your Mobile Number"
            placeholderTextColor={"black"}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Flat / House Number / Building
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 7,
            }}
            placeholder=""
            placeholderTextColor={"black"}
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Area / Street / Sector / Village
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 7,
            }}
            placeholder=""
            placeholderTextColor={"black"}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 7,
            }}
            placeholder="Eg : Near Mega Mall"
            placeholderTextColor={"black"}
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>
          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 7,
            }}
            placeholder="Enter Pincode"
            placeholderTextColor={"black"}
          />
        </View>

        <TouchableOpacity
          onPress={handleAddAddress}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Add Address</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
