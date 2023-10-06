import "./Footer.scss"
import React from "react";
import { Row, Col } from "react-bootstrap";

const Footer = () => {
	return (
		<Row className="footer">
			<Col>
				<span>
					&copy; <strong>BCPTe</strong> for Cheat-O-Phone.e
				</span>
			</Col>
		</Row>
	);
};

export default Footer;
