import React, { useState, useContext } from "react"

import addIco from "../assets/add.svg"
import crossIco from "../assets/cross.svg"
import checkIco from "../assets/check.svg"
import circleContext from "../context/friendcirle/circleContext"
import { USER_DP, DEFAULT_DP } from "../../constants"

const ExploreContact = props => {
	const { user, requested, requestMode } = props

	const circle_Context = useContext(circleContext)
	const { request, cancelrequest, declinerequest, handshake } = circle_Context

	const [isChecked, setIsChecked] = useState(false)
	const [showComponent, setShowComponent] = useState(true)

	const dp = `${USER_DP}/${user.dp_id}`
	const defaultDP = DEFAULT_DP

	const makeRequest = () => {
		request(user.username)
		setIsChecked(true)
	}

	const cancelRequest = () => {
		cancelrequest(user.username)
		setIsChecked(false)
		requestMode === "sent" && setShowComponent(false)
	}

	const acceptRequest = () => {
		handshake(user.username)
		setShowComponent(false)
	}

	const declineRequest = () => {
		declinerequest(user.username)
		setShowComponent(false)
	}

	return (
		<>
			{showComponent && (
				<li className="d-flex">
					<div style={{ width: "100%", textDecoration: "none" }}>
						<div className="d-flex justify-content-between align-items-start ContactItem">
							<div id="contact-dpContainer">
								<img id="contact-dp" src={user.dp_id.length > 14 ? dp : defaultDP} alt="Profile" />
							</div>
							<div className="me-auto" style={{ margin: "auto 20px" }}>
								<div>{user.name}</div>
								{user.username}
							</div>
							{!requested && !isChecked && <img onClick={makeRequest} id="addIco" alt="add_friend" src={addIco} />}
							{!requested && isChecked && <img onClick={cancelRequest} id="addIco" alt="add_friend" src={checkIco} />}

							{requestMode === "received" && (
								<div className="my-auto">
									<img onClick={acceptRequest} className="m-2" id="addIco" alt="add_friend" src={checkIco} />
									<img onClick={declineRequest} className="m-2" id="addIco" alt="add_friend" src={crossIco} />
								</div>
							)}

							{requestMode === "sent" && (
								<div className="my-auto">
									<img onClick={cancelRequest} className="m-2" id="addIco" alt="add_friend" src={crossIco} />
								</div>
							)}
						</div>
						<div></div>
					</div>
					<div className="dropdown"></div>
				</li>
			)}
		</>
	)
}

export default ExploreContact
