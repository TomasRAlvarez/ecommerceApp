import { StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import UserData from "../components/UserData";
import Orders from "../components/Orders";
import LoginScreen from "./LoginScreen";
import { useSelector } from "react-redux";

const Profile = ({ navigation }) => {
	const user = useSelector((state) => state.userReducer.value.user);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "Perfil",
		});
	}, [navigation]);

	if (user) {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<UserData user={user} />
				<Orders navigation={navigation} />
			</ScrollView>
		);
	} else {
		return <LoginScreen navigation={navigation} />;
	}
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
});
