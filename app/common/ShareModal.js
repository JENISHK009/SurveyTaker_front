import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Modal, Spinner } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import closeIcon from '../assets/images/close.svg';

const ShareModal = ({
  handleClick,
  isActive,
  children,
  handleCloseIcon,
  footerTitle,
  isHandleCloseSpinner,
  text,
}) => (
  <>
    <Modal centered show={isActive} size="sm">
      <Modal.Header className="d-flex justify-content-between">
        <Modal.Title as="h6" className="fw-bold">
          Share
        </Modal.Title>
        <Button className="p-0 border-0" onClick={handleCloseIcon}>
          <Image src={closeIcon} alt="Close" />
        </Button>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <CopyToClipboard text={text}>
          <Button
            variant="blue"
            onClick={handleClick}
            disabled={isHandleCloseSpinner}
          >
            {footerTitle}
            {isHandleCloseSpinner && (
              <Spinner
                className="ms-2"
                animation="border"
                role="status"
                size="sm"
              />
            )}
          </Button>
        </CopyToClipboard>
      </Modal.Footer>
    </Modal>
  </>
);
ShareModal.propTypes = {
  handleClick: PropTypes.func,
  isActive: PropTypes.bool,
  children: PropTypes.element,
  handleCloseIcon: PropTypes.bool,
  footerTitle: PropTypes.string,
  isHandleCloseSpinner: PropTypes.bool,
  text: PropTypes.object,
};
export default ShareModal;
