import React, { useState, useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap"
import simulation_files from "../../files.json"
import "./Dragger.scss";
import { faCloudArrowUp, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropzone } from "react-dropzone";

const Dragger = (props) => {
	const [files, setFiles] = useState([]);
	
	const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
		accept: 
		{
			'application/pdf': ['.pdf'],
		}
	});

	const sendFileToBackend = () => {
		// TODO: CALL BACKEND -> SEND ALL FILES AND OPEN CHAT PAGE
		props.setPage(1)
		return null
	}
	
	useEffect(() => {
		// filter if new files uploaded are already present
		const droppedFiles = Array.from(acceptedFiles.filter(newFile => !files.some(filePresent => filePresent.name === newFile.name)));
		
		// TODO: MAKE A CALL TO BACKEND TO GET DESCRIPTION FOR EACH FILE (i send files array and
		// get a response with an descriptions array)
		
		setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
	}, [acceptedFiles])

	const handleRemoveFile = (index) => setFiles(files => files.filter((f, i) => i !== index))

	useEffect(() => {
		setFiles(simulation_files['data'])
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
								<Button className="rm-btn" onClick={() => handleRemoveFile(index)}>
									Remove
								</Button>
							</Card.Footer>
						</Card>
					))}
				</Col>
			}
			<Button variant="success" className="starter-btn" onClick={() => sendFileToBackend()}>
				Start Analysis
			</Button>
		</>
	);
};

export default Dragger;
