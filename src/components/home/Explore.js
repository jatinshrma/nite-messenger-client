import React, { useContext, useState } from "react"

// Importing components
import TabsBar from "./TabsBar"
import Navbar from "./HomeNavbar"
import ExploreContact from "./ExploreContact"

// Importing contexts
import userContext from "../context/authenticate/userContext"
import circleContext from "../context/friendcirle/circleContext"

const Explore = () => {
	const user_Context = useContext(userContext)
	const {
		user: { username: user },
		profile
	} = user_Context

	const circle_Context = useContext(circleContext)
	const { users } = circle_Context

	// States
	const [seachInput, setSeachInput] = useState("")

	const filterUsers = i => {
		return (
			profile?.username !== i?.username &&
			!profile?.friends?.includes(i?.username) &&
			!profile?.requested?.includes(i?.username) &&
			!profile?.requestedBy?.includes(i?.username) &&
			(!seachInput ||
				i?.name?.toLowerCase().includes(seachInput?.toLowerCase()) ||
				i?.username?.toLowerCase().includes(seachInput?.toLowerCase()))
		)
	}

	console.log({ users, profile })

	return (
		<div>
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
					{users?.filter(filterUsers)?.map(element => (
						<ExploreContact key={element.username} user={element} currentUser={user} />
					))}
				</ul>
			</div>
		</div>
	)
}

export default Explore
