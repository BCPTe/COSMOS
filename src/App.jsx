import "./App.scss";
import Footer from "./components/Footer/Footer";
import Messages from "./components/Messages/Messages";
import Header from "./components/Header/Header";
import { useState } from "react";
import Dragger from "./components/Dragger/Dragger";

function App() {
	const [page, setPage] = useState(0)		// 0 -> first page with dragger

	return (
		<>
			<Header />
			<div className="content">
				{/* TODO: CHANGE ACTIVATION STATE (msgcounter is not the correct one) */}
				{page === 0 ? <Dragger setPage={setPage} /> : <Messages />}
			</div>
			<Footer />
		</>
	)
}

export default App;
