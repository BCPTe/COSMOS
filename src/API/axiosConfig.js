import axios from 'axios';

const api = axios.create({
	baseURL: 'http://100.69.119.20:6969/gpt',
	headers: { 
		"ngrok-skip-browser-warning" : "true",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Headers" : "*",
		"Access-Control-Allow-Methods" : "*",
		"Content-Type" : "application/json",
	}
})

const updateBaseUrl = (newBaseUrl) => {
	// debugger
	// console.log(api.defaults)
	api.defaults.baseURL = "http://100.69.119.20:6969/" + newBaseUrl;
	// console.log(api.defaults)
};

export default api;
export { updateBaseUrl };