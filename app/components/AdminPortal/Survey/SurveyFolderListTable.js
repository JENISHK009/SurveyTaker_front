/* eslint-disable indent */
/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Image, Dropdown, Spinner, Button } from 'react-bootstrap';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import trashIcon from '../../../assets/images/trash.svg';
import moreHZIcon from '../../../assets/images/more-horizontal.svg';
import TableComponent from '../../../common/TableComponent';
import CustomModal from '../../../common/customModal';

const SurveyFolderListTable = ({
  setCheckedCount,
  checkedCount,
  checkedFolderCount,
  setCheckedFolderCount,
  requestFolderList,
  surveyType,
  ...props
}) => {
  const [copyModal, setCopyModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [Id, setId] = useState('');
  const [idCount, setIdCount] = useState([]);
  const history = useHistory();

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
      requestFolderList(true);
    }
  }, [props.copySurvey]);

  const handleChange = (e, id, type) => {
    let updatedData = [];
    if (e.target.checked) {
      if (type === 'folder') {
        updatedData = [...checkedFolderCount, id];
        setCheckedFolderCount([...checkedFolderCount, id]);
      } else {
        updatedData = [...checkedCount, id];
        setCheckedCount([...checkedCount, id]);
      }
      return;
    }
    if (type === 'folder') {
      updatedData = checkedFolderCount.filter(opt => opt !== id);
      setCheckedFolderCount(updatedData);
    } else {
      updatedData = checkedCount.filter(opt => opt !== id);
      setCheckedCount(updatedData);
    }
  };
  const headerActions = () => (
    <th colSpan={6} className="text-end bg-blue">
      <div className="d-flex justify-content-end">
        <Button
          variant="blue"
          className="me-0"
          onClick={() => {
            props.handleSurveyDelete({
              surveyId: checkedCount,
              folderId: checkedFolderCount,
            });
          }}
        >
          <Image src={trashIcon} className="me-2" />
          Trash
        </Button>
      </div>
    </th>
  );

  const handleRedirectSurvey = data => {
    history.push(`/surveys/list/${data.id}`, data.id);
  };

  const tableConstants = () => [
 
    {
      title: 'Name',
      render: rowData => <span>{rowData.surveyName}</span>,
    },

    {
      title: 'Date Created',
      render: rowData => (
        <span>
          {moment(rowData.createdAt).format('L')}
          {moment(rowData.createdAt).format('LT')}
        </span>
      ),
    },
    {
      title: 'Action',
      render: rowData => (
        <Dropdown align="end">
          <Dropdown.Toggle className="p-0 m-0">
            <Image src={moreHZIcon} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              className="text-red"
              onClick={() => {
                props.handleSurveyDelete({
                  folderId: [rowData.id],
                  surveyId: [],
                });
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
      ),
    },
  ];

  useEffect(() => {
    if (checkedCount.length > 0 || checkedFolderCount.length > 0) {
      setIdCount([...checkedCount, ...checkedFolderCount]);
    } else {
      setIdCount([]);
    }
  }, [checkedCount, checkedFolderCount]);

  console.log('props.getSuerveyData', props.getSuerveyData);
  return (
    <>
      {(props.getFolderList && props.getFolderList.fetching) ||
      props.getAllSurveyFetching ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      ) : (
        <TableComponent
          cols={tableConstants(handleChange)}
          checkedCount={idCount}
          setCheckedFolderCount={setCheckedFolderCount}
          checkedFolderCount={checkedFolderCount}
          setCheckedCount={setCheckedCount}
          data={
            // eslint-disable-next-line no-nested-ternary
            props.getSuerveyData.length > 0 ? props.getSuerveyData : []
          }
          hasHoverMenu
          tableClassName="survey"
          striped
          headerActions={headerActions}
          totalCount={
            props.getSuerveyFolderData && props.getSuerveyFolderData.length
          }
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

SurveyFolderListTable.propTypes = {
  setModalState: PropTypes.func,
  setModalMove: PropTypes.bool,
  getSuerveyFolderData: PropTypes.object,
  setDeleteModal: PropTypes.bool,
  handleSurveyDelete: PropTypes.func,
  getAllSurveyFetching: PropTypes.bool,
  copySurvey: PropTypes.object,
  requestCopySurvey: PropTypes.func,
  requestSurveyArchived: PropTypes.func,
  surveyArchivedData: PropTypes.object,
  setCheckedCount: PropTypes.func,
  checkedCount: PropTypes.array,
  getFolderList: PropTypes.object,
  setCheckedFolderCount: PropTypes.func,
  checkedFolderCount: PropTypes.array,
  requestFolderList: PropTypes.func,
  getSuerveyData: PropTypes.object,
  surveyType: PropTypes.string,
};
export default SurveyFolderListTable;
