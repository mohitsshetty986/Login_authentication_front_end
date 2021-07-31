import React, { useEffect, useState } from "react";
import { StyleSheet, Screen, View, Text, Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";
// import AsyncStorage from "@react-native-community/async-storage";
//import { AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image style={{ width: 170, height: 30 }} source={require("./logo.jpg")} />
  );
}

const App = ({ navigation }) => {
  const [isloggedin, setLogged] = useState(null);
  const myAsyncEffect = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  };
  useEffect(() => {
    myAsyncEffect();
  }, []);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
              headerStyle: { height: 60 },
              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{
              headerStyle: { height: 60 },
              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />
          <Stack.Screen
            name="signup"
            component={SignupScreen}
            options={{
              headerStyle: { height: 60 },
              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
