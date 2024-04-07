import { Button, Col, Container, Form, Row } from "react-bootstrap";

const InputField = (props) => {
	return (
		<Container>
			<Row className="justify-content-center mt-3">
				<Col xs={8}>
					<Form.Group>
						<Form.Control
							type="search"
							placeholder="SEARCH A CITY"
							onChange={(e) => props.setLocationSearched(e.target.value)}
						/>
					</Form.Group>
				</Col>
				<Col xs={2} md={1}>
					<Button
						className=""
						variant="primary"
						onClick={(e) => {
							props.handleSubmit(e);
						}}
					>
						Search
					</Button>
				</Col>
			</Row>
		</Container>
	);
};
export default InputField;
