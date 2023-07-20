import React from "react"
import profileIco from "../assets/profile.svg"
import chatIco from "../assets/chat.svg"
import searchIco from "../assets/search.svg"
import requestIco from "../assets/requests.svg"

const TabsBar = () => {
	return (
		<div className="tabs-bar">
			<div className="tabs" onClick={() => (window.location.href = `/home`)}>
				<div className="w-100">
					<img src={chatIco} className="tabsIco" alt="tab-Icon" />
				</div>
			</div>
			<div className="tabs" onClick={() => (window.location.href = `/requests`)}>
				<div className="w-100" id="mid-tab">
					<img src={requestIco} className="tabsIco" alt="tab-Icon" />
				</div>
			</div>
			<div className="tabs" onClick={() => (window.location.href = `/explore`)}>
				<div className="w-100" id="mid-tab">
					<img src={searchIco} className="tabsIco" alt="tab-Icon" />
				</div>
			</div>
			<div className="tabs" onClick={() => (window.location.href = `/profile`)}>
				<div className="w-100">
					<img src={profileIco} className="tabsIco" alt="tab-Icon" />
				</div>
			</div>
		</div>
	)
}

export default TabsBar
