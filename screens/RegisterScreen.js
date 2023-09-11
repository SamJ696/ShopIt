import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // Send a post request to the backend.
    axios
      .post(`https://e-commerce-git-main-samj696.vercel.app/register`, user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration Successful",
          "You have Registered successfully"
        );
        setName("");
        setPassword("");
        setEmail("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An Error occured during registration"
        );
        console.log("Registration Failed", error);
      });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100, marginTop: 30 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: "bold",
              marginTop: 10,
              color: "#041E42",
            }}
          >
            Register for your account
          </Text>
        </View>

        <View style={{ marginTop: 60 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 9,
              marginTop: 35,
            }}
          >
            <FontAwesome
              style={{ marginLeft: 10 }}
              name="user"
              size={24}
              color="black"
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "gray",
                marginVertical: 3,
                width: 305,
                fontSize: 15,
              }}
              placeholder="Enter Your Name"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 9,
              marginTop: 35,
            }}
          >
            <Entypo
              style={{ marginLeft: 10 }}
              name="mail"
              size={24}
              color="black"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 3,
                width: 305,
                fontSize: 15,
              }}
              placeholder="Enter Your Email"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 9,
              marginTop: 35,
            }}
          >
            <Entypo
              style={{ marginLeft: 10 }}
              name="key"
              size={24}
              color="black"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                color: "gray",
                marginVertical: 3,
                width: 305,
                fontSize: 15,
              }}
              placeholder="Enter Your Password"
              secureTextEntry
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 9,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Keep me Logged In</Text>
          <Text style={{ color: "#007FFF", fontWeight: "600" }}>
            Forgot Password
          </Text>
        </View>

        <View style={{ marginTop: 55 }} />

        <TouchableOpacity
          onPress={handleRegister}
          style={{
            widht: 180,
            backgroundColor: "#FEBE10",
            borderRadius: 8,
            padding: 14,
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
          >
            Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 14 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}>
            Already have an account ? Sign In
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
