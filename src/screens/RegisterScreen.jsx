import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { colors } from "../constants/colors";
import { useSignUpMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/userSlice";
import { insertSession } from "../persistence/index";

const RegisterScreen = ({ navigation }) => {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "Perfil",
		});
	}, [navigation]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [triggerRegister, result] = useSignUpMutation();
	const dispatch = useDispatch();

	const handleRegister = () => {
		if (!email || !password) {
			Alert.alert("Error", "Falta Ingresar Datos");
		} else if (!isValidEmail(email)) {
			Alert.alert("Cuidado", "El email ingresado no es valido");
		} else if (password.length < 6) {
			Alert.alert("Cuidado", "La contraseña debe tener al menos 6 caracteres");
		} else if (password !== passwordConfirm) {
			Alert.alert("Error", "La contraseñas no coinciden");
		} else {
			triggerRegister({
				email,
				password,
				returnSecureToken: true,
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
				dispatch(
					setUser({
						email: result.data.email,
						idToken: result.data.idToken,
						localId: result.data.localId,
					})
				);
				navigation.navigate("Profile");
				// })
				// .catch((e) => console.log(e));
			} else {
				if (result.error.data.error.errors[0].message === "EMAIL_EXISTS") {
					Alert.alert("Error", "El mail ingresado ya esta registrado");
					setEmail("");
				} else {
					Alert.alert("Error", result.error.data.error.errors[0].message);
				}
			}
		}
	}, [result]);

	const isValidEmail = (mail) => {
		// Expresión regular para validar el formato del correo electrónico
		const emailRegex = /\S+@\S+\.\S+/;
		return emailRegex.test(mail);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Registrarse</Text>
			<TextInput style={styles.input} placeholder='Correo Electrónico' value={email} onChangeText={setEmail} keyboardType='email-address' autoCapitalize='none' />
			<TextInput style={styles.input} placeholder='Contraseña' value={password} onChangeText={setPassword} secureTextEntry />
			<TextInput style={styles.input} placeholder='Confirmar lContraseña' value={passwordConfirm} onChangeText={setPasswordConfirm} secureTextEntry />
			<TouchableOpacity style={styles.button} onPress={handleRegister}>
				<Text style={styles.buttonText}>Registrarse</Text>
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

export default RegisterScreen;
