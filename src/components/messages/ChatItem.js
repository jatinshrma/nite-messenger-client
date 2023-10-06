import React from "react"
import "./Messenger.css"

const ChatItem = props => {
	const { msg, chatClass, showStatus, chat, date, messageStatus } = props
	let align
	if (chatClass === "sentTxt") {
		align = "end"
	} else if (chatClass === "recTxt") {
		align = "start"
	}

	const localTime = new Date(chat.date).toLocaleTimeString()
	const postTimeVAr = localTime.slice(-2)
	const lastIndexes = localTime.slice(-6)
	const time = localTime.split(lastIndexes)

	return (
		<div key={chat?._id}>
			{date && <div className="text-center date-elements">{date}</div>}
			<div className={`${chatClass}Div d-flex`}>
				<span
					className={chatClass}
					id="dropdownMenuButton"
					data-bs-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="true"
				>
					{msg}
					<div id="chatTime">
						{time} {postTimeVAr}
					</div>
				</span>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="contactMenu">
					<button onClick={() => navigator.clipboard.writeText(msg)} className="dropdown-item" id="cmItem">
						Copy
					</button>
					{/* <button className="dropdown-item" id="cmItemDel">
						Unsend
					</button> */}
				</div>
			</div>
			{showStatus && <div id="messageStatus">{messageStatus ? "seen" : chat.status}</div>}
		</div>
	)
}

export default ChatItem
