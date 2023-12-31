import React from "react"
import backIcon from "../assets/backIcon.png"
import { useHistory } from "react-router-dom"
import defaultDp from "../assets/default-dp.png"
import { USER_DP } from "../../constants"

const ChatNav = props => {
	const history = useHistory()
	const { user, friend, activeStatus } = props
	const userDP = `${USER_DP}/${friend?.dp_id}`

	return (
		<nav className="navbar navbar-dark p-0" id="messenger-nav" style={{ background: "#161616" }}>
			<div onClick={history.goBack} style={{ marginLeft: "10px" }}>
				<img src={backIcon} alt="back" style={{ height: "26px" }} />
			</div>
			<div className="d-flex navbar-brand m-0 mx-1">
				<div className="nav-dpContainer">
					<img
						className="nav-profilePic"
						src={friend?.dp_id && friend?.dp_id.length > 10 ? userDP : defaultDp}
						alt="Profile"
					/>
				</div>
				<h3 style={{ margin: "auto 5px", fontSize: "inherit" }}>
					{user === friend?.username ? "Me" : friend?.username}
					<div className="friend_online_status">{activeStatus ? "online" : ""}</div>
				</h3>
			</div>
		</nav>
	)
}

export default ChatNav
