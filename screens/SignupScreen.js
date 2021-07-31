import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { isValidEmail, updateError } from "../utils/Validation";
// import AsyncStorage from "@react-native-community/async-storage";
//import { AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SignupScreen = (props) => {
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
        await fetch("http://10.0.2.2:3000/signup", {
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
              console.log("There's an error", e);
            }
          });
      } catch (err) {
        console.log("Already exists");
        return updateError("USer already exists! Try another email", setError);
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
          Quick Registration
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Professional
        </Text>
        <View
          style={{
            alignItems: "center",
            borderBottomColor: "#26C49E",
            borderBottomWidth: 2,
            marginLeft: 60,
            marginRight: 60,
            marginTop: 4,
          }}
        />
        <Text
          style={{
            fontSize: 13,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Create your free profile. Let us bring the job that needs YOU!
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
          onChangeText={(text) => setEmail(text)}
          style={{ marginLeft: 18, marginRight: 18, height: 40, marginTop: 18 }}
          theme={{ colors: { primary: "red" } }}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={{ marginLeft: 18, marginRight: 18, height: 40, marginTop: 18 }}
          theme={{ colors: { primary: "red" } }}
        />
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
          signup
        </Button>

        <Text
          style={{
            fontSize: 13,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Already Registered
        </Text>

        <TouchableOpacity>
          <Button
            mode="contained"
            color={"#f08e25"}
            style={{
              fontSize: 18,
              borderRadius: 20,
              backgroundColor: "#E9EBEE",
              marginTop: 20,
              marginLeft: 120,
              marginRight: 120,
            }}
            onPress={() => props.navigation.replace("login")}
          >
            Login
          </Button>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignupScreen;
