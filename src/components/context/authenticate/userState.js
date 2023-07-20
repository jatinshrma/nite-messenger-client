import React, { useState } from "react"
import UserContext from "./userContext"
import axios from "axios"
import { SERVER } from "../../../constants"

const UserState = props => {
	const host = SERVER
	const [profile, setProfile] = useState(null)
	const [user, setUser] = useState({
		username: localStorage.getItem("user") || "",
		token: localStorage.getItem("token") || ""
	})

	// ----------------- Login User -----------------
	const login = async credentials => {
		const response = await fetch(`${host}/accounts/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(credentials)
		})

		const data = await response.json()
		if (data?.Token) {
			localStorage.setItem("token", data.Token)
			localStorage.setItem("user", credentials.username)

			await getProfile()
			setUser({
				username: credentials.username,
				token: data.Token
			})
			return true
		} else {
			console.log("Credentials are not valid.")
			return false
		}
	}

	// ----------------- Signup -----------------
	const signup = async credentials => {
		const response = await fetch(`${host}/accounts/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(credentials)
		})

		const data = await response.json()
		if (data?.Token) {
			localStorage.setItem("token", data.Token)
			localStorage.setItem("user", credentials.username)

			await getProfile()
			setUser({
				username: credentials.username,
				token: data.Token
			})
			return true
		} else {
			console.log("Credentials are not valid.")
			return false
		}
	}

	// ----------------- Fetch user's profile -----------------
	const getProfile = async () => {
		const response = await fetch(`${host}/accounts/profile`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			}
		})

		if (response?.ok) {
			const data = await response.json()
			setProfile(data)
			return data
		} else return null
	}

	// ----------------- Upload image -----------------
	const [imageResponse, setImageResponse] = useState("")
	const uploadPicture = async file => {
		const formData = new FormData()
		formData.append("imageFile", file)

		await axios
			.post(`${host}/dp/upload`, formData)
			.then(res => {
				setImageResponse(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}

	// ----------------- Get image file -----------------
	const getImageFile = async filename => {
		const response = await fetch(`${host}/dp/files/${filename}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		const data = await response.json()
		return data
	}

	// ----------------- Delete image -----------------
	const deletePicture = async id => {
		axios.delete(`${host}/dp/files/${id}`).catch(err => {
			console.log(err)
		})
	}

	// ----------------- Update user's profile -----------------
	const updateProfile = async (data, user) => {
		const response = await fetch(`${host}/accounts/profile/update`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			},
			body: JSON.stringify(data)
		})
		await response.json()
	}

	return (
		<UserContext.Provider
			value={{
				// Functions
				signup,
				login,
				getProfile,
				updateProfile,
				uploadPicture,
				deletePicture,
				imageResponse,
				getImageFile,

				// States
				profile,
				setProfile,
				user,
				setUser
			}}
		>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserState
