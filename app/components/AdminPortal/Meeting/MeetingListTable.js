/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Form, Image, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import moreHZIcon from '../../../assets/images/more-horizontal.svg';
// import exportIcon from '../../../assets/images/export.svg';
import trashIcon from '../../../assets/images/trash.svg';
import TableComponent from '../../../common/TableComponent';
import file from '../../../assets/images/document.svg';
import moveIcon from '../../../assets/images/move.svg';

// eslint-disable-next-line no-unused-vars
const Actions = ({ setModalState, setModalMove, setDeleteModal }) => (
  <Dropdown align="end">
    <Dropdown.Toggle className="p-0">
      <Image src={moreHZIcon} />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => setModalMove(true)}>
        <Image className="me-2" src={moveIcon} /> Move
      </Dropdown.Item>
      {/* <Dropdown.Item onClick={() => setModalState(true)}>
        <Image className="me-2" src={exportIcon} /> Export
      </Dropdown.Item>
      <Dropdown.Divider /> */}
      <Dropdown.Item className="text-red" onClick={() => setDeleteModal(true)}>
        <Image className="me-2" src={trashIcon} /> Delete
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const MeetingListTable = ({
  setModalState,
  setDeleteModal,
  meetingsList,
  checkedCount,
  setCheckedCount,
  setModalMove,
  setMeetingId,
  ...props
}) => {
  const history = useHistory();

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
    if (meetingsList && meetingsList.length > 0) {
      if (e.target.checked) {
        const meetingIdsArray = meetingsList.map(list => list.id);
        setCheckedCount(meetingIdsArray);
      } else {
        setCheckedCount([]);
      }
    }
  };

  const headerActions = () => (
    <th colSpan={3} className="text-end bg-blue">
      <div className="d-flex justify-content-end">
        <Button
          variant="blue"
          onClick={() => {
            setModalMove(true);
            setMeetingId(checkedCount);
          }}
        >
          <Image className="me-2" src={moveIcon} />
          Move
        </Button>
        {/* <Button variant="blue">
          <Image className="me-2" src={exportIcon} />
          Export
        </Button>  */}
        <Button
          variant="blue"
          className="me-0"
          onClick={() => {
            setDeleteModal(true);
            props.setRemoveId({
              meetingId: checkedCount,
              folderId: [],
            });
          }}
        >
          <Image src={trashIcon} className="me-2" />
          Delete
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
      render: rowData => (
        <span
          onClick={() => handleRedirectMeetingInfo(rowData)}
          aria-hidden="true"
        >
          <Image src={file} className="me-2" />
          {rowData.name}
        </span>
      ),
    },
    {
      title: 'Start Time',
      render: rowData => (
        <span>
          {`${moment(rowData.start_date_time).format('L')}${', '}${moment(
            rowData.start_date_time,
          ).format('LT')}`}
        </span>
      ),
    },
    {
      title: 'Duration',
      render: rowData => <span>{rowData.duration}</span>,
    },
    {
      title: '',
      render: rowData => (
        <Dropdown align="end">
          <Dropdown.Toggle className="p-0">
            <Image src={moreHZIcon} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setModalMove(true);
                setMeetingId([rowData.id]);
              }}
            >
              <Image className="me-2" src={moveIcon} /> Move
            </Dropdown.Item>
            {/* <Dropdown.Item onClick={() => setModalState(true)}>
              <Image className="me-2" src={exportIcon} /> Export
            </Dropdown.Item> */}
            <Dropdown.Divider />
            <Dropdown.Item
              className="text-red"
              onClick={() => {
                setDeleteModal(true);
                props.setRemoveId({ meetingId: [rowData.id], folderId: [] });
              }}
            >
              <Image className="me-2" src={trashIcon} /> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const handleRedirectMeetingInfo = meetData => {
    history.replace({
      pathname: `/meetings/tab/${meetData.id}`,
      state: { meetData },
    });
  };

  return (
    <>
      {props.fetching ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      ) : (
        <TableComponent
          cols={tableConstants(handleChange)}
          data={meetingsList && meetingsList.length > 0 ? meetingsList : []}
          striped
          checkedCount={checkedCount}
          setCheckedCount={setCheckedCount}
          headerActions={headerActions}
          // isDark
          // bordered
          // hoverable
        />
      )}
    </>
  );
};

MeetingListTable.propTypes = {
  setModalState: PropTypes.func.isRequired,
  setDeleteModal: PropTypes.func,
  meetingsList: PropTypes.object,
  fetching: PropTypes.bool,
  setRemoveId: PropTypes.string,
  setCheckedCount: PropTypes.func,
  checkedCount: PropTypes.array,
  setModalMove: PropTypes.bool,
  setMeetingId: PropTypes.array,
};
Actions.propTypes = {
  setModalMove: PropTypes.bool,
  setDeleteModal: PropTypes.func,
  setModalState: PropTypes.func.isRequired,
};

export default MeetingListTable;
