import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import { BrowserRouter as Router } from "react-router-dom"

// Importing contexts
import UserState from "./components/context/authenticate/userState"
import MssgState from "./components/context/message/mssgState"
import CircleState from "./components/context/friendcirle/circleState"
import SocketState from "./components/context/socket/socketState"

ReactDOM.render(
	<React.StrictMode>
		<UserState>
			<MssgState>
				<CircleState>
					<SocketState>
						<Router>
							<App />
						</Router>
					</SocketState>
				</CircleState>
			</MssgState>
		</UserState>
	</React.StrictMode>,
	document.getElementById("root")
)
