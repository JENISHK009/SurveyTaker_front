import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import CustomModal from '../../../common/customModal';
import addIcon from '../../../assets/images/plus.svg';
import unlockIcon from '../../../assets/images/unlock.svg';
import { useModalWithData } from '../../../hooks/useModalWithData';
import { useClickOutside } from '../../../hooks/useClickOutside';
import {
  AddQuestion,
  AddQuestionDetail,
  SelectQuestionTemplateModal,
} from '../Modal/AddQuestion';
import { QuestionPreview } from '../Modal/QuestionOptionSection/QuestionPreview';
import useLocalStorage from '../../../hooks/useLocalStorage';
import reducer, { getHostUI } from '../../../store/reducers/host-ui';
import injectReducer from '../../../utils/injectReducer';
import { setHostUI } from '../../../store/actions/host-ui';

const DashboardHeader = props => {
  const { modalOpen, setModalState } = useModalWithData();
  const [modalNested, setModalNested] = useState(false);
  const [previewQuestionModal, setPreviewQuestionModal] = useState(false);
  const [contentEditable, setContentEditable] = useState(false);
  const [screenName, setScreenName] = useState(2);

  const clickRef = useRef();

  useClickOutside(clickRef, () => {
    setContentEditable(false);
  });

  const handleKeydown = e => {
    if (e.key === 'Enter') {
      setScreenName(e.target.value);
    }

    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setContentEditable(false);
    }
  };
  const [templateQueModal, setTemplateQueModal] = useState(false);

  const [scaleView, setScaleView] = useLocalStorage('scale_view', true);

  useEffect(() => {
    props.setHostUI({
      ...props.host_ui,
      scale_view: scaleView,
    });
    setScreenName(props.host_ui.selected_screen);
  }, [scaleView, props.host_ui.selected_screen]);
  return (
    <div className="dashboard-header d-flex align-items-center">
      {contentEditable ? (
        <Form.Control
          style={{ width: '290px' }}
          defaultValue={screenName}
          onKeyDown={handleKeydown}
          ref={clickRef}
        />
      ) : (
        <div
          onDoubleClick={() => {
            setContentEditable(true);
          }}
        >
          Screen {screenName}
        </div>
      )}
      <Form.Check className="checkbox ms-auto">
        <Form.Check.Input
          id="checkbox-3"
          className="checkbox-input"
          defaultChecked
          onChange={() => setScaleView(!scaleView)}
          checked={scaleView}
        />
        <Form.Check.Label htmlFor="checkbox-3" className="checkbox-label">
          Scale View
        </Form.Check.Label>
      </Form.Check>
      <Button className="p-0 ms-4" onClick={() => setModalState(true)}>
        <Image src={addIcon} width={24} />
      </Button>
      <Button className="p-0 ms-4">
        <Image src={unlockIcon} width={24} />
      </Button>
      <Button className="ms-4" variant="blue" size="sm">
        Start
      </Button>

      <CustomModal
        title="Add New Question"
        isActive={modalOpen}
        handleClose={() => setModalState(false)}
        handleCloseIcon={() => setModalState(false)}
        buttonTitle="Next"
        handleClick={() => {
          setModalNested(true);
        }}
        bottomText="Select Question from the Bank"
        handleModalTextClick={() => setTemplateQueModal(true)}
        bottomTextFrom
      >
        <AddQuestion />
      </CustomModal>

      {modalNested && (
        <CustomModal
          title="Add New Question"
          isActive={modalOpen}
          handleClose={() => setModalState(false)}
          handleCloseIcon={() => setModalState(false)}
          handleClick={() => setModalState(false)}
          handleSaveClick={() => setModalState(false)}
          buttonTitle="Add Question"
          buttonBottomTitle="Save Question to the Bank"
          buttonBottomFrom
        >
          <AddQuestionDetail />
        </CustomModal>
      )}

      {templateQueModal && (
        <CustomModal
          title="Select Question"
          isActive={modalOpen}
          handleClose={() => {
            setModalState(false);
            setTemplateQueModal(false);
          }}
          handleCloseIcon={() => {
            setModalState(false);
          }}
          handleClick={() => {
            setModalNested(false);
            setTemplateQueModal(false);
            setModalState(true);
          }}
          buttonTitle="Add Question"
          buttonBottomTitle="Preview"
          buttonBottomFrom
          handleSaveClick={() => {
            setPreviewQuestionModal(true);
            setTemplateQueModal(false);
          }}
        >
          <SelectQuestionTemplateModal />
        </CustomModal>
      )}
      {previewQuestionModal && (
        <CustomModal
          title="Question Preview"
          isActive={modalOpen}
          handleClose={() => {
            setModalState(false);
            setTemplateQueModal(false);
          }}
          handleCloseIcon={() => {
            setModalState(false);
          }}
          handleClick={() => {
            setModalNested(false);
            setTemplateQueModal(false);
            setModalState(true);
            setPreviewQuestionModal(false);
          }}
          buttonTitle="Add Question"
          buttonBottomTitle="Back"
          buttonBottomFrom
          handleSaveClick={() => {
            setPreviewQuestionModal(false);
            setTemplateQueModal(true);
          }}
        >
          <QuestionPreview />
        </CustomModal>
      )}
    </div>
  );
};

DashboardHeader.propTypes = {
  host_ui: PropTypes.object.isRequired,
  setHostUI: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'hostUI', reducer });

const mapStateToProps = state => {
  const { hostUI } = state;
  return {
    host_ui: getHostUI(hostUI),
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    setHostUI: payload => dispatch(setHostUI(payload)),
    dispatch,
  };
}

export default compose(
  withReducer,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DashboardHeader);
