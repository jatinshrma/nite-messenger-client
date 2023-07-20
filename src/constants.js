export const SERVER = window.location.host?.includes("localhost")
	? "http://localhost:5000"
	: "https://api-nitemessenger.onrender.com"
export const USER_DP = `${SERVER}/dp/image`
export const DEFAULT_DP =
	"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80"
