import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import doticon from "../assets/3dots.svg"
import defaultDp from "../assets/default-dp.png"
import { USER_DP } from "../../constants"

import circleContext from "../context/friendcirle/circleContext"

const ContactItem = props => {
	const circle_Context = useContext(circleContext)
	const { block, unblock, goodbye } = circle_Context

	const { user, currentUser, accountUser } = props
	const dp = `${USER_DP}/${user.dp_id}`

	const [isBlock, setIsBlock] = useState(false)

	useEffect(() => {
		if (accountUser) {
			if (accountUser.blocked.includes(user.username)) {
				setIsBlock(true)
			} else {
				setIsBlock(false)
			}
		}
	}, [accountUser, user.username])

	const blockUser = () => {
		block(user.username)
		setIsBlock(true)
	}

	const unblockUser = () => {
		unblock(user.username)
		setIsBlock(false)
	}

	const removeFriend = () => {
		goodbye(user.username)
	}

	return (
		<li className="d-flex">
			<Link to={`/chat/${user.username}`} style={{ width: "100%", textDecoration: "none" }}>
				<div className="d-flex justify-content-between align-items-start ContactItem">
					<div id="contact-dpContainer">
						<img id="contact-dp" src={user.dp_id.length > 10 ? dp : defaultDp} alt="Profile" />
					</div>
					<div className="me-auto" style={{ margin: "auto 20px" }}>
						<div>{currentUser === user.username ? "Me" : user.name}</div>
						{user.username}
					</div>
				</div>
			</Link>
			<div className="dropdown" id="menu-dots">
				<div id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					<img style={{ width: "39px" }} alt="menu" src={doticon} />
				</div>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="contactMenu">
					{isBlock && (
						<button onClick={unblockUser} className="dropdown-item cmItem">
							Unblock
						</button>
					)}

					{!isBlock && (
						<button onClick={blockUser} className="dropdown-item" id="cmItemDel">
							Block
						</button>
					)}

					<div onClick={removeFriend} className="dropdown-item cmItem">
						Unfriend
					</div>
				</div>
			</div>
		</li>
	)
}

export default ContactItem
