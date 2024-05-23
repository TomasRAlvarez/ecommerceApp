import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { colors } from "../constants/colors";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "../services/authService";
import { setUser } from "../features/User/userSlice";
import { insertSession } from "../persistence/index";

const LoginScreen = ({ navigation }) => {
	const handleNavigate = () => {
		navigation.navigate("Register");
	};

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [triggerSignIn, result] = useSignInMutation();
	const dispatch = useDispatch();

	const handleLogin = () => {
		if (!email || !password) {
			Alert.alert("Error", "Falta Ingresar Datos");
		} else {
			triggerSignIn({
				email,
				password,
			});
		}
	};

	useEffect(() => {
		if (!result.isUninitialized && !result.isLoading) {
			if (result.isSuccess) {
				// insertSession({
				// 	email: result.data.email,
				// 	localId: result.data.localId,
				// 	token: result.data.idToken,
				// })
				// 	.then((response) => {
				// 		console.log(response);
				dispatch(
					setUser({
						email: result.data.email,
						idToken: result.data.idToken,
						localId: result.data.localId,
					})
				);
				// })
				// .catch((e) => console.log(e));
			} else {
				Alert.alert("Error", "Los datos ingresados son incorrectos");
			}
		}
	}, [result]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Iniciar Sesión</Text>
			<TextInput style={styles.input} placeholder='Correo Electrónico' value={email} onChangeText={setEmail} keyboardType='email-address' autoCapitalize='none' />
			<TextInput style={styles.input} placeholder='Contraseña' value={password} onChangeText={setPassword} secureTextEntry />
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text style={styles.buttonText}>Iniciar Sesión</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleNavigate()}>
				<Text style={styles.linkText}>¿No tienes una cuenta? Regístrate</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
		textAlign: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "grey",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
	},
	button: {
		backgroundColor: colors.primary,
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 16,
	},
	buttonText: {
		color: colors.background,
		fontSize: 16,
		fontWeight: "bold",
	},
	linkText: {
		color: "#007bff",
		textAlign: "center",
		marginTop: 16,
	},
});

export default LoginScreen;
