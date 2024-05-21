import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import RegisterScreen from "../screens/RegisterScreen";

const ProfileNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator
			initialRouteName='Profile'
			screenOptions={{
				headerShown: true,
				headerTitleAlign: "center",
			}}>
			<Stack.Screen component={Profile} name='Profile' />
			<Stack.Screen component={RegisterScreen} name='Register' />
		</Stack.Navigator>
	);
};

export default ProfileNavigator;

const styles = StyleSheet.create({});
