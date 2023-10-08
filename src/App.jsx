import "./App.scss";
import Footer from "./components/Footer/Footer";
import Messages from "./components/Messages/Messages";
import Header from "./components/Header/Header";
import { useState } from "react";
import Dragger from "./components/Dragger/Dragger";
import { Spinner } from "react-bootstrap";

function App() {
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(0)		// 0 -> first page with dragger
											// 1 -> messages page

	return (
		<>
			{loading &&
			<div className="spinner-overlay">
				<Spinner animation="border" size="lg" variant="info" className="spinner-backend"/>
			</div>
			}
			<Header />
			<div className="content">
				{page === 0 ? <Dragger setLoading={setLoading} setPage={setPage} /> : <Messages />}
			</div>
			<Footer />
		</>
	)
}

export default App;
