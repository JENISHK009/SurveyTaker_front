import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Modal, Spinner } from 'react-bootstrap';
import closeIcon from '../assets/images/close.svg';

const CustomModal = ({
  isActive,
  children,
  title,
  handleClose,
  buttonTitle,
  size,
  buttonBottomTitle,
  buttonBottomFrom,
  handleSaveClick,
  bottomText,
  bottomTextFrom,
  handleModalTextClick,
  isHandleCloseSpinner,
  handleCloseIcon,
  customClassName,
}) => (
  <>
    <Modal
      size={size || 'sm'}
      centered
      show={isActive}
      className={customClassName}
    >
      <Modal.Header className="d-flex justify-content-between">
        <Modal.Title as="h6" className="fw-bold">
          {title}
        </Modal.Title>
        <Button className="p-0 border-0" onClick={handleCloseIcon}>
          <Image src={closeIcon} alt="Close" />
        </Button>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {bottomTextFrom && (
          <Button
            variant="link"
            onClick={handleModalTextClick}
            className="justify-content-start me-auto text-blue p-0 text-decoration-none"
            aria-hidden="true"
          >
            {bottomText}
          </Button>
        )}
        {buttonBottomFrom && (
          <Button
            variant="blue-10"
            className="text-blue justify-content-center"
            onClick={handleSaveClick}
          >
            {buttonBottomTitle}
          </Button>
        )}

        <Button
          variant="blue"
          onClick={handleClose}
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
  </>
);

CustomModal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  size: PropTypes.string,
  buttonBottomTitle: PropTypes.string,
  handleSaveClick: PropTypes.func,
  handleCloseIcon: PropTypes.func,
  buttonBottomFrom: PropTypes.string,
  bottomText: PropTypes.string,
  bottomTextFrom: PropTypes.string,
  handleModalTextClick: PropTypes.func,
  isHandleCloseSpinner: PropTypes.func,
  customClassName: PropTypes.string,
};
export default CustomModal;
