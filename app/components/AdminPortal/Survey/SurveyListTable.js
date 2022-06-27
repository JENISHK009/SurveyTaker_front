/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Image, Dropdown, Spinner, Button } from 'react-bootstrap';
import moment from 'moment';

import trashIcon from '../../../assets/images/trash.svg';
import moreHZIcon from '../../../assets/images/more-horizontal.svg';
import Archive from '../../../assets/images/archive.svg';
// import mark from '../../../assets/images/marked.svg';

// import Star from '../../../assets/images/star.svg';

import TableComponent from '../../../common/TableComponent';
import CustomModal from '../../../common/customModal';

const SurveyListTable = ({ setCheckedCount, checkedCount, ...props }) => {
  const [copyModal, setCopyModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [Id, setId] = useState('');

  const onCopySurvey = () => {
    props.requestCopySurvey({ surveyId: Id });
  };

  useEffect(() => {
    if (props.surveyArchivedData && props.surveyArchivedData.success) {
      setArchiveModal(false);
    }
  }, [props.surveyArchivedData]);

  const onArchiveSurvey = () => {
    props.requestSurveyArchived({ surveyId: [Id] });
  };

  useEffect(() => {
    if (props.copySurvey && props.copySurvey.success) {
      setCopyModal(false);
      props.SurveysRequest();
    }
  }, [props.copySurvey]);

  const handleChange = (e, id) => {
    let updatedData = [];
    if (e.target.checked) {
      updatedData = [...checkedCount, id];
      setCheckedCount([...checkedCount, id]);
    } else {
      updatedData =
        checkedCount &&
        checkedCount.length > 0 &&
        checkedCount.filter(opt => opt !== id);
      setCheckedCount(updatedData);
    }
  };

  const setAllRowsChecked = e => {
    if (props.getSuerveyData && props.getSuerveyData.length > 0) {
      if (e.target.checked) {
        const surveyIdsArray = props.getSuerveyData.map(list => list.id);
        setCheckedCount(surveyIdsArray);
      } else {
        setCheckedCount([]);
      }
    }
  };

  const headerActions = () => (
    <th colSpan={6} className="text-end bg-blue">
      <div className="d-flex justify-content-end">
        <Button
          variant="blue"
          className="me-0"
          onClick={() => {
            props.handleSurveyDelete(checkedCount);
          }}
        >
          <Image src={trashIcon} className="me-2" />
          Trash
        </Button>
      </div>
    </th>
  );

  const tableConstants = () => [
    {
      title: (
        <Form.Check className="checkbox">
          <Form.Check.Input
            id="checkbox2"
            className="checkbox-input"
            onChange={setAllRowsChecked}
          />
          <Form.Check.Label htmlFor="checkbox2" className="checkbox-label" />
        </Form.Check>
      ),
      render: rowData => (
        <Form.Check className="checkbox">
          <Form.Check.Input
            id={`checkbox-${rowData.id}`}
            className="checkbox-input"
            onChange={e => handleChange(e, rowData.id)}
            checked={checkedCount.includes(rowData.id)}
          />
          <Form.Check.Label htmlFor="checkbox2" className="checkbox-label" />
        </Form.Check>
      ),
    },
    {
      title: 'Name',
      render: rowData => <span aria-hidden="true">{rowData.surveyName}</span>,
    },
    {
      title: 'Length',
      render: rowData => <span aria-hidden="true">{rowData.pageLength}</span>,
    },
    {
      title: 'Questions',
      render: rowData => <span aria-hidden="true">{rowData.questionNo}</span>,
    },
    {
      title: 'Date Created',
      render: rowData => (
        <span>
          {`${moment(rowData.createdAt).format('L')}${', '}${moment(
            rowData.createdAt,
          ).format('LT')}`}
        </span>
      ),
    },
    {
      title: 'Last Edited',
      render: rowData => (
        <span>
          {' '}
          {`${moment(rowData.updatedAt).format('L')}${', '}${moment(
            rowData.updatedAt,
          ).format('LT')}`}
        </span>
      ),
    },

    // {
    //   title: '',
    //   render: rowData => (
    //     <span>
    //       <Image src={rowData.stared ? mark : Star} />
    //     </span>
    //   ),
    // },
    {
      title: 'Action',
      render: rowData => (
        <>
          <Dropdown align="end">
            <Dropdown.Toggle className="p-0 m-0">
              <Image src={moreHZIcon} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setCopyModal(true);
                  setId(rowData.id);
                }}
              >
                <Image className="me-2" src={Copy} /> Copy
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setArchiveModal(true);
                  setId(rowData.id);
                }}
              >
                <Image className="me-2" src={Archive} /> Archive
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                className="text-red"
                onClick={() => {
                  props.handleSurveyDelete({ surveyId: [rowData.id] });
                }}
              >
                <Image
                  className="me-2"
                  style={{ height: '24px' }}
                  src={trashIcon}
                />{' '}
                Move To Trash
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ),
    },
  ];

  console.log('props.getSuerveyData', props.getSuerveyData);
  return (
    <>
      {props.getAllSurveyFetching ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      ) : (
        <TableComponent
          cols={tableConstants(handleChange)}
          checkedCount={checkedCount}
          setCheckedCount={setCheckedCount}
          data={props.getSuerveyData.length > 0 ? props.getSuerveyData : []}
          hasHoverMenu
          tableClassName="survey"
          striped
          headerActions={headerActions}
        />
      )}

      {copyModal && (
        <CustomModal
          title="Copy Survey"
          isActive
          buttonTitle="Copy Survey"
          handleClose={onCopySurvey}
          buttonBottomTitle="Cancel"
          handleCloseIcon={() => setCopyModal(false)}
          isHandleCloseSpinner={props.copySurvey && props.copySurvey.fetching}
        >
          <p className="text-bismark mb-1">
            This will create replicate Survey.{' '}
          </p>
        </CustomModal>
      )}

      {archiveModal && (
        <CustomModal
          title="Archive Survey"
          isActive
          buttonTitle="Archive Survey"
          handleClose={onArchiveSurvey}
          buttonBottomTitle="Cancel"
          handleCloseIcon={() => setArchiveModal(false)}
          isHandleCloseSpinner={
            props.surveyArchivedData && props.surveyArchivedData.fetching
          }
        >
          <p className="text-bismark mb-1">Archive this Survey. </p>
        </CustomModal>
      )}
    </>
  );
};

SurveyListTable.propTypes = {
  setModalState: PropTypes.func,
  setModalMove: PropTypes.bool,
  getSuerveyData: PropTypes.object,
  setDeleteModal: PropTypes.bool,
  handleSurveyDelete: PropTypes.func,
  getAllSurveyFetching: PropTypes.bool,
  copySurvey: PropTypes.object,
  requestCopySurvey: PropTypes.func,
  requestSurveyArchived: PropTypes.func,
  surveyArchivedData: PropTypes.object,
  setCheckedCount: PropTypes.func,
  checkedCount: PropTypes.array,
  SurveysRequest: PropTypes.func,
};
export default SurveyListTable;
