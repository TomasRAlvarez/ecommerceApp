import { StyleSheet, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import ProfileNavigator from "./ProfileNavigator";

const BottomTabNavigator = () => {
	const Tab = createBottomTabNavigator();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: styles.tabNav,
			}}>
			<Tab.Screen
				name='Shop'
				component={ShopNavigator}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View>
								<FontAwesome6 name='bag-shopping' size={24} color={focused ? "black" : "white"} />
							</View>
						);
					},
				}}
			/>
			<Tab.Screen
				name='CartNavigator'
				component={CartNavigator}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View>
								<FontAwesome6 name='cart-shopping' size={24} color={focused ? "black" : "white"} />
							</View>
						);
					},
				}}
			/>
			<Tab.Screen
				name='ProfileNavigator'
				component={ProfileNavigator}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View>
								<FontAwesome6 name='user' size={24} color={focused ? "black" : "white"} />
							</View>
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
	tabNav: {
		height: 60,
		backgroundColor: colors.primary,
	},
});
