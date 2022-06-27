/* eslint-disable no-unused-vars */
/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Tab, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import classNames from 'classnames';
import closeIcon from '../../../../../../assets/images/close.svg';

const EditActionModal = ({
  close,
  optionData,
  requestSurveyLogic,
  contentId,
  requestUpdateEmail,
  updateEmailData,
  pageData,
  setLogicSurveyData,
  primaryEmailData,
  setEditActionModal,
  resetLogic,
}) => {
  const [payload, setPayload] = useState({});
  const [queId, setQueID] = useState({});

  const editExample =
    primaryEmailData &&
    primaryEmailData.example &&
    primaryEmailData.example.split('@');

  const [name, setName] = useState(
    (primaryEmailData && primaryEmailData.name) || '',
  );
  const [fromName, setFromName] = useState(
    (primaryEmailData && primaryEmailData.fromName) || '',
  );
  const [example, setExample] = useState(
    (primaryEmailData && primaryEmailData.example) || '',
  );
  const [replyTo, setReplyTo] = useState(
    (primaryEmailData && primaryEmailData.replyTo) || '',
  );
  // const [to, setTo] = useState((primaryEmailData && primaryEmailData.to) || '');
  const [subject, setSubject] = useState(
    (primaryEmailData && primaryEmailData.subject) || '',
  );
  const [textInstructions, setTextInstruction] = useState(
    (primaryEmailData && primaryEmailData.textInstructions) || '',
  );
  const [quickFillsTo, setQuickFills] = useState('test4');
  const [domain, setDomain] = useState(
    editExample && editExample[1]
      ? `@${editExample && editExample[1]} `
      : '@seramount.com',
  );
  const [errors, setErrors] = useState({});

  const { id } = useParams();

  let optionName = [];
  optionName =
    queId &&
    queId.optionsValue &&
    queId.optionsValue.length > 0 &&
    queId.optionsValue[payload && payload.contentOptions];

  const message = `#${pageData.page_no} Question "${queId &&
    queId.label}" is one of the following answers ("${optionName}")`;

  // const onChange = data => {
  //   const payloadData = {
  //     ...data,
  //     ...payload,
  //   };
  //   setPayload(payloadData);
  // };

  const handleSetLogic = () => {
    const data = {
      contentId: parseInt(contentId),
      id: parseInt(queId.id),
      isDeafultContentVisible: false,
      contentOptions: payload.contentOptions,
      display_msg: message,
      surveyId: id,
    };
    requestSurveyLogic(data);
  };

  const MENU_LIST = [
    {
      title: 'Primary Setup',
      component: (
        <PrimarySetup
          setName={setName}
          setFromName={setFromName}
          setExample={setExample}
          setReplyTo={setReplyTo}
          // setTo={setTo}
          setSubject={setSubject}
          setTextInstruction={setTextInstruction}
          setQuickFills={setQuickFills}
          setDomain={setDomain}
          errors={errors}
          primaryEmailData={primaryEmailData}
          domain={domain}
          editExample={editExample}
        />
      ),
    },
    // {
    //   title: 'Logic',
    //   component: (
    //     <Logic
    //       optionData={optionData}
    //       requestSurveyLogic={requestSurveyLogic}
    //       onChange={onChange}
    //       setQueID={setQueID}
    //     />
    //   ),
    // },
    // {
    //   title: 'Advanced',
    //   component: '',
    // },
  ];
  const [key, setKey] = useState(MENU_LIST[0].title);

  const validateForm = () => {
    const error = {};
    if (!name) {
      error.label = 'Please Enter value';
    } else if (!fromName) {
      error.label = 'Please Enter value';
    }
    // else if (!to) {
    //   error.label = 'Please Enter value';
    // }
    else if (!subject) {
      error.label = 'Please Enter value';
    }
    return error;
  };

  const handlePrimarySetup = () => {
    const errorsArray = validateForm();
    if (Object.keys(errorsArray).length > 0) {
      setErrors(errorsArray);
      return;
    }

    const data = {
      name,
      fromName,
      example: primaryEmailData
        ? editExample && editExample[0].concat(domain)
        : example.concat(domain),
      replyTo,
      // to,
      subject,
      textInstructions,
      quickFillsTo,
      survey_id: id,
    };
    if (primaryEmailData && primaryEmailData.id) {
      data.id = primaryEmailData.id;
    }
    requestUpdateEmail(data);
  };

  useEffect(() => {
    if (
      (setLogicSurveyData && setLogicSurveyData.success) ||
      (updateEmailData && updateEmailData.success)
    ) {
      setEditActionModal(false);
      setTimeout(() => {
        resetLogic();
      }, 1000);
    }
  }, [setLogicSurveyData, updateEmailData]);

  return (
    <div className="registration-modal">
      <div className="registration-modal__header with-tabs">
        <div className="wrapper__heading d-flex">Edit Option</div>
        <Button className="p-0" onClick={close}>
          <Image src={closeIcon} alt="Close" width={24} />
        </Button>
      </div>
      <Tab.Container activeKey={key}>
        <ul variant="pills" className="lined-tabs nav nav-tabs">
          {MENU_LIST.map(menu => (
            <li className="nav-item mb-0">
              <button
                onClick={() => setKey(menu.title)}
                type="button"
                className={classNames(
                  { active: key === menu.title },
                  'nav-link',
                )}
                eventKey={menu.title}
              >
                {menu.title}
              </button>
            </li>
          ))}
        </ul>
        <Tab.Content>
          {MENU_LIST.map(menu => (
            <>
              {key === menu.title && (
                <Tab.Pane eventKey={menu.title}>{menu.component}</Tab.Pane>
              )}
            </>
          ))}
        </Tab.Content>
      </Tab.Container>
      <div className="registration-modal__footer">
        <Button
          variant="blue"
          size="sm"
          onClick={() => {
            // handleSetLogic();
            handlePrimarySetup();
          }}
          disabled={
            (updateEmailData && updateEmailData.fetching) ||
            (setLogicSurveyData && setLogicSurveyData.fetching)
          }
        >
          Save
          {((updateEmailData && updateEmailData.fetching) ||
            (setLogicSurveyData && setLogicSurveyData.fetching)) && (
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

EditActionModal.propTypes = {
  close: PropTypes.func,
  optionData: PropTypes.object,
  requestSurveyLogic: PropTypes.func,
  contentId: PropTypes.string,
  requestUpdateEmail: PropTypes.func,
  updateEmailData: PropTypes.object,
  pageData: PropTypes.object,
  setLogicSurveyData: PropTypes.object,
  primaryEmailData: PropTypes.object,
  setEditActionModal: PropTypes.func,
  resetLogic: PropTypes.func,
};

export default EditActionModal;
