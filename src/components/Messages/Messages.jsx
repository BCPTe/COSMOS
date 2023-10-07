import avatar from "../../assets/only_logo.png";
import { Col, Form, Button } from "react-bootstrap";
import "./Messages.scss";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import simulation_messages from "../../messages.json"

const Messages = (props) => {
	const [newMessage, setNewMessage] = useState(null)
	const [toSend, setToSend] = useState(null)
	const [messages, setMessages] = useState([])
	const [messageIndexToAnimate, setMessageIndexToAnimate] = useState(null);
	const messagesContainerRef = useRef()
	const [btnDisabled, setBtnDisabled] = useState(true)

	useEffect(() => {
		if(toSend != null) {
			setMessages(prevMessages => [...prevMessages, toSend])
		}
	}, [toSend])

	useEffect(() => {
		// print welcome message only first time page load
		setMessages([
			{
				sender: "cosmos",
				timestamp: new Date().getTime(),
				text: "Ciao sono Silvio, chiedimi qualcosa..."
			}
		])
		// remove following line to remove simulation messages
		setMessages(simulation_messages['data'])
	}, [])
	
	useEffect(() => {
		const container = messagesContainerRef.current;
		if (container) {
			const lastMessage = container.lastChild;
			if (lastMessage) {
				const lastMessageIndex = Array.from(container.children).indexOf(lastMessage);
				lastMessage.scrollIntoView({ behavior: 'smooth' });
				setMessageIndexToAnimate(lastMessageIndex);
			}
		}
	}, [messages]);
	

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault()
			sendMessage()
		}
	};

	const handleMessageInsertion = (e) => {
		setNewMessage(e.target.value)
	}
	
	const sendMessage = () => {
		if(newMessage === null) {
			return
		}
		var msg = {
			sender: "YOU",
			timestamp: new Date().getTime(),
			text: newMessage
		}
		setToSend(msg)
		setNewMessage(null)
		// TODO: API POST REQUEST TO SEND MESSAGE
	}

	const defineClass = (m, index) => {
		var toBeReturned = "message "
		if(m.sender === "cosmos") {
			toBeReturned += "cosmos "
			if(messageIndexToAnimate === index) {
				toBeReturned += "slide-right "
			}
		}
		else {
			toBeReturned += "client "
			if(messageIndexToAnimate === index) {
				toBeReturned += "slide-left "
			}
		}

		return toBeReturned
	}

	useEffect(() => {
		if(newMessage !== null && newMessage !== "") {
			setBtnDisabled(false)
		}
		else {
			setBtnDisabled(true)
		}
	}, [newMessage])
	

	return (
		<>
			{messages.length > 0 &&
			<Col xs={11} md={6} className="messages" ref={messagesContainerRef}>
				{messages.map((m, index) => (
					<div
						className={defineClass(m, index)}
						key={index}
					>
						<div className="sender">
							<img src={avatar} alt="Avatar" className="avatar" />
							<span className="name">{m.sender.toUpperCase()}</span>
						</div>
						<div className="text">{m.text}</div>
					</div>
				))}
			</Col>
			}
			<Col xs={11} md={6} className="input-container">
				<Col className="p-0">
					<Form.Control
					value={newMessage ?? ""}
					className="input-text"
					placeholder="Enter input"
					onChange={(e) => handleMessageInsertion(e)}
					onKeyUp={(e) => handleKeyPress(e)}/>
				</Col>
				<div className="btn-container p-0">
					<Button className="input-btn"
						onClick={() => sendMessage()}
						disabled={btnDisabled}>
						<FontAwesomeIcon icon={faChevronRight} />
					</Button>
				</div>
			</Col>
		</>
	);
};

export default Messages;
