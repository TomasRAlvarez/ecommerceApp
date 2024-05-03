import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home.jsx";
import ItemListCategory from "../screens/ItemListCategory.jsx";
import ItemDetail from "../screens/ItemDetail.jsx";

const ShopNavigator = () => {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator
			initialRouteName='Home'
			screenOptions={{
				headerShown: true,
				headerTitleAlign: "center",
			}}>
			<Stack.Screen component={Home} name='Home' />
			<Stack.Screen component={ItemListCategory} name='ItemListCategory' />
			<Stack.Screen component={ItemDetail} name='ItemDetail' />
		</Stack.Navigator>
	);
};

export default ShopNavigator;

const styles = StyleSheet.create({});
