import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap"
import "./Dragger.scss";
import { faCloudArrowUp, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropzone } from "react-dropzone";
import PdfViewer from "../PdfViewer/PdfViewer";

// import pdf from "../PdfViewer/JavaScript.pdf"

const Dragger = () => {
	const onDrop = (event) => {
		event.preventDefault();
		const droppedFiles = Array.from(event.dataTransfer.files);
		const pdfFiles = droppedFiles.filter((file) => file.type === 'application/pdf');
		setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
	}

	const [files, setFiles] = useState([]);
	const fileInputRef = useRef(null);
	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

	// useEffect(() => {
	// 	console.log(pdf)
	// }, [])
	

	return (
		<>
			<Col xs={11} md={6} className="dragger" {...getRootProps()}>
				<FontAwesomeIcon className="icon" icon={isDragActive ? faFolderOpen : faCloudArrowUp} />
				{/* {files.length > 0 &&
					// <Card>
					// 	{files.map((file, index) => (
						// 		<li key={index}>{file.name}</li>
					// 	))}
					// </Card>
					files.map((file, index) => (
						<PdfViewer pdf={pdf} />
						)
					)} */}
				<input {...getInputProps()}/>
				{isDragActive ? (
					<h3>Drop the files here...</h3>
					) : (
					<>
						<h3>Drag&Drop some files here</h3>
						<h6>or</h6>
						<h4>click to select files</h4>
					</>
				)}
			</Col>
			{/* {pdf &&
				<Col xs={11} md={6}>
					<PdfViewer pdf={pdf} />
				</Col>
			} */}
		</>
	);
};

export default Dragger;
