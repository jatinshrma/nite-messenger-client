import React, { useEffect, useContext, useState } from "react"
import { useHistory } from "react-router-dom"

// Importing components
import "./Home.css"
import TabsBar from "./TabsBar"
import Navbar from "./HomeNavbar"
import Contact from "./Contact"

// Importing contexts
import userContext from "../context/authenticate/userContext"
import circleContext from "../context/friendcirle/circleContext"
import socketContext from "../context/socket/socketContext"

const ContactsList = () => {
	const user_Context = useContext(userContext)
	const { user, getProfile } = user_Context

	const circle_Context = useContext(circleContext)
	const { users, fetchUsers } = circle_Context
	const { socket } = useContext(socketContext)

	const [seachInput, setSeachInput] = useState("")
	const [accountUser, setAccountUser] = useState("")
	const history = useHistory()

	// Clear stored date in session storage
	sessionStorage.removeItem("date")

	useEffect(() => {
		socket.current.on("getUsers", users => {})
		socket.current.on("disconnect", () => {})
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		async function func() {
			fetchUsers()
			const account = await getProfile()
			setAccountUser(account)
		}
		func()
		// eslint-disable-next-line
	}, [])

	if (!localStorage.getItem("token")) {
		history.push("/login")
	}

	const urlparam = history.location.search
	const filterUsers = i => {
		return (
			accountUser?.friends?.includes(i.username) &&
			(!seachInput ||
				i.name?.toLowerCase()?.includes(seachInput.toLowerCase()) ||
				i.username?.toLowerCase()?.includes(seachInput.toLowerCase()))
		)
	}

	return (
		<>
			<Navbar />
			<TabsBar />
			<div id="home-search-div">
				<form className="d-flex">
					<input
						className="form-control"
						id="home-search-input"
						type="search"
						placeholder="Type to search"
						aria-label="Search"
						onChange={e => setSeachInput(e.target.value)}
					/>
				</form>
			</div>
			<div className="bg-black w-100">
				<ul className="d-block m-0 p-0">
					{!seachInput &&
						users
							?.filter(filterUsers)
							?.map(element => (
								<Contact
									key={element.username}
									user={element}
									params={urlparam}
									currentUser={user?.username}
									accountUser={accountUser}
								/>
							))}
				</ul>
			</div>
		</>
	)
}

export default ContactsList
