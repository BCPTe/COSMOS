import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap"
import "./Dragger.scss";
import { faCloudArrowUp, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropzone } from "react-dropzone";
import PdfViewer from "../PdfViewer/PdfViewer";

// import pdf from "../PdfViewer/JavaScript.pdf"

const Dragger = () => {
	const [files, setFiles] = useState([]);
	const fileInputRef = useRef(null);

	
	// const onDrop = (acceptedFiles, rejectedFiles, event) => {
	// 	console.log(event)
	// 	event.preventDefault();
	// 	const droppedFiles = Array.from(event.dataTransfer.files);
		
	// 	// TODO: MAKE A CALL TO BACKEND TO GET DESCRIPTION FOR EACH FILE (i send files array and
	// 	// get a response with an descriptions array)
		
	// 	setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
	// }
	
	const {acceptedFiles, event, getRootProps, getInputProps, isDragActive} = useDropzone({
		accept: 
		{
			'application/pdf': ['.pdf'],
		}
	});
	
	useEffect(() => {
		const droppedFiles = Array.from(acceptedFiles);
		
		// TODO: MAKE A CALL TO BACKEND TO GET DESCRIPTION FOR EACH FILE (i send files array and
		// get a response with an descriptions array)
		
		setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
	}, [acceptedFiles])

	const handleRemoveFile = (index) => setFiles(files => files.filter((f, i) => i !== index))

	useEffect(() => {
		var simulation_files = [
			{
				name: "Il magico pdf di Franz",
				description: "im gettin this description from backend"
			},
			{
				name: "Il magico pdf di Johnny",
				description: "im gettin this description from backend"
			},
			{
				name: "Il magico pdf di Johnny",
				description: "im gettin this description from backend"
			},
			{
				name: "Il magico pdf di Johnny",
				description: "im gettin this description from backend"
			},
			{
				name: "Il magico pdf di Pecorino",
				description: "im gettin this description from backend"
			}
		]
		setFiles(simulation_files)
	}, [])

	useEffect(() => {
		console.log("files: ", files)
	}, [files])
	

	return (
		<>
			<Col xs={11} md={6} className={isDragActive ? "dragger dragging" : "dragger"} {...getRootProps()}>
				<FontAwesomeIcon className="icon" icon={isDragActive ? faFolderOpen : faCloudArrowUp} />
				<input {...getInputProps()} />
				{isDragActive ? (
					<h4 className="m-0">Drop the files here</h4>
					) : (
					<>
						<h3 className="m-0">Drag&Drop some files here</h3>
						<h6 className="m-0">or</h6>
						<h5 className="m-0">click to select files</h5>
					</>
				)}
			</Col>
			{files.length > 0 &&
				<Col xs={11} md={6} className="pdf-cards">
					{files.map((file, index) => (
						<Card key={index}>
							<Card.Header>
								<span>{file.name}</span>
							</Card.Header>
							<Card.Body>
								<Card.Text className="slide-right">{file.description}</Card.Text>
							</Card.Body>
							<Card.Footer>
								<Button variant="danger" onClick={() => handleRemoveFile(index)}>
									Remove
								</Button>
							</Card.Footer>
						</Card>
					))}
				</Col>
			}
		</>
	);
};

export default Dragger;
