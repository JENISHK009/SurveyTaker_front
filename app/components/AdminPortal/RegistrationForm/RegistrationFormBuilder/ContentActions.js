import React from 'react';
import { Button, Image, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import tickIcon from '../../../../assets/images/tick.svg';
import folderIcon from '../../../../assets/images/folder.svg';
import plusIcon from '../../../../assets/images/plus.svg';
import minimizeIcon from '../../../../assets/images/minimize.svg';

const ContentActions = ({
  openQuestionModal,
  openTextMediaModal,
  handlePageBreak,
  pageBreakSpinner,
  setEditActionModal,
}) => (
  <div className="registration-default-text__actions">
    <Button className="p-0 me-4" onClick={openQuestionModal}>
      <Image
        src={tickIcon}
        alt="Questions"
        width={24}
        className="me-2 invert-white"
      />
      <span className="text-white">Questions</span>
    </Button>
    <Button className="p-0 me-4" onClick={openTextMediaModal}>
      <Image
        src={folderIcon}
        alt="Text/Media"
        width={24}
        className="me-2 invert-white"
      />
      <span className="text-white">Text/Media</span>
    </Button>
    <Button className="p-0 me-4" onClick={() => setEditActionModal(true)}>
      <Image
        src={plusIcon}
        alt="Action"
        width={24}
        className="me-2 invert-white"
      />
      <span className="text-white">Action</span>
    </Button>
    <Button className="p-0 me-4" onClick={handlePageBreak}>
      <Image
        src={minimizeIcon}
        alt="Page Break"
        width={24}
        className="me-2 invert-white"
      />
      <span className="text-white">
        Page Break
        {pageBreakSpinner && (
          <Spinner
            className="ms-2"
            animation="border"
            role="status"
            size="sm"
          />
        )}
      </span>
    </Button>
  </div>
);

ContentActions.propTypes = {
  openQuestionModal: PropTypes.func,
  openTextMediaModal: PropTypes.func,
  handlePageBreak: PropTypes.func,
  pageBreakSpinner: PropTypes.bool,
  setEditActionModal: PropTypes.func,
};

export default ContentActions;
