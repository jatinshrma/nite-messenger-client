/* eslint-disable react-hooks/exhaustive-deps */
import { Switch, Route, Redirect } from "react-router-dom"

// Importing components
import Home from "./components/home/Home"
import Messenger from "./components/messages/Messenger"
import Navbar from "./components/home/HomeNavbar"
import Login from "./components/Login"
import Signup from "./components/Signup"
import UserProfile from "./components/home/UserProfile"
import Explore from "./components/home/Explore"
import Requests from "./components/home/Requests"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useContext, useEffect } from "react"
import userContext from "./components/context/authenticate/userContext"
import circleContext from "./components/context/friendcirle/circleContext"

function App() {
	const history = useHistory()

	document.body.style.margin = "0"
	document.body.style.padding = "0"

	const user_Context = useContext(userContext)
	const circle_Context = useContext(circleContext)

	const { user, getProfile } = user_Context
	const { fetchUsers } = circle_Context

	useEffect(() => {
		if (
			!window.location.pathname?.includes("login") &&
			!window.location.pathname?.includes("signup") &&
			user?.username
		) {
			fetchUsers()
			getProfile()
		}
	}, [user])

	if (!user?.token) history.push("/login")

	return (
		<Switch>
			<Route exact path="/home">
				<div>
					<Home />
				</div>
			</Route>
			<Route exact path="/profile">
				<Navbar />
				<UserProfile />
			</Route>
			<Route exact path="/login">
				<Login />
			</Route>
			<Route exact path="/signup">
				<Signup />
			</Route>
			<Route exact path="/chat/:friend">
				<Messenger />
			</Route>
			<Route exact path="/">
				<Redirect to={!user ? "/login" : `/home`} />
			</Route>
			<Route exact path="/explore">
				<Explore />
			</Route>
			<Route exact path="/requests">
				<Requests />
			</Route>
		</Switch>
	)
}

export default App
