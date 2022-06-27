/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Spinner, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import injectSaga from '../../../../../../utils/injectSaga';
import injectReducer from '../../../../../../utils/injectReducer';
import saga from '../../../../../../store/sagas/registrationForm';
import reducer, {
  getLogicOptionSurvey,
  setLogicSurvey,
} from '../../../../../../store/reducers/registrationForm';
import {
  AddUpdateContentPageRequestSuccess,
  AddUpdateContentPageRequestFailed,
  surveyLogicOptionRequest,
  requestSurveyLogic,
  requestRemoveAllLogic,
} from '../../../../../../store/actions/registrationForm';
import closeIcon from '../../../../../../assets/images/close.svg';
import Question from './Question';
import { addUpdatePageContent } from '../../../../../../store/apis/registrationForm';

const EditQuestionModal = ({
  close,
  pageData,
  editModal,
  requestGetMeetingsForSurvey,
  ...props
}) => {
  const [QuestionData, setQuestionData] = useState({});
  const [isProcessing, setIsProcessing] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const [payload, setPayload] = useState({});
  const [editLogic, setEditLogic] = useState([]);
  const [optionName, setOptionName] = useState([]);
  const [type, setType] = useState('');
  const [isLogicRemoved, setIsLogicRemoved] = useState(null);

  const { id } = useParams();

  const validateLogicForm = () => {
    const error = {};
    if (
      selectedOption &&
      selectedOption.label &&
      payload &&
      payload.contentOptions &&
      payload.contentOptions.length === 0
    ) {
      error.options = 'Please Select Option';
    }
    return error;
  };

  useEffect(() => {
    if (Object.keys(editModal).length === 0) {
      return;
    }
    setQuestionData(editModal);
  }, [editModal]);
  const validateForm = () => {
    const error = {};
    if (!QuestionData.label) {
      error.label = 'Please Enter Your Question';
    }
    if (
      !QuestionData.optionsValue[0] &&
      QuestionData.questionType !== 'meeting_dates'
    ) {
      error.options = 'Please Add Options';
    }

    return error;
  };
  const onSaveQuestion = () => {
    const { optionsValue } = QuestionData;
    const errorsArray = validateForm();
    if (Object.keys(errorsArray).length > 0) {
      setErrors(errorsArray);
      return;
    }
    if (optionsValue[optionsValue.length - 1] === null) {
      optionsValue.splice(optionsValue.length - 1, 1);
    }
    const REGISTRATOION_PAGE_CONTENT = {
      questionType: QuestionData.questionType,
      title: QuestionData.label,
      isRequire: QuestionData.isRequire,
      options: QuestionData.optionsValue,
      type: 'question',
      id: editModal.id,
      meetingDateCustom: QuestionData.meetingDateCustom,
    };
    setIsProcessing(true);
    const finalPayload = {
      REGISTRATOION_PAGE_CONTENT,
      surveyId: id,
    };
    addUpdatePageContent(finalPayload)
      .then(res => {
        props.AddUpdateContentPageRequestSuccess(res.data.data);
        setIsProcessing(null);
        if (QuestionData.questionType === 'meeting_dates') {
          requestGetMeetingsForSurvey();
        }
        setQuestionData({});
        setTimeout(() => {
          close();
        }, 500);
      })
      .catch(err => {
        props.AddUpdateContentPageRequestFailed(err);
        setIsProcessing(null);
        close();
      });
  };

  useEffect(() => {
    if (editModal) {
      const data = {
        id: props.pageId,
        contentIndex: editModal.content_index,
        contentPage: props.editPageModal.page_no,
      };
      props.surveyLogicOptionRequest(data);
    }
  }, [editModal]);

  const onChange = data => {
    setPayload(data);
  };

  useEffect(() => {
    const arr = [];
    selectedOption &&
      selectedOption.optionsValue &&
      selectedOption.optionsValue.length > 0 &&
      selectedOption.optionsValue.map((obj, index) => {
        payload &&
          payload.contentOptions &&
          payload.contentOptions.length > 0 &&
          payload.contentOptions.map((ele, idx) => {
            if (idx === index) {
              arr.push(obj);
              setOptionName(arr);
            }
          });
      });
  }, [payload && payload.contentOptions]);

  const dataAvail =
    props.surveyMeetings &&
    props.surveyMeetings.data &&
    props.surveyMeetings.data.length > 0 &&
    props.surveyMeetings.data[
      props.surveyMeetings && props.surveyMeetings.data.length - 1
    ];

  const message = `#${props.editPageModal.page_no} Question "${selectedOption &&
    selectedOption.label}" ${
    type !== '' ? type : 'is one of the following answers'
  } ("${
    selectedOption && selectedOption.questionType === 'meeting_dates'
      ? dataAvail && dataAvail.not_available
      : optionName
  }")`;

  const handleSetLogic = () => {
    if (selectedOption && selectedOption.questionType !== 'quick_answer') {
      const errorsArray = validateLogicForm();
      if (Object.keys(errorsArray).length > 0) {
        setErrors(errorsArray);
        return;
      }
    }
    if (isLogicRemoved) {
      props.requestRemoveAllLogic({
        id: isLogicRemoved,
        surveyId: props.pageId,
      });
    }

    if (Object.keys(selectedOption).length > 0 && !isLogicRemoved) {
      const data = {
        contentId: editModal.id,
        id: selectedOption.id,
        isDeafultContentVisible: false,
        contentOptions:
          selectedOption.questionType === 'quick_answer'
            ? null
            : payload.contentOptions,
        display_msg: message,
        surveyId: props.pageId,
      };
      props.requestSurveyLogic(data);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const editLogic = [];
    props.pages &&
      props.pages.length > 0 &&
      props.pages.map(ele => {
        ele &&
          ele.REGISTRATOION_PAGE_CONTENT &&
          ele.REGISTRATOION_PAGE_CONTENT.length > 0 &&
          ele.REGISTRATOION_PAGE_CONTENT.find(obj => {
            if (obj.contentId === parseInt(editModal && editModal.id)) {
              editLogic.push(obj);
            }
          });
      });
    if (editLogic) {
      setEditLogic(editLogic);
      if (editLogic && editLogic[0] && editLogic[0].contentOptions) {
        setPayload(editLogic && editLogic[0] && editLogic[0].contentOptions);
      }
    }
  }, [props.editPageModal, props.pages]);

  const MENU_LIST = [
    {
      title: 'Question',
      component: (
        <Question
          pageData={pageData}
          setQuestionData={setQuestionData}
          QuestionData={QuestionData}
          errors={errors}
          setErrors={setErrors}
        />
      ),
    },
  ];
  // eslint-disable-next-line no-unused-vars
  const [key, setKey] = useState(MENU_LIST[0].title);

  return (
    <div className="registration-modal">
      <div className="registration-modal__header with-tabs">
        <div className="wrapper__heading d-flex">Edit Option</div>
        <Button className="p-0" onClick={close}>
          <Image src={closeIcon} alt="Close" width={24} />
        </Button>
      </div>
      <Tabs
        defaultActiveKey={MENU_LIST[0].title}
        className="lined-tabs nav-item mb-0"
      >
        {editModal && editModal.questionType !== 'rank_order' ? (
          MENU_LIST.map(menu => (
            <Tab
              eventKey={menu.title}
              title={menu.title}
              key={menu.title}
              onClick={() => setKey(menu.title)}
            >
              <div style={{ padding: '1rem' }}>{menu && menu.component}</div>
            </Tab>
          ))
        ) : (
          <Tab
            eventKey="Question"
            title="Question"
            key="Question"
            onClick={() => setKey('Question')}
          >
            <div style={{ padding: '1rem' }}>
              {' '}
              <Question
                pageData={pageData}
                setQuestionData={setQuestionData}
                QuestionData={QuestionData}
                errors={errors}
                setErrors={setErrors}
              />
            </div>
          </Tab>
        )}
      </Tabs>

      <div className="registration-modal__footer">
        <Button
          variant="blue"
          size="sm"
          onClick={() => {
            onSaveQuestion();
            handleSetLogic();
          }}
          disabled={
            isProcessing ||
            (props.setLogicSurveyData && props.setLogicSurveyData.fetching)
          }
        >
          Save
          {(isProcessing ||
            (props.setLogicSurveyData &&
              props.setLogicSurveyData.fetching)) && (
            <Spinner
              className="ms-2"
              animation="border"
              role="status"
              size="sm"
            />
          )}
        </Button>
        <Button
          variant="link"
          size="sm"
          className="text-blue hover-decoration"
          onClick={close}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

EditQuestionModal.propTypes = {
  close: PropTypes.func,
  editModal: PropTypes.object,
  pageData: PropTypes.object,
  AddUpdateContentPageRequestFailed: PropTypes.func,
  AddUpdateContentPageRequestSuccess: PropTypes.func,
  surveyLogicOptionRequest: PropTypes.func,
  requestSurveyLogic: PropTypes.func,
  editPageModal: PropTypes.object,
  pageId: PropTypes.string,
  getSurveyLogicOption: PropTypes.object,
  setLogicSurveyData: PropTypes.object,
  surveyMeetings: PropTypes.object,
  pages: PropTypes.object,
  requestRemoveAllLogic: PropTypes.func,
  requestGetMeetingsForSurvey: PropTypes.func,
};

const mapStateToProps = state => {
  const { registrationForm, app } = state;
  return {
    getSurveyLogicOption: getLogicOptionSurvey(registrationForm),
    setLogicSurveyData: setLogicSurvey(registrationForm),
    isGlobalAppFetching: app.fetching,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    AddUpdateContentPageRequestSuccess: payload =>
      dispatch(AddUpdateContentPageRequestSuccess(payload)),
    AddUpdateContentPageRequestFailed: payload =>
      dispatch(AddUpdateContentPageRequestFailed(payload)),
    surveyLogicOptionRequest: payload =>
      dispatch(surveyLogicOptionRequest(payload)),
    requestSurveyLogic: payload => dispatch(requestSurveyLogic(payload)),
    requestRemoveAllLogic: payload => dispatch(requestRemoveAllLogic(payload)),

    dispatch,
  };
}

const withReducer = injectReducer({ key: 'registrationForm', reducer });
const withSaga = injectSaga({ key: 'registrationForm', saga });

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EditQuestionModal);
