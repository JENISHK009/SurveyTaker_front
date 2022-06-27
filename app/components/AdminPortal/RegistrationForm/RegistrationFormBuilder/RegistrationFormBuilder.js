/* eslint-disable react/no-unescaped-entities */
/* eslint-disable indent */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Button, Image, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import docIcon from '../../../../assets/images/document.svg';
import docBlueIcon from '../../../../assets/images/blue/document.svg';
import bookmarkIcon from '../../../../assets/images/bookmark.svg';
import bookmarkBlueIcon from '../../../../assets/images/blue/bookmark.svg';
import skipIcon from '../../../../assets/images/corner-up-right.svg';
import skipBlueIcon from '../../../../assets/images/blue/corner-up-right.svg';
import mergeIcon from '../../../../assets/images/minimize.svg';
import mergeBlueIcon from '../../../../assets/images/blue/minimize.svg';
import ButtonWithHoverEffect from '../../../../common/ButtonWithHoverEffect';
import SingleChoiseOption from './QuestionType/SingleChoiseOption';
import MeetingDatesOption from './QuestionType/meetingDatesOption';
import MultipleChoiseOption from './QuestionType/MultipleChoiseOption';
import noteIcon from '../../../../assets/images/illustration_big_computer.svg';
import AddQuestionModal from './Modals/AddQuestionModal';
import ContentActions from './ContentActions';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import editIcon from '../../../../assets/images/edit.svg';
import editBlueIcon from '../../../../assets/images/blue/edit.svg';

import {
  requestCreateRegistrationPage,
  requestAddNewPage,
  requestDeleteRegistrationPage,
  requestMergeRegistrationPage,
  requestGetSurveyById,
  requestRegistrationSwapPage,
  requestRegistrationBreakPage,
  surveyLogicOptionRequest,
  requestSurveyLogic,
  requestUpdateEmail,
  requestDeleteRegistrationContentPage,
  resetLogic,
  requestCopySurveyPage,
  requestAddUpdateContentPageRequest,
  requestReorderPage,
  requestGetMeetingsForSurvey,
} from '../../../../store/actions/registrationForm';
import saga from '../../../../store/sagas/registrationForm';
import reducer, {
  createSurveyForm,
  getRegistrationForm,
  getIsRegistrationFormFetching,
  getLogicOptionSurvey,
  updateEmail,
  getaddPageFetching,
  getSurveyByID,
  swapPageLoading,
  setLogicSurvey,
  fetchCopySurveyPage,
  copyPageContentFetching,
  reorderPageContent,
  removeContent,
  breakPage,
  mergePage,
  getSurveyMeetings,
  apiMessage,
  apiSuccess,
} from '../../../../store/reducers/registrationForm';
import EditActionModal from './Modals/EditActionModal/EditActionModal';
import EditQuestionModal from './Modals/EditQuestionModal/EditQuestionModal';
import CustomModal from '../../../../common/customModal';
import CustomToaster from '../../CustomToaster';
import QuickAnswer from './QuestionType/QuickAnswer';
// import ViewConditions from './ViewConditions';

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};
const DEFAULT_PAGES = {
  REGISTRATOION_PAGE_CONTENT: [
    {
      type: 'text_media',
      title: `
            <h6 class="fs-18 fw-bold mb-3">TItle:</h6>
           `,
      rank: 0,
      option: [],
      questionType: 'quick_answer',
    },
  ],
  // surveyId: id,
};
const RegistrationFormBuilder = props => {
  const [pages, setPages] = useState([]);
  const [primary, setPrimary] = useState([]);
  const [questionModal, setQuestionsModal] = useState(false);
  const [textInstructionModal, setTextInstructionModal] = useState(false);
  const [activePage, setActivePage] = useState(null);
  const [activeContentIndex, setActiveContentIndex] = useState(null);
  const [movePagesModal, setMovePagesModal] = useState(false);
  const [editActionModal, setEditActionModal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [contentId, setContentPageId] = useState('');
  const history = useHistory();
  const [pageData, setPageData] = useState('');
  const [editModal, setEditModal] = useState();
  const [editQuestionModal, setEditQuestionModal] = useState(false);
  const [editTextInstructionModal, setEditTextInstructionModal] = useState(
    false,
  );
  const [editThanksModal, setEditThanksModal] = useState(false);
  const [copyPage, setCopyPage] = useState(false);
  const [data, setData] = useState({});
  const [thanksContentType, setThanksContentType] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [choiseOptions, setChoiseOptions] = useState([null]);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const [copyIndex, setCopyIndex] = useState('');
  const [addPageIndex, setAddPageIndex] = useState('');
  const [deleteData, setDeleteData] = useState({});
  const [mergePageIndex, setMergePageIndex] = useState('');
  const [pageBreakIndex, setPageBreakIndex] = useState('');
  const [editContentData, setEditContentData] = useState({});
  const [contentData, setContentData] = useState({});
  const { id } = useParams();

  const { registrationFormPages, surveyMeetings } = props;
  const { apiMessage, apiSuccess } = props;

  if (!apiSuccess && apiMessage) {
    toast.error(apiMessage || 'Something went wrong');
  }
  if (apiSuccess && apiMessage) {
    toast.success(apiMessage);
  }

  useEffect(() => {
    if (apiMessage) {
      props.resetLogic();
    }
  }, [apiMessage]);

  useEffect(() => {
    if (!id) {
      return;
    }
    const { data } = registrationFormPages;
    if (data && data.length > 0) {
      return;
    }
    props.requestGetSurveyById({ id });
    props.requestGetMeetingsForSurvey({ id });
  }, [id]);

  useEffect(() => {
    if (!props.swapPageLoading) {
      setMovePagesModal(false);
    }
  }, [props.swapPageLoading]);

  useEffect(() => {
    if (registrationFormPages && registrationFormPages.length === 0) {
      return;
    }
    const { data, REGISTRATION_PAGE_CONTENT_EMAIL } = registrationFormPages;
    setPrimary(REGISTRATION_PAGE_CONTENT_EMAIL);
    if (data && data.length > 0) {
      console.log('data ', data);
      const getExceptZeroPage = data.filter(page => page.page_no !== 0);
      const getZeroPage = data.filter(page => page.page_no === 0);
      const newData = [...getExceptZeroPage, ...getZeroPage];

      // const updatedPages =
      //   newData &&
      //   newData.length > 0 &&
      //   newData.map(page => {
      //     page.map(content => {
      //       if (
      //         content.questionType === 'meeting_dates' &&
      //         surveyMeetings.data &&
      //         surveyMeetings.data.length > 0
      //       ) {
      //         if (content.optionsValue) {
      //           content.updatedOptionValue =
      //             [...surveyMeetings.data, ...content.optionsValue] || [];
      //         } else {
      //           content.updatedOptionValue = [...surveyMeetings.data] || [];
      //         }
      //       }
      //       return content;
      //     });
      //     return page;
      //   });

      // console.log('updatedPages', updatedPages);
      setPages(data);
      setChoiseOptions(newData);
    } else {
      setChoiseOptions(DEFAULT_PAGES);
      // if (isClicked === false) {
      //   handleSave(DEFAULT_PAGES);
      // }
      setIsClicked(true);
    }
  }, [
    registrationFormPages,
    registrationFormPages.data,
    registrationFormPages.REGISTRATION_PAGE_CONTENT_EMAIL,
    editContentData.data,
  ]);

  const handleAddNewPage = (pageNumber, index) => {
    setAddPageIndex(index);
    props.requestAddNewPage({
      id,
      pageNo: pageNumber + 1,
    });
  };

  useEffect(() => {
    if (contentId) {
      const data = {
        id,
        contentIndex: contentId.content_index,
        contentPage: pageData.page_no,
      };
      props.surveyLogicOptionRequest(data);
    }
  }, [contentId]);

  const handleMergePages = pageNumber => {
    props.requestMergeRegistrationPage({
      id,
      mainPage: pageNumber,
      mergePage: pageNumber + 1,
    });
  };

  const handlePageBreak = (pageIndex, contentIndex) => {
    props.requestRegistrationBreakPage({ id, pageIndex, contentIndex });
  };

  const handleDeletePage = pageNumber => {
    props.requestDeleteRegistrationPage({
      id,
      pageNumber,
    });
  };

  const handleDeleteContent = (pageNumber, index, contentDataId) => {
    let dataINDEX = null;
    let newArr = [...pages];
    newArr &&
      newArr.length > 0 &&
      newArr.map((datas, i) =>
        // eslint-disable-next-line array-callback-return
        datas.REGISTRATOION_PAGE_CONTENT.map(obj => {
          if (deleteData && deleteData.data && deleteData.data.id === obj.id) {
            dataINDEX = i;
          }
        }),
      );
    newArr[dataINDEX].REGISTRATOION_PAGE_CONTENT.splice(
      deleteData && deleteData.index,
      1,
    );
    setPages(newArr);
    const data = {
      surveyId: id,
      contentid: deleteData && deleteData.data && deleteData.data.id,
      pageId: deleteData && deleteData.data && deleteData.data.page_id,
    };
    props.requestDeleteRegistrationContentPage({ data });
  };

  const handleSave = data => {
    props.requestCreateRegistrationPage({
      id,
      data,
    });
  };

  const openQuestionModal = (type, pageIndex, contentIndex) => {
    setQuestionsModal(true);
    if (type === 'content') {
      setActiveContentIndex(contentIndex);
    } else {
      setActiveContentIndex(pageIndex.REGISTRATOION_PAGE_CONTENT.length - 1);
    }
    setActivePage(pageIndex);
  };

  const openTextModal = (type, pageIndex, contentIndex) => {
    setTextInstructionModal(true);
    if (type === 'content') {
      setActiveContentIndex(contentIndex);
    } else {
      setActiveContentIndex(pageIndex.REGISTRATOION_PAGE_CONTENT.length - 1);
    }
    setActivePage(pageIndex);
  };

  const wrappedDataIntoArrayAndSave = data => {
    const wrappedData = [].concat(data);
    handleSave(wrappedData);
  };

  const handleRedirectmanage = data => {
    history.push({
      pathname: `/surveys/registration-form/preview/${id}`,
      state: { pageData: data },
    });
  };

  const handleEditModal = (data, pageData) => {
    setEditModal(data);
    setPageData(pageData);
    if (data.type === 'question') {
      setEditQuestionModal(true);
    }

    if (data.type === 'text_media') {
      setEditTextInstructionModal(true);
    }
  };
  useEffect(() => {
    if (props.copySurveyPage && props.copySurveyPage.success) {
      setCopyPage(false);
    }
  }, [props.copySurveyPage]);

  const onCopyPage = () => {
    props.requestCopySurveyPage({ surveyId: data.surveyId, pageId: data.id });
  };

  const handleCopyContent = (data, index, pageData) => {
    setCopyIndex(index);
    if (data.type === 'question') {
      const addQueVal = {
        questionType: data.questionType,
        type: 'question',
        label: data.label,
        isRequire: data.isRequire,
        optionsValue: data.optionsValue,
      };
      props.requestAddUpdateContentPageRequest({
        data: addQueVal,
        surveyId: id,
        // page_id: 1,
        // upper_content_index: index,
      });
    } else {
      const textEditorVal = {
        type: 'text_media',
        contentValue: data.contentValue,
      };
      props.requestAddUpdateContentPageRequest({
        data: textEditorVal,
        surveyId: id,
        page_id: pageData.id,
        upper_content_index: index,
      });
    }
  };

  const onDragStart = event => {
    const initialPosition = Number(event.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: choiseOptions,
    });
    event.dataTransfer.setData('text/html', '');
  };

  const onDragOver = (event, pageno) => {
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;
    const { draggedFrom } = dragAndDrop;
    const draggedTo = event.currentTarget.dataset.position;

    const remainingItems = newList.find((item, idx) => {
      if (item.page_no === pageno) {
        return item;
      }
    });
    const remainData = remainingItems.REGISTRATOION_PAGE_CONTENT;
    const itemDragged = remainData[draggedFrom];
    const newdata =
      remainData &&
      remainData.length > 0 &&
      remainData.filter((obj, idx) => idx !== draggedFrom);
    newList = [
      ...newdata.slice(0, draggedTo),
      itemDragged,
      ...newdata.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo,
      });
    }
  };

  const onDrop = (pageno, pageId) => {
    const { draggedFrom, draggedTo } = dragAndDrop;
    if (draggedFrom === draggedTo) {
      return;
    }
    const val = [];
    const dropData =
      choiseOptions &&
      choiseOptions.length > 0 &&
      choiseOptions.map(obj => {
        if (obj.page_no === pageno)
          obj.REGISTRATOION_PAGE_CONTENT = dragAndDrop.updatedOrder;
        return obj;
      });

    dropData &&
      dropData.length > 0 &&
      dropData.filter(obj => {
        if (obj.page_no === pageno) {
          obj.REGISTRATOION_PAGE_CONTENT &&
            obj.REGISTRATOION_PAGE_CONTENT.length > 0 &&
            obj.REGISTRATOION_PAGE_CONTENT.map(datas => {
              val.push(datas.id);
            });
        }
      });

    setChoiseOptions(dropData);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
    const data = { id, page_id: pageId, contentIds: val };
    props.requestReorderPage({ data });
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  useEffect(() => {
    if (props.removeContent && props.removeContent.success) {
      setDeleteModal(false);
    }
  }, [props.removeContent]);
  console.log('pages', pages);
  return (
    <>
      {props.getSurveyByIdLoader ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      ) : (
        <>
          {pages &&
            pages.length > 0 &&
            pages.map((pageData, index, idx) => (
              <>
                <div className="form-build-page">
                  <div className="form-build-page__wrapper">
                    <div
                      className={classNames(
                        {
                          'green w-100':
                            data.type === 'thank_you' && data.label,
                          'thank-you-page__wrapper dashed-border-on-hover green form-build-page__fill overflow-hidden p-0':
                            data.type === 'thank_you' && data.label,
                        },
                        'form-build-page__block',
                      )}
                    >
                      {console.log('data ====>>>', data)}
                      <div
                        className={classNames(
                          {
                            'form-build-page__fill ':
                              data.type === 'thank_you' && data.contentValue,
                            'blue form-build-page__fill  dashed-border-on-hover':
                              data.type !== 'thank_you' &&
                              pageData.page_no !== 1,
                          },
                          'registration-default-text',
                        )}
                      >
                        {pageData.questionType === 'quick_answer' && (
                          <QuickAnswer data={pageData} />
                        )}
                        {pageData.questionType === 'meeting_dates' && (
                          <MeetingDatesOption data={pageData} />
                        )}
                        {pageData.questionType === 'one_choice' && (
                          <SingleChoiseOption data={pageData} />
                        )}
                        {(pageData.questionType === 'multiple_choice' ||
                          pageData.questionType === 'rank_order') && (
                          <MultipleChoiseOption data={pageData} />
                        )}
                      </div>
                      <div className="form-build-page__actions">
                        {pageData.questionType !== 'quick_answer' && (
                          <>
                            <ButtonWithHoverEffect
                              defaultImage={editIcon}
                              hoverImage={editBlueIcon}
                              hoverColor="blue"
                              text="Edit"
                              imageWidth={16}
                              imageClassNames="me-2"
                              onClick={() =>
                                handleEditModal(pageData, pageData)
                              }
                            />
                          </>
                        )}
                      </div>
                    </div>
                    {/* ))} */}

                    <div className="form-build-page__footer">
                      <span className="text-bismark fs-14">Add New: </span>
                      <ButtonWithHoverEffect
                        hoverColor="blue"
                        text="Questions"
                        onClick={() => openQuestionModal('page', pageData)}
                      />
                    </div>
                  </div>
                </div>
              </>
            ))}
          {questionModal && (
            <AddQuestionModal
              close={() => setQuestionsModal(false)}
              pageData={activePage}
              activeContentIndex={activeContentIndex}
              setActiveContentIndex={setActiveContentIndex}
              isHandleCloseSpinner={props.registrationFormPagesChk}
              registrationFormPages={props.registrationFormPages}
              pageId={id}
              setContentData={setContentData}
              requestGetMeetingsForSurvey={() =>
                props.requestGetMeetingsForSurvey({ id })
              }
            />
          )}
          {editQuestionModal && (
            <EditQuestionModal
              close={() => setEditQuestionModal(false)}
              pageData={activePage}
              activeContentIndex={activeContentIndex}
              isHandleCloseSpinner={props.registrationFormPagesChk}
              registrationFormPages={props.registrationFormPages}
              pageId={id}
              editModal={editModal}
              editPageModal={pageData}
              surveyMeetings={surveyMeetings}
              pages={pages}
              setEditContentData={setEditContentData}
              setContentData={setContentData}
              requestGetMeetingsForSurvey={() =>
                props.requestGetMeetingsForSurvey({ id })
              }
            />
          )}

          {editActionModal && (
            <EditActionModal
              optionData={
                props.getSurveyLogicOption &&
                props.getSurveyLogicOption.getLogicOptions
              }
              close={() => setEditActionModal(false)}
              requestSurveyLogic={props.requestSurveyLogic}
              contentId={contentId.id}
              requestUpdateEmail={props.requestUpdateEmail}
              updateEmailData={props.updateEmail}
              pageData={pageData}
              setLogicSurveyData={props.setLogicSurveyData}
              primaryEmailData={primary}
              setEditActionModal={setEditActionModal}
              resetLogic={props.resetLogic}
            />
          )}
        </>
      )}
    </>
  );
};

RegistrationFormBuilder.propTypes = {
  requestCreateRegistrationPage: PropTypes.func,
  registrationFormPagesChk: PropTypes.bool,
  registrationFormPages: PropTypes.array,
  requestAddNewPage: PropTypes.func,
  requestDeleteRegistrationPage: PropTypes.func,
  requestMergeRegistrationPage: PropTypes.func,
  requestGetSurveyById: PropTypes.func,
  requestRegistrationSwapPage: PropTypes.func,
  requestRegistrationBreakPage: PropTypes.func,
  surveyLogicOptionRequest: PropTypes.func,
  getSurveyLogicOption: PropTypes.object,
  requestSurveyLogic: PropTypes.func,
  requestUpdateEmail: PropTypes.func,
  requestDeleteRegistrationContentPage: PropTypes.func,
  updateEmail: PropTypes.object,
  addFetchKey: PropTypes.bool,
  getSurveyByIdLoader: PropTypes.bool,
  swapPageLoading: PropTypes.bool,
  setLogicSurveyData: PropTypes.object,
  resetLogic: PropTypes.func,
  requestCopySurveyPage: PropTypes.func,
  requestAddUpdateContentPageRequest: PropTypes.func,
  copySurveyPage: PropTypes.object,
  copyPageContentFetching: PropTypes.bool,
  requestReorderPage: PropTypes.func,
  removeContent: PropTypes.object,
  breakPage: PropTypes.object,
  mergePage: PropTypes.object,
  requestGetMeetingsForSurvey: PropTypes.func,
  surveyMeetings: PropTypes.object,
  // reorderPageContent: PropTypes.object,
  apiSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
};

const mapStateToProps = state => {
  const { registrationForm, app } = state;
  return {
    registrationFormPagesChk: getIsRegistrationFormFetching(registrationForm),
    registrationFormPages: getRegistrationForm(registrationForm),
    survey: createSurveyForm(registrationForm),
    getSurveyLogicOption: getLogicOptionSurvey(registrationForm),
    updateEmail: updateEmail(registrationForm),
    setLogicSurveyData: setLogicSurvey(registrationForm),
    addFetchKey: getaddPageFetching(registrationForm),
    copyPageContentFetching: copyPageContentFetching(registrationForm),
    getSurveyByIdLoader: getSurveyByID(registrationForm),
    swapPageLoading: swapPageLoading(registrationForm),
    copySurveyPage: fetchCopySurveyPage(registrationForm),
    reorderPageContent: reorderPageContent(registrationForm),
    removeContent: removeContent(registrationForm),
    breakPage: breakPage(registrationForm),
    mergePage: mergePage(registrationForm),
    surveyMeetings: getSurveyMeetings(registrationForm),
    apiSuccess: apiSuccess(registrationForm),
    apiMessage: apiMessage(registrationForm),
    isGlobalAppFetching: app.fetching,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestCreateRegistrationPage: payload =>
      dispatch(requestCreateRegistrationPage(payload)),
    requestRegistrationSwapPage: payload =>
      dispatch(requestRegistrationSwapPage(payload)),
    requestAddNewPage: payload => dispatch(requestAddNewPage(payload)),
    requestDeleteRegistrationPage: payload =>
      dispatch(requestDeleteRegistrationPage(payload)),
    requestMergeRegistrationPage: payload =>
      dispatch(requestMergeRegistrationPage(payload)),
    requestGetSurveyById: payload => dispatch(requestGetSurveyById(payload)),
    requestRegistrationBreakPage: payload =>
      dispatch(requestRegistrationBreakPage(payload)),
    surveyLogicOptionRequest: payload =>
      dispatch(surveyLogicOptionRequest(payload)),
    requestSurveyLogic: payload => dispatch(requestSurveyLogic(payload)),
    requestUpdateEmail: payload => dispatch(requestUpdateEmail(payload)),
    requestDeleteRegistrationContentPage: payload =>
      dispatch(requestDeleteRegistrationContentPage(payload)),
    resetLogic: () => dispatch(resetLogic()),
    requestCopySurveyPage: payload => dispatch(requestCopySurveyPage(payload)),
    requestAddUpdateContentPageRequest: payload =>
      dispatch(requestAddUpdateContentPageRequest(payload)),
    requestReorderPage: payload => dispatch(requestReorderPage(payload)),
    requestGetMeetingsForSurvey: payload =>
      dispatch(requestGetMeetingsForSurvey(payload)),
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
)(RegistrationFormBuilder);
