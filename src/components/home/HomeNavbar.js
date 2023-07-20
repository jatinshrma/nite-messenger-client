import React from "react"
import { Link } from "react-router-dom"
import { CLIENT } from "../../constants"

const Navbar = () => {
	const logout = () => {
		localStorage.clear()
		window.location.href = `${CLIENT}/`
	}

	return (
		<div>
			<nav className="navbar navbar-dark" style={{ background: "#0f0e13" }}>
				<div className="container-fluid">
					<Link className="navbar-brand" to="/home/">
						Nite Messenger
					</Link>
					<div>
						<button onClick={logout} className="btn p-1 shadow-none">
							Logout
						</button>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
