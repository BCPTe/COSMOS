import avatar from "../../assets/only_logo.png";
import { Col } from "react-bootstrap";
import "./Messages.scss";
import React, { useEffect, useRef, useState } from "react";
import simulation_messages from "../../messages.json"

const Messages = (props) => {
	const [messages, setMessages] = useState([])
	const messagesContainerRef = useRef()

	useEffect(() => {
		if(props.msg != null) {
			setMessages(prevMessages => [...prevMessages, props.msg])
		}
	}, [props.msg])

	useEffect(() => {
		// print welcome message only first time page load
		setMessages([
			{
				sender: "cosmos",
				timestamp: new Date().getTime(),
				text: "Ciao sono Silvio, chiedimi qualcosa..."
			}
		])
		setMessages(prevMessages => [...prevMessages, ...simulation_messages['data']])
	}, [])
	
	useEffect(() => {
		const container = messagesContainerRef.current;
		if (container) {
			const lastMessage = container.lastChild;
			if (lastMessage) {
				lastMessage.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}, [messages]);


	return (
		(messages.length > 0 &&
			<Col xs={11} md={6} className="messages" ref={messagesContainerRef}>
				{messages.map(m =>
					(
						<div className={m.sender === "cosmos" ? "message cosmos" : "message client"} key={m.timestamp}>
							<div className="sender">
								<img src={avatar} alt="Avatar" className="avatar"></img>
								<span className="name">{m.sender.toUpperCase()}</span>
							</div>
							<div className="text">{m.text}</div>
						</div>
					)
				)}
			</Col>
		)
	);
};

export default Messages;
