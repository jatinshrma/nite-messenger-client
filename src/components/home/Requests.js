import React, { useContext, useState } from "react"

// Importing components
import receivedIco from "../assets/download.svg"
import sentIco from "../assets/upload.svg"

// Importing contexts
import userContext from "../context/authenticate/userContext"
import circleContext from "../context/friendcirle/circleContext"

// Importing components
import ExploreContact from "./ExploreContact"
import Navbar from "./HomeNavbar"
import TabsBar from "./TabsBar"

const Requests = () => {
	const user_Context = useContext(userContext)
	const { user, profile } = user_Context

	const circle_Context = useContext(circleContext)
	const { users } = circle_Context

	// States
	const [seachInput, setSeachInput] = useState("")
	const [requestMode, setRequestMode] = useState("received")

	const filterUsers = i => {
		return (
			i.username !== user?.username &&
			(requestMode === "received"
				? profile?.requestedBy?.includes(i?.username)
				: profile?.requested?.includes(i?.username)) &&
			(!seachInput ||
				i.name.toLowerCase().includes(seachInput.toLowerCase()) ||
				i.username.toLowerCase().includes(seachInput.toLowerCase()))
		)
	}

	return (
		<div>
			<Navbar />
			<TabsBar />
			<div className="tabs-bar">
				<div
					className="tabs"
					onClick={() => setRequestMode("received")}
					style={{ borderBottom: requestMode === "received" ? "1px solid #a6a6ab" : "none" }}
				>
					<div className="w-100 requestsTab">
						<img src={receivedIco} className="tabsIco" alt="tab-Icon" />
						<span>Received Requests</span>
					</div>
				</div>
				<div
					className="tabs"
					onClick={() => setRequestMode("sent")}
					style={{ borderBottom: requestMode === "sent" ? "1px solid #a6a6ab" : "none" }}
				>
					<div className="w-100 requestsTab">
						<img src={sentIco} className="tabsIco" alt="tab-Icon" />
						<span>Sent Requests</span>
					</div>
				</div>
			</div>
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
					{users?.filter(filterUsers)?.map(i => (
						<ExploreContact key={i.username} user={i} requested={true} requestMode={requestMode} />
					))}
				</ul>
			</div>
		</div>
	)
}

export default Requests
