import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../screens/Cart";

const CartNavigator = () => {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator
			initialRouteName='Cart'
			screenOptions={{
				headerShown: true,
				headerTitleAlign: "center",
			}}>
			<Stack.Screen component={Cart} name='Cart' />
		</Stack.Navigator>
	);
};

export default CartNavigator;

const styles = StyleSheet.create({});
