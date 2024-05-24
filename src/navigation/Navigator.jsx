import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/userSlice";
import { getSession } from "../persistence";

const Navigator = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				const response = await getSession();
				if (response.rows._array.length) {
					const user = response.rows._array[0];
					dispatch(
						setUser({
							email: user.email,
							idToken: user.idToken,
							localId: user.localId,
						})
					);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<NavigationContainer>
			<BottomTabNavigator />
		</NavigationContainer>
	);
};

export default Navigator;

const styles = StyleSheet.create({});
