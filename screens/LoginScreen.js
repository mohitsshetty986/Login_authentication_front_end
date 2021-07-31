import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
//import { AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isValidEmail, updateError } from "../utils/Validation";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const isValidForm = () => {
    if (!isValidEmail(email)) return updateError("Invalid email!", setError);
    if (!password.trim() || password.length < 8)
      return updateError("Password is less then 8 characters!", setError);
    // if (password !== confirmPassword)
    //   return updateError("Password does not match!", setError);

    return true;
  };

  const sendCred = async (props) => {
    if (isValidForm()) {
      try {
        await fetch("http://10.0.2.2:3000/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            try {
              await AsyncStorage.setItem("token", data.token);
              props.navigation.replace("home");
            } catch (e) {
              Alert(e);
              console.log(e);
            }
          });
      } catch (err) {
        console.log("Not a registered account!");
        return updateError("Not a registered account!", setError);
      }
    }
  };

  return (
    <>
      <KeyboardAvoidingView behavior="position">
        <StatusBar backgroundColor="#26C49E" barStyle="light-content" />
        <Text
          style={{
            fontSize: 22,
            marginLeft: 18,
            marginTop: 15,
            color: "black",
          }}
        >
          Login
        </Text>

        {error ? (
          <Text
            style={{
              color: "red",
              fontSize: 14,
              marginTop: 15,
              textAlign: "center",
            }}
          >
            {error}
          </Text>
        ) : null}

        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          style={{ marginLeft: 18, height: 40, marginRight: 18, marginTop: 38 }}
          theme={{ colors: { primary: "red" } }}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="password"
          mode="outlined"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          style={{ marginLeft: 18, height: 40, marginRight: 18, marginTop: 12 }}
          theme={{ colors: { primary: "red" } }}
        />
        <Text
          style={{
            fontSize: 13,
            marginRight: 18,
            marginTop: 18,
            color: "black",
            textAlign: "right",
          }}
        >
          Forgot Password?
        </Text>
        <Button
          mode="contained"
          style={{
            marginLeft: 18,
            marginRight: 18,
            marginTop: 18,
            borderRadius: 20,
            backgroundColor: "#26C49E",
            height: 40,
          }}
          onPress={() => sendCred(props)}
        >
          Login
        </Button>

        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                marginTop: 20,
                fontStyle: "italic",
              }}
            >
              Not Registered{" "}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 20,
                fontStyle: "italic",
                textDecorationLine: "underline",
              }}
              onPress={() => props.navigation.replace("signup")}
            >
              Sign Up
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
