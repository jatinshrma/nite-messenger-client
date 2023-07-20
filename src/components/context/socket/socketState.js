import { useRef } from "react"
import SocketContext from "./socketContext"
import { SOCKET } from "../../../constants"
import { io } from "socket.io-client"

const SocketState = props => {
	const socket = useRef()
	try {
		socket.current = io(SOCKET)
		socket.current.emit("addUser", localStorage.getItem("user"))
	} catch (error) {
		console.log(error)
	}

	return <SocketContext.Provider value={{ socket }}>{props.children}</SocketContext.Provider>
}

export default SocketState
