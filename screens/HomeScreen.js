import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = (props) => {
  // const [token, setToken] = useState();
  // const fetchtoken = async () => {
  //   const token2 = await AsyncStorage.getItem("token");
  //   setToken(token2);
  // };
  const [email, setEmail] = useState("Loading");
  const boiler = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch("http://10.0.2.2:3000/", {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email);
      });
  };
  useEffect(() => {
    boiler();
  }, []);

  const logout = (props) => {
    AsyncStorage.removeItem("token").then(() => {
      props.navigation.replace("login");
    });
  };
  return (
    <>
      <Text style={{ fontSize: 18 }}>your email is {email}</Text>
      <Button
        mode="contained"
        style={{
          marginLeft: 18,
          backgroundColor: "#26C49E",
          marginRight: 18,
          marginTop: 18,
          borderRadius: 20,
        }}
        onPress={() => logout(props)}
      >
        logout
      </Button>
    </>
  );
};

export default HomeScreen;
