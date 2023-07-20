import React, { useState } from "react"
import CircleContext from "./circleContext"
import { SERVER } from "../../../constants"

const CircleState = props => {
	const host = SERVER
	const [users, setUsers] = useState(null)
	const [friendsProfile, setFriendsProfile] = useState(null)

	// ----------------- Request -----------------
	const request = async friend => {
		const response = await fetch(`${host}/accounts/request/${friend}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			}
		})
		return response.json()
	}

	// ----------------- Cancel Request -----------------
	const cancelrequest = async friend => {
		const response = await fetch(`${host}/accounts/cancelrequest/${friend}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			}
		})
		return response.json()
	}

	// ----------------- Decline Request -----------------
	const declinerequest = async friend => {
		const response = await fetch(`${host}/accounts/declinerequest/${friend}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			}
		})
		return response.json()
	}

	// ----------------- Handshake -----------------
	const handshake = async friend => {
		const response = await fetch(`${host}/accounts/handshake/${friend}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			}
		})
		return response.text()
	}

	// ----------------- Goodbye -----------------
	const goodbye = async friend => {
		const response = await fetch(`${host}/accounts/goodbye/${friend}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			}
		})
		return response.json()
	}

	// ----------------- Block -----------------
	const block = async friend => {
		const response = await fetch(`${host}/accounts/block/${friend}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			}
		})
		return response.json()
	}

	// ----------------- unblock -----------------
	const unblock = async friend => {
		const response = await fetch(`${host}/accounts/unblock/${friend}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			}
		})
		return response.json()
	}

	const getFriendsProfile = async friend => {
		const response = await fetch(`${host}/accounts/profile/${friend}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			}
		})
		const data = await response.json()
		setFriendsProfile(data)
	}

	const fetchUsers = async () => {
		const response = await fetch(`${host}/accounts/users`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			}
		})
		if (response?.ok) {
			const data = await response.json()
			setUsers(data)
		}
	}

	return (
		<CircleContext.Provider
			value={{
				request,
				cancelrequest,
				declinerequest,
				handshake,
				goodbye,
				block,
				unblock,
				users,
				fetchUsers,
				friendsProfile,
				getFriendsProfile
			}}
		>
			{props.children}
		</CircleContext.Provider>
	)
}

export default CircleState
