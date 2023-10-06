// Impotring Modules
import React, { createRef, useState, useEffect, useContext } from "react"
// import Picker from "emoji-picker-react"

// Imporing Files
import mssgContext from "../context/message/mssgContext"
import circleContext from "../context/friendcirle/circleContext"
import userContext from "../context/authenticate/userContext"

import "./Messenger.css"
import ChatItem from "./ChatItem"
import ChatNav from "./ChatNav"
// import Smile from "../assets/smile.svg"
import socketContext from "../context/socket/socketContext"
import { useParams } from "react-router-dom"

const Messenger = props => {
	const { friend } = useParams()

	// Destructuring from context
	const message_context = useContext(mssgContext)
	const { chat, setChat, getMessages, sendMessage, markSeen } = message_context

	const circle_Context = useContext(circleContext)
	const { friendsProfile, getFriendsProfile } = circle_Context

	const user_Context = useContext(userContext)
	const {
		user: { username: user },
		profile
	} = user_Context

	// Refs
	const inputRef = createRef()

	// States
	// const [showPicker, setShowPicker] = useState(false)

	// Scroll to the bottom
	if (window.pageYOffset === 0) {
		window.scrollTo(0, window.document.body.scrollHeight)
	}

	const [messageStatus, setMessageStatus] = useState(false)
	const [activeStatus, setActiveStatus] = useState(false)
	const [activeUsers, setActiveUsers] = useState([])
	const [isTyping, setIsTyping] = useState(false)
	const [typedMessage, setTypedMessage] = useState("")

	const { socket } = useContext(socketContext)
	console.log({ chat })
	useEffect(() => {
		socket.current.on("getUsers", users => {
			setActiveUsers(users)
		})
		socket.current.on("disconnect", () => {})
		socket.current.on("getMessage", newMessage => {
			setChat(prevChat => prevChat.concat(newMessage))
		})
		socket.current.on("isFriendTyping", isTyping => {
			setIsTyping(isTyping)
			window.scrollTo(0, window.document.body.scrollHeight)
		})

		// Fetch Messeges
		getMessages(friend)

		// Fetch friend's profile
		getFriendsProfile(friend)

		// Scroll to the bottom
		window.scrollTo(0, window.document.body.scrollHeight)
		// eslint-disable-next-line
	}, [])

	const [isBlockedByUser, setIsBlockedByUser] = useState(false)
	const [isBlockedByFriend, setIsBlockedByFriend] = useState(false)

	useEffect(() => {
		profile && setIsBlockedByUser(profile.blocked.includes(friend) ? true : false)
	}, [profile, friend])

	useEffect(() => {
		if (friendsProfile && profile) setIsBlockedByFriend(profile?.blockedBy?.includes(user) ? true : false)
	}, [friendsProfile, profile, user])

	useEffect(() => {
		var match = false
		activeUsers.forEach(element => {
			if (element.userId === friend && !match) {
				setActiveStatus(true)
				setMessageStatus(true)
				match = true
			} else if (!match) {
				setActiveStatus(false)
				setMessageStatus(false)
				match = false
			}
		})

		// Fetch Messeges
		getMessages(friend)

		// eslint-disable-next-line
	}, [activeUsers])

	// Reset Scroll to bottom after fetching messages
	useEffect(() => {
		const asyncFunction = async () => {
			for (const { _id } of chat?.filter(i => i.status !== "seen" && i.receiver === user)) {
				await markSeen(_id)
			}
		}

		asyncFunction()
		window.scrollTo(0, window.document.body.scrollHeight)
		// eslint-disable-next-line
	}, [chat])

	// Handles Inserting an emoji.
	// const onEmojiClick = (event, emojiObject) => {
	// 	const ref = inputRef.current
	// 	ref.focus()
	// 	const start = inputRef.current.value.substring(0, ref.selectionStart)
	// 	const end = inputRef.current.value.substring(ref.selectionStart)
	// 	const text = start + emojiObject.emoji + end
	// 	inputRef.current.value = text
	// 	setCursorLocation(start.length + 2)
	// }

	const onchange = e => {
		e.target.style.height = "inherit"
		const computed = window.getComputedStyle(e.target)
		const height =
			parseInt(computed.getPropertyValue("border-top-width"), 10) +
			parseInt(computed.getPropertyValue("padding-top"), 10) +
			e.target.scrollHeight +
			parseInt(computed.getPropertyValue("padding-bottom"), 10) +
			parseInt(computed.getPropertyValue("border-bottom-width"), 10)
		e.target.style.height = `${height}px`

		setTypedMessage(e.target.value)
		if (e.target.value.length === 0) socket.current.emit("typing", false, friend)
		else if (e.target.value.length === 1) socket.current.emit("typing", true, friend)
	}

	// Send Message into database and re-fetch updated messages.
	const sendMsgHandler = async e => {
		e.preventDefault()
		inputRef.current.style.height = "inherit"
		const _typedMessage = typedMessage

		let status = "sent"
		if (activeUsers?.find(i => i.userId === friend)) {
			status = "seen"
		}

		if (_typedMessage) {
			setTypedMessage("")
			socket.current.emit("typing", false, friend)

			const message_json = {
				date: new Date().toISOString(),
				message: _typedMessage,
				receiver: friend,
				sender: user,
				status
			}

			setChat(state => state.concat([message_json]))
			socket.current.emit("sendMessage", message_json, friend)
			sendMessage(_typedMessage, friend, status)
			window.scrollTo(0, window.document.body.scrollHeight)
		}
	}

	var count = 0
	return (
		<>
			<ChatNav user={user} friend={friendsProfile} activeStatus={activeStatus} />
			<div id="chatContainer" className="px-2" style={{ paddingBottom: isTyping ? "50px" : "0" }}>
				{chat.map(element => {
					count++
					let showStatus = false
					if (chat.length === count && element.sender === user) {
						showStatus = true
					}

					// Date validation
					const newDate = new Date(element.date).toUTCString().substring(0, 16)
					const lastDate = sessionStorage.getItem("date")
					if (lastDate !== newDate) {
						var validation = false
						sessionStorage.setItem("date", newDate)
					} else {
						validation = true
					}

					// Class specification
					const chatClass = element.sender === user ? "sentTxt" : "recTxt"

					return (
						<ChatItem
							chat={element}
							date={!validation && newDate}
							chatClass={chatClass}
							msg={element.message}
							messageStatus={messageStatus}
							showStatus={showStatus}
						/>
					)
				})}
				{isTyping && (
					<div className="dots-cont my-1 mx-2">
						<span className="dot dot-1"></span>
						<span className="dot dot-2"></span>
						<span className="dot dot-3"></span>
					</div>
				)}
				{/* {showPicker && (
					<div id="emojiContainer">
						<Picker onEmojiClick={onEmojiClick} />
					</div>
				)} */}
			</div>
			{isBlockedByFriend ? (
				<div id="blockMessage">
					<div>You have been blocked by the user</div>
				</div>
			) : isBlockedByUser ? (
				<div id="blockMessage">
					<div>You have blocked this user</div>
				</div>
			) : (
				<form className="bottomDiv" onSubmit={sendMsgHandler}>
					<div className="bottomInnerDiv">
						{/* <button type="button" id="emojiBtn" onClick={() => setShowPicker(val => !val)}>
							<img src={Smile} alt="Emoji" />
						</button> */}
						<textarea
							id="txtInput"
							rows="1"
							ref={inputRef}
							value={typedMessage}
							onChange={onchange}
							placeholder="Message"
						/>
						<button type="submit" id="sendBtn" disabled={typedMessage?.length === 0}>
							Send
						</button>
					</div>
				</form>
			)}
		</>
	)
}

export default Messenger
