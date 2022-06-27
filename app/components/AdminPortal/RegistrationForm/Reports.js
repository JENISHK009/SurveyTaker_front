import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import SearchBar from '../../../common/searchBar';
import CustomModal from '../../../common/customModal';
import TableComponent from '../../../common/TableComponent';
import ButtonWithHoverEffect from '../../../common/ButtonWithHoverEffect';

const REPORT_LIST = [
  {
    id: 1,
    name: '2020 WorkBeyond Summit Voice Session',
    type: 'Standart',
    date_created: '09/03/2021,  10 AM',
  },
  {
    id: 2,
    name: '2020 WorkBeyond Summit Voice Session',
    type: 'Standart',
    date_created: '09/03/2021,  10 AM',
  },
  {
    id: 3,
    name: '2020 WorkBeyond Summit Voice Session',
    type: 'Standart',
    date_created: '09/03/2021,  10 AM',
  },
  {
    id: 4,
    name: '2020 WorkBeyond Summit Voice Session',
    type: 'Standart',
    date_created: '09/03/2021,  10 AM',
  },
  {
    id: 5,
    name: '2020 WorkBeyond Summit Voice Session',
    type: 'Standart',
    date_created: '09/03/2021,  10 AM',
  },
  {
    id: 6,
    name: '2020 WorkBeyond Summit Voice Session',
    type: 'Standart',
    date_created: '09/03/2021,  10 AM',
  },
  {
    id: 7,
    name: '2020 WorkBeyond Summit Voice Session',
    type: 'Standart',
    date_created: '09/03/2021,  10 AM',
  },
  {
    id: 8,
    name: '2020 WorkBeyond Summit Voice Session',
    type: 'Standart',
    date_created: '09/03/2021,  10 AM',
  },
];

const Reports = () => {
  const [copy, setCopy] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  const tableConstants = () => [
    {
      title: 'Name',
      render: rowData => <span aria-hidden="true">{rowData.name}</span>,
    },
    {
      title: 'Type',
      render: rowData => <span aria-hidden="true">{rowData.type}</span>,
    },
    {
      title: 'Date Created',
      render: rowData => (
        <span aria-hidden="true">
          {`${moment(rowData.createdAt).format('L')}${', '}${moment(
            rowData.createdAt,
          ).format('LT')}`}
        </span>
      ),
    },
    {
      title: '',
      render: () => (
        <ul className="d-flex mb-0">
          <ButtonWithHoverEffect
            defaultImage={copyIcon}
            hoverImage={copyBlueIcon}
            imageWidth={24}
            btnClassNames="p-0 me-4"
            onClick={() => setCopy(true)}
          />
          <ButtonWithHoverEffect
            defaultImage={trashIcon}
            hoverImage={trashBlueIcon}
            imageWidth={24}
            btnClassNames="p-0"
            onClick={() => setDeleteModal(true)}
          />
        </ul>
      ),
    },
  ];

  // const handleSearch = event => {
  //   let newList = [];
  //   if (event.target.value !== '') {
  //     newList =
  //       REPORT_LIST &&
  //       REPORT_LIST.length > 0 &&
  //       REPORT_LIST.filter(({ name }) => {
  //         const first = (name && name.toLowerCase()) || '';
  //         const filter = event.target.value.toLowerCase().trim();
  //         return first.includes(filter);
  //       });
  //     setparticipantsData(newList);
  //   } else {
  //     setSearch(false);
  //     setparticipantsData(
  //       fetchSurveyParticipant && fetchSurveyParticipant.getParticipant,
  //     );
  //   }
  // };
  return (
    <>
      <div className="wrapper__header mb-1">
        <div className="wrapper__heading d-flex">
          Reports&nbsp;
          <span className="text-gray-middle">
            {' '}
            {REPORT_LIST && REPORT_LIST.length > 0 && `(${REPORT_LIST.length})`}
          </span>
        </div>
        <div className="wrapper__heading-right">
          <SearchBar
            placeHolder="Search For Reports"
            // handleSearch={handleSearch}
          />
          <Link to="/surveys/reports/test">
            <Button variant="blue" className="ms-3">
              Create Report
            </Button>
          </Link>
        </div>
      </div>
      <TableComponent
        cols={tableConstants()}
        data={REPORT_LIST && REPORT_LIST.length > 0 ? REPORT_LIST : []}
        striped
      />
      <CustomModal
        title="Copy Report"
        isActive={copy}
        buttonTitle="Copy"
        handleClose={() => setCopy(false)}
        buttonBottomTitle="Cancel"
        handleCloseIcon={() => setCopy(false)}
      >
        <p className="text-bismark mb-1">This will create replicate Report. </p>
      </CustomModal>
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

export default Reports;
