import React, { useState, useEffect } from "react";
import { Button, Card, Col, Toast } from "react-bootstrap"
import simulation_files from "../../files.json"
import "./Dragger.scss";
import { faCloudArrowUp, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropzone } from "react-dropzone";
import api from '../../API/axiosConfig';

const Dragger = (props) => {
	const [error, setError] = useState(false)
	const [filesInfo, setFilesInfo] = useState([])
	const [showToast, setShowToast] = useState(false)
	const [multipleFiles, setMultipleFiles] = useState([])
	
	const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
		accept: 
		{
			'application/pdf': ['.pdf'],
		}
	});

	const sendFilesToBackend = (fileList) => {
		// debugger
		const formData = new FormData();
		fileList.forEach((file) => {
			formData.append('files', file); // Append each file to the FormData object
		});

		props.setLoading(true)
		api.post("/upload", formData, {
			headers: {
				"Content-Type" : 'multipart/form-data'
			}
		})
		.then((response) => {
			console.warn(response.status)
			if(response && response.status < 200 && response.status >= 300) {
				setError(true)
				throw new Error("Bad network response")
			}
			else {
				setError(false)
				props.setLoading(true)
				return response.data
			}
		})
		.then(data => {
			console.log("data received after upload: ", data)
			props.setLoading(false)
			setFilesInfo(prevFiles => [...prevFiles, ...data.uploaded_files])
		})
		.catch(error => console.error("Error in uploading file: ", error))
	}
	
	useEffect(() => {
		// debugger
		// filter if new files uploaded are already present
		const multiple = filesInfo.filter(filePresent => acceptedFiles.some(newFile => newFile.name === filePresent.filename))
		if(multiple) {
			setMultipleFiles(multiple.map(f => f.filename))
		}
		const droppedFiles = Array.from(acceptedFiles.filter(newFile => !filesInfo.some(filePresent => filePresent.filename === newFile.name)));
		if(droppedFiles.length > 0) {
			// DONE: MAKE A CALL TO BACKEND TO GET DESCRIPTION FOR EACH FILE (i send files array and
			// get a response with a descriptions array)
			sendFilesToBackend(droppedFiles)
		}
	}, [acceptedFiles])

	const removeFileFromBackend = (filename) => {
		const payload = {
			filename: filename
		}

		props.setLoading(true)
		api.post("/delete", JSON.stringify(payload))
		.then((response) => {
			// console.warn(response.status)
			if(response && response.status < 200 && response.status >= 300) {
				setError(true)
				throw new Error("Bad network response")
			}
			else {
				setError(false)
				props.setLoading(true)
				return response.data
			}
		})
		.then(data => {
			// console.log("data removed: ", data)
			props.setLoading(false)
			setFilesInfo(filesInfo.filter((f) => f.filename !== filename))
		})
		.catch(error => console.error("Error in deleting file: ", error))
	}

	useEffect(() => {
		if(multipleFiles.length > 0)
			setShowToast(true)
	}, [multipleFiles])
	
	

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
			{filesInfo?.length > 0 &&
				<Col xs={11} md={6} className="pdf-cards">
					{filesInfo.map((file, index) => (
						<Card key={index}>
							<Card.Header>
								<span>{file.filename}</span>
							</Card.Header>
							<Card.Body>
								<Card.Text className="slide-right">{file.description}</Card.Text>
							</Card.Body>
							<Card.Footer>
								<Button className="rm-btn" onClick={() => removeFileFromBackend(file.filename)}>
									Remove
								</Button>
							</Card.Footer>
						</Card>
					))}
				</Col>
			}
			{error &&
				<div className="error-msg">
					Non va un cazzo qua internet
				</div>
			}
			<Button
				className="starter-btn"
				onClick={() => props.setPage(1)}
				disabled={filesInfo.length <= 0}>
				Start Analysis
			</Button>
			<Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide>
				<Toast.Body><i>{multipleFiles.join(', ')}</i> already uploaded!</Toast.Body>
			</Toast>
		</>
	);
};

export default Dragger;
