import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (error) {
        console.log("Error Message", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;

        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid Email");
        console.log(error);
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
            Login to your account
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
          onPress={handleLogin}
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
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 14 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}>
            Don't have an account ? Sign Up{" "}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
