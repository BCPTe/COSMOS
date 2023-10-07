import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import "./PdfViewer.scss"
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const PdfViewer = (props) => {

	return (
		<div className="pdf-container">
			<Document className="pdf-document"
				file={props.pdf}
				options={{ workerSrc: "/pdf.worker.js" }}
			>
				<Page pageNumber={1} className="pdf-page"/>
			</Document>
		</div>
	);
}

export default PdfViewer;