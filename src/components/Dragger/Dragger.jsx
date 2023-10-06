import React, { useState, useRef } from "react";
import { Button, Col } from "react-bootstrap"
import "./Dragger.scss";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dragger = () => {
	const [files, setFiles] = useState([]);
	const fileInputRef = useRef(null);

	const handleDrop = (event) => {
		event.preventDefault();
		const droppedFiles = Array.from(event.dataTransfer.files);
		setFiles(droppedFiles);
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleFileInputChange = (event) => {
		const selectedFiles = Array.from(event.target.files);
		const pdfFiles = selectedFiles.filter((file) => file.type === 'application/pdf');
		setFiles(pdfFiles);
	};

	const handleClick = () => {
		fileInputRef.current.click();
	};

	return (
		<Col xs={11} md={6} className="dragger" onDrop={handleDrop} onDragOver={handleDragOver} onClick={handleClick}>
			<FontAwesomeIcon className="icon" icon={faCloudArrowUp} />
			<h3 className="text m-0">Drag&Drop files here</h3>
			<h6>or</h6>
			{files.length > 0 && (
				<ul>
					{files.map((file, index) => (
						<li key={index}>{file.name}</li>
					))}
				</ul>
			)}
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileInputChange}
				multiple
			/>
			<Button>Browse files</Button>
		</Col>
	);
};

export default Dragger;
