import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Modal, Spinner } from 'react-bootstrap';
import closeIcon from '../assets/images/close.svg';

const DeleteModal = ({
  size,
  children,
  title,
  handleDelete,
  buttonBottomTitle,
  handleClose,
  isActive,
  buttonTitle,
  isHandleCloseSpinner,
}) => (
  <Modal size={size || 'sm'} centered show={isActive}>
    <Modal.Header className="d-flex justify-content-between">
      <Modal.Title as="h6" className="fw-bold">
        {title}
      </Modal.Title>
      <Button className="p-0 border-0" onClick={handleClose}>
        <Image src={closeIcon} alt="Close" />
      </Button>
    </Modal.Header>
    <Modal.Body className="py-5">{children}</Modal.Body>
    <Modal.Footer>
      <Button
        variant="blue-10"
        className="text-blue justify-content-center"
        onClick={handleClose}
      >
        {buttonBottomTitle}
      </Button>
      <Button
        variant="blue"
        onClick={handleDelete}
        disabled={isHandleCloseSpinner}
      >
        {buttonTitle}
        {isHandleCloseSpinner && (
          <Spinner
            className="ms-2"
            animation="border"
            role="status"
            size="sm"
          />
        )}
      </Button>
    </Modal.Footer>
  </Modal>
);
DeleteModal.propTypes = {
  children: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  size: PropTypes.string,
  buttonBottomTitle: PropTypes.string,
  isHandleCloseSpinner: PropTypes.bool,
};
export default DeleteModal;
