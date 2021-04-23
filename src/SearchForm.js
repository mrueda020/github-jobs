import React from "react";
import { Form, Col } from "react-bootstrap";
function SearchForm({ params, handleParamChange }) {
  return (
    <Form className="mb-4">
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={handleParamChange}
            value={params.description}
            name="description"
            type="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            onChange={handleParamChange}
            value={params.location}
            name="location"
            type="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} xs="auto" className="ml-2">
          <Form.Check
            onChange={handleParamChange}
            value={params.full_time}
            name="full_time"
            id="full-time"
            label="Only Full Time"
            type="checkbox"
            className="mt-2"
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
}

export default SearchForm;
