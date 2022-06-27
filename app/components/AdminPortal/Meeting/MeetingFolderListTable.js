/* eslint-disable indent */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form, Image, Spinner, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import moreHZIcon from '../../../assets/images/more-horizontal.svg';
import moveIcon from '../../../assets/images/move.svg';
// import exportIcon from '../../../assets/images/export.svg';
import trashIcon from '../../../assets/images/trash.svg';
import TableComponent from '../../../common/TableComponent';
import file from '../../../assets/images/document.svg';
import folder from '../../../assets/images/folder.svg';

// eslint-disable-next-line no-unused-vars
const Actions = ({ setModalState, setModalMove, setDeleteModal }) => (
  <Dropdown align="end">
    <Dropdown.Toggle className="p-0">
      <Image src={moreHZIcon} />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {/* <Dropdown.Item onClick={() => setModalMove(true)}>
        <Image className="me-2" src={moveIcon} /> Move
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setModalState(true)}>
        <Image className="me-2" src={exportIcon} /> Export
      </Dropdown.Item>
      <Dropdown.Divider /> */}
      <Dropdown.Item className="text-red" onClick={() => setDeleteModal(true)}>
        <Image className="me-2" src={trashIcon} /> Delete
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const MeetingFolderListTable = ({
  setDeleteModal,
  checkedCount,
  setCheckedCount,
  folderMeetingData,
  fetching,
  setModalMove,
  setMeetingId,
  checkedFolderCount,
  setCheckedFolderCount,
  ...props
}) => {
  const history = useHistory();
  const [idCount, setIdCount] = useState([]);

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

  const setAllRowsChecked = e => {
    if (folderMeetingData && folderMeetingData.length > 0) {
      const meetingData = [];
      const folderMeetingId = [];
      if (e.target.checked) {
        // eslint-disable-next-line array-callback-return
        folderMeetingData.map(list => {
          if (list.type === 'folder') {
            folderMeetingId.push(list.id);
          } else {
            meetingData.push(list.id);
          }
        });
        setCheckedCount(meetingData);
        setCheckedFolderCount(folderMeetingId);
      } else {
        setCheckedCount([]);
        setCheckedFolderCount([]);
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
          </Button> */}
        <Button
          variant="blue"
          className="me-0"
          onClick={() => {
            setDeleteModal(true);
            props.setRemoveId({
              meetingId: checkedCount,
              folderId: checkedFolderCount,
            });
          }}
        >
          <Image src={trashIcon} className="me-2" />
          Delete
        </Button>
      </div>
    </th>
  );

  const handleRedirectMeetings = meetData => {
    if (meetData && meetData.type === 'folder') {
      history.push(`/meetings/list/${meetData.id}`, meetData.id);
    } else {
      history.push({
        pathname: `/meetings/tab/${meetData.id}`,
        state: { meetData },
      });
    }
  };

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
            onChange={e => handleChange(e, rowData.id, rowData.type)}
            checked={[...checkedCount, ...checkedFolderCount].includes(
              rowData.id,
            )}
          />
          <Form.Check.Label htmlFor="checkbox2" className="checkbox-label" />
        </Form.Check>
      ),
    },
    {
      title: 'Name',
      render: rowData => (
        // <Link to={}>
        <span
          onClick={() => handleRedirectMeetings(rowData)}
          aria-hidden="true"
        >
          <Image
            src={rowData.type === 'folder' ? folder : file}
            className="me-2"
          />
          {rowData.type === 'folder' ? rowData.folderName : rowData.name}
        </span>
        // </Link>
      ),
    },
    {
      title: 'Start Time',
      render: rowData => (
        <span>
          {rowData.type === 'meeting'
            ? `${moment(rowData.start_date_time).format('L')}${', '}${moment(
                rowData.start_date_time,
              ).format('LT')}`
            : ''}
        </span>
      ),
    },
    {
      title: 'Duration',
      render: rowData => (
        <span>
          {rowData.durationHours} {rowData.durationMinute}
        </span>
      ),
    },
    {
      title: '',
      render: rowData => (
        <Dropdown align="end">
          <Dropdown.Toggle className="p-0">
            <Image src={moreHZIcon} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {rowData.type !== 'folder' && (
              <>
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
              </>
            )}

            <Dropdown.Item
              className="text-red"
              onClick={() => {
                setDeleteModal(true);
                props.setRemoveId(
                  rowData.type === 'folder'
                    ? { folderId: [rowData.id], meetingId: [] }
                    : { meetingId: [rowData.id], folderId: [] },
                );
              }}
            >
              <Image className="me-2" src={trashIcon} /> Delete
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

  return (
    <>
      {fetching ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      ) : (
        <TableComponent
          cols={tableConstants(handleChange)}
          data={
            folderMeetingData && folderMeetingData.length > 0
              ? folderMeetingData
              : []
          }
          striped
          checkedCount={idCount}
          setCheckedCount={setCheckedCount}
          headerActions={headerActions}
          totalCount={folderMeetingData && folderMeetingData.length}
          setCheckedFolderCount={setCheckedFolderCount}
          checkedFolderCount={checkedFolderCount}
        />
      )}
    </>
  );
};

MeetingFolderListTable.propTypes = {
  setModalState: PropTypes.func.isRequired,
  setModalMove: PropTypes.bool,
  setDeleteModal: PropTypes.func,
  meetingsList: PropTypes.object,
  fetching: PropTypes.bool,
  setRemoveId: PropTypes.string,
  setCheckedCount: PropTypes.func,
  checkedCount: PropTypes.array,
  setMeetingId: PropTypes.string,
  folderMeetingData: PropTypes.object,
  setCheckedFolderCount: PropTypes.func,
  checkedFolderCount: PropTypes.array,
};
Actions.propTypes = {
  setModalMove: PropTypes.bool,
  setDeleteModal: PropTypes.func,
  setModalState: PropTypes.func.isRequired,
};

export default MeetingFolderListTable;
