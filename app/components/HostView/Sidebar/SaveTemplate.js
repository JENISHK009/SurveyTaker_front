import React from 'react';
import { Form } from 'react-bootstrap';

const SaveTemplate = () => (
  <Form>
    <Form.Group className="form-group mb-0">
      <Form.Label>Template Name</Form.Label>
      <Form.Control type="text" placeholder="Enter" />
    </Form.Group>
  </Form>
);
export default SaveTemplate;
