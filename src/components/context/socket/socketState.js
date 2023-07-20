import { useRef } from "react"
import SocketContext from "./socketContext"
import { SERVER } from "../../../constants"
import { io } from "socket.io-client"

const SocketState = props => {
	const socket = useRef()
	try {
		socket.current = io(SERVER)
		socket.current.emit("addUser", localStorage.getItem("user"))
	} catch (error) {
		console.log(error)
	}

	return <SocketContext.Provider value={{ socket }}>{props.children}</SocketContext.Provider>
}

export default SocketState
