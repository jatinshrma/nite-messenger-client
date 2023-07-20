import { useState } from "react"
import MssgContext from "./mssgContext"
import { SERVER } from "../../../constants"

const MssgState = props => {
	const [chat, setChat] = useState([])
	const host = SERVER

	const getMessages = async friend => {
		const response = await fetch(`${host}/messages/${friend}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			}
		})
		const content = await response.json()
		setChat(content)
	}

	// Send
	const sendMessage = async (message, friend, status) => {
		const response = await fetch(`${host}/sendmessage/${friend}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			},
			body: JSON.stringify({ message, status })
		})
		const content = await response.json()
		return content
	}

	const markSeen = async id => {
		console.log("on receiver side, marking status as seen")
		fetch(`${host}/status/seen`, {
			method: "PUT",
			headers: {
				Token: localStorage.getItem("token"),
				id
			}
		})
	}

	// Delete
	const unsend = async id => {
		await fetch(`${host}/unsendmessage`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token"),
				"id": id
			}
		})
	}

	return (
		<MssgContext.Provider
			value={{
				chat,
				setChat,
				getMessages,
				sendMessage,
				unsend,
				markSeen
			}}
		>
			{props.children}
		</MssgContext.Provider>
	)
}

export default MssgState
