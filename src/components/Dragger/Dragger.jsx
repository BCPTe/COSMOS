import React, { useState, useEffect } from "react";
import { Button, Card, Col, Toast } from "react-bootstrap";
import simulation_files from "../../files.json";
import "./Dragger.scss";
import {
	faCloudArrowUp,
	faFolderOpen,
	faLock,
	faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropzone } from "react-dropzone";
import api, { updateBaseUrl } from "../../API/axiosConfig";

const Dragger = (props) => {
	const [error, setError] = useState(false);
	const [filesInfo, setFilesInfo] = useState([]);
	const [showToast, setShowToast] = useState(false);
	const [multipleFiles, setMultipleFiles] = useState([]);
	const [llm, setLlm] = useState("gpt");

	const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
		useDropzone({
			accept: {
				"application/pdf": [".pdf"],
			},
		});

	const sendFilesToBackend = () => {
		// debugger

		api.post("/delete_all");

		const formData = new FormData();
		filesInfo.forEach((file) => {
			formData.append("files", file); // Append each file to the FormData object
		});

		props.setLoading(true);
		api.post("/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
			.then((response) => {
				console.warn(response.status);
				if (
					response &&
					response.status < 200 &&
					response.status >= 300
				) {
					setError(true);
					throw new Error("Bad network response");
				} else {
					setError(false);
					props.setLoading(true);
					return response.data;
				}
			})
			.then((data) => {
				console.log("data received after upload: ", data);
				props.setLoading(false);
				setFilesInfo((prevFiles) => [
					...prevFiles,
					...data.uploaded_files,
				]);
				props.setPage(1);
			})
			.catch((error) =>
				console.error("Error in uploading file: ", error)
			);
	};

	const removeFile = (filenameToRemove) => {
		// debugger
		var newFileInfo = filesInfo.filter(
			(file) => file.name !== filenameToRemove
		);
		setFilesInfo(newFileInfo);
	};

	useEffect(() => {
		if (acceptedFiles.length > 0) {
			// debugger
			// filter if new files uploaded are already present
			const multiple = filesInfo.filter((filePresent) =>
				acceptedFiles.some(
					(newFile) => newFile.name === filePresent.name
				)
			);
			if (multiple) {
				setMultipleFiles(multiple.map((f) => f.name));
			}
			setFilesInfo((prevFiles) => [
				...prevFiles,
				...acceptedFiles.filter(
					(newFile) =>
						!prevFiles.some(
							(filePresent) => filePresent.name === newFile.name
						)
				),
			]);
		}
	}, [acceptedFiles]);

	useEffect(() => {
		if (multipleFiles.length > 0) setShowToast(true);
	}, [multipleFiles]);

	const switchLlm = () => {
		llm === "llama" ? setLlm("gpt") : setLlm("llama");
	};

	useEffect(() => {
		updateBaseUrl(llm);
	}, [llm]);

	return (
		<>
			<div className="model-selector-container">
				<Button className="llm-btn" onClick={() => switchLlm()}>
					<FontAwesomeIcon
						icon={llm === "gpt" ? faLockOpen : faLock}
					/>
				</Button>
			</div>
			<Col
				xs={11}
				md={6}
				className={isDragActive ? "dragger dragging" : "dragger"}
				{...getRootProps()}
			>
				<FontAwesomeIcon
					className="icon"
					icon={isDragActive ? faFolderOpen : faCloudArrowUp}
				/>
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
			{filesInfo?.length > 0 && (
				<Col xs={11} md={6} className="pdf-cards">
					{filesInfo.map((file, index) => (
						<Card key={index}>
							<Card.Header>
								<span>{file.name}</span>
							</Card.Header>
							<Card.Body>
								<Card.Text className="slide-right">
									Provola affumicata
								</Card.Text>
							</Card.Body>
							<Card.Footer>
								<Button
									className="rm-btn"
									onClick={() => removeFile(file.name)}
								>
									Remove
								</Button>
							</Card.Footer>
						</Card>
					))}
				</Col>
			)}
			{error && (
				<div className="error-msg">Error during upload</div>
			)}
			<Button
				className="starter-btn"
				onClick={() => sendFilesToBackend()}
				disabled={filesInfo.length <= 0}
			>
				Start Analysis
			</Button>
			<Toast
				show={showToast}
				onClose={() => setShowToast(false)}
				delay={5000}
				autohide
			>
				<Toast.Body>
					<i>{multipleFiles.join(", ")}</i> already uploaded!
				</Toast.Body>
			</Toast>
		</>
	);
};

export default Dragger;
