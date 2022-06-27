/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import SearchBar from '../../../common/searchBar';
// import trashIcon from '../../../assets/images/trash-default.svg';
import DeleteModal from '../../../common/DeleteModal';
import TableComponent from '../../../common/TableComponent';

const Participants = ({ requestSurveyParticipant, fetchSurveyParticipant }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [search, setSearch] = useState(false);
  const [partcipantData, setparticipantsData] = useState([]);
  const [totalCount, setTotalCount] = useState('');
  const { id } = useParams();

  useEffect(() => {
    requestSurveyParticipant({ surveyId: id });
  }, []);

  const tableConstants = () => [
    {
      title: (
        <Form.Check className="checkbox">
          <Form.Check.Input
            id="checkbox2"
            className="checkbox-input"
            // onChange={setAllRowsChecked}
          />
          <Form.Check.Label htmlFor="checkbox2" className="checkbox-label" />
        </Form.Check>
      ),
      render: rowData => (
        <Form.Check className="checkbox">
          <Form.Check.Input
            id={`checkbox-${rowData.id}`}
            className="checkbox-input"
            // onChange={e => handleChange(e, rowData.id)}
            // checked={checkedCount.includes(rowData.id)}
          />
          <Form.Check.Label htmlFor="checkbox2" className="checkbox-label" />
        </Form.Check>
      ),
    },
    {
      title: 'Id',
      render: rowData => <span aria-hidden="true">{rowData.userId}</span>,
    },
    {
      title: 'Please Provide Us Your Email Address:',
      render: rowData => <span aria-hidden="true">{rowData.email}</span>,
    },
    {
      title: 'Date Submitted',
      render: rowData => (
        <span aria-hidden="true">
          {`${moment(rowData.createdAt).format('L')}${', '}${moment(
            rowData.createdAt,
          ).format('LT')}`}
        </span>
      ),
    },
    {
      title: 'Status',
      render: () => (
        <Button
          variant="blue-10"
          size="sm"
          className="text-blue fw-normal fs-6 pe-none"
        >
          New
        </Button>
      ),
    },
    // {
    //   title: '',
    //   render: () => (
    //     <span>
    //       <Image src={trashIcon} />
    //     </span>
    //   ),
    // },
  ];

  useEffect(() => {
    if (!search) {
      setparticipantsData(
        fetchSurveyParticipant && fetchSurveyParticipant.getParticipant,
      );

      setTotalCount(
        fetchSurveyParticipant &&
          fetchSurveyParticipant.getParticipant &&
          fetchSurveyParticipant.getParticipant.length,
      );
    }
  }, [fetchSurveyParticipant]);

  const onSearch = event => {
    let newList = [];
    if (event.target.value !== '') {
      setSearch(true);
      newList =
        fetchSurveyParticipant &&
        fetchSurveyParticipant.getParticipant &&
        fetchSurveyParticipant.getParticipant.length > 0 &&
        fetchSurveyParticipant.getParticipant.filter(({ email }) => {
          const first = (email && email.toLowerCase()) || '';
          const filter = event.target.value.toLowerCase().trim();
          return first.includes(filter);
        });
      setparticipantsData(newList);
    } else {
      setSearch(false);
      setparticipantsData(
        fetchSurveyParticipant && fetchSurveyParticipant.getParticipant,
      );
    }
  };

  return (
    <>
      <div className="wrapper__header mb-1">
        <div className="wrapper__heading d-flex">
          Individual Responses&nbsp;
          <span className="text-gray-middle">
            {' '}
            {totalCount !== undefined && `(${totalCount})`}
          </span>
        </div>
        <div className="wrapper__heading-right">
          <SearchBar
            placeHolder="Search For Responses"
            handleSearch={onSearch}
          />
        </div>
      </div>
      {fetchSurveyParticipant && fetchSurveyParticipant.fetching ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      ) : (
        <TableComponent
          cols={tableConstants()}
          // checkedCount={checkedCount}
          // setCheckedCount={setCheckedCount}
          data={
            partcipantData && partcipantData.length > 0 ? partcipantData : []
          }
          // hasHoverMenu
          // tableClassName="Participant"
          striped
          // headerActions={headerActions}
        />
      )}

      <DeleteModal
        title="Are you sure?"
        isActive={deleteModal}
        handleClose={() => setDeleteModal(false)}
        buttonBottomTitle="Cancel"
        buttonTitle="Delete"
        handleDelete={() => setDeleteModal(false)}
      >
        <p className="text-bismark mb-1">
          This Item Will be Deleted immidiately.{' '}
        </p>
        <p className="text-bismark mb-0">You {"can't"} undo this action</p>
      </DeleteModal>
    </>
  );
};

Participants.propTypes = {
  requestSurveyParticipant: PropTypes.func,
  fetchSurveyParticipant: PropTypes.object,
};

export default Participants;
