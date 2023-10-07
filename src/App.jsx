import "./App.scss";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/Footer/Footer";
import Messages from "./components/Messages/Messages";
import Header from "./components/Header/Header";
import { useState } from "react";
import { counter } from "@fortawesome/fontawesome-svg-core";
import Dragger from "./components/Dragger/Dragger";

// import pdf from "../PdfViewer/JavaScript.pdf"
import PdfViewer from "./components/PdfViewer/PdfViewer"
import pdf from "./components/PdfViewer/JavaScript.pdf"

function App() {
	const [newMessage, setNewMessage] = useState(null)
	const [toSend, setToSend] = useState(null)
	const [msgCounter, setMsgCounter] = useState(1)

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
		  e.preventDefault()
		  sendMessage()
		}
	  };

	const insertNewMessage = (e) => {
		setNewMessage(e.target.value)
	}
	
	const sendMessage = () => {
		var msg = {
			sender: "YOU",
			timestamp: new Date().getTime(),
			text: newMessage
		}
		setToSend(msg)
		setNewMessage(null)
		// TODO: API POST REQUEST TO SEND MESSAGE
	}

	return (
		<>
			<Header />
			<div className="content">
				{/* TODO: CHANGE ACTIVATION STATE (msgcounter is not the correct one) */}
				{msgCounter === 1 ? 
				(
					<Dragger />
				) : (
					<>
						<Messages msg={toSend} />
						<Col xs={11} md={6} className="input-container">
							<Col className="p-0">
								<Form.Control
								value={newMessage ?? ""}
								className="input-text"
								placeholder="Enter input"
								onChange={(e) => insertNewMessage(e)}
								onKeyUp={(e) => handleKeyPress(e)}/>
							</Col>
							<div className="btn-container p-0">
								<Button className="input-btn" onClick={() => sendMessage()}>
									<FontAwesomeIcon icon={faChevronRight} />
								</Button>
							</div>
						</Col>
					</>
				)}
			</div>
			{/* {pdf &&
				<Col xs={11} md={6} className="d-flex justify-content-between">
					<PdfViewer pdf={pdf} />
					<PdfViewer pdf={pdf} />
					<PdfViewer pdf={pdf} />
				</Col>
			} */}
			<Footer />
		</>
	)
}

export default App;
