import axios from 'axios';

export default axios.create({
	// baseURL: 'http://192.168.1.23:8080',
	baseURL: 'http://100.64.81.77:6969/',
	headers: { 
		"ngrok-skip-browser-warning": "true",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Headers" : "*",
		"Access-Control-Allow-Methods" : "*",
		"Content-Type" : "application/json",
	}
})