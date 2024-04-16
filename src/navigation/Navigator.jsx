import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import ItemListCtegory from "../screens/ItemListCtegory";
import ItemDetail from "../screens/ItemDetail";
import { colors } from "../constants/colors";

const Navigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Home'
				screenOptions={{
					headerTintColor: colors.text,
					headerTitleStyle: {
						fontSize: 20,
						fontWeight: "bold",
					},
				}}>
				<Stack.Screen component={Home} name='Home' />
				<Stack.Screen component={ItemListCtegory} name='ItemListCategory' />
				<Stack.Screen component={ItemDetail} name='ItemDetail' />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigator;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "black",
	},
});
