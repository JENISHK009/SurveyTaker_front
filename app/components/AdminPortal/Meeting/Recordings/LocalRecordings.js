import React from 'react';
import { Table, Form } from 'react-bootstrap';
import Delete from '../../../../assets/images/trash.png';

const LOCALRECORDING_LIST = [
  {
    id: 1,

    name: 'Demo Review Meeting',
    Computer_Name: 'Olesia’s Macbook Pro',
    start_time: '09 / 03 / 2021,  10 AM',
    // File_Size: '250 MB',
    // duration: '02:00',
  },
  {
    id: 1,
    name: 'Demo Review Meeting',
    Computer_Name: 'Olesia’s Macbook Pro',
    start_time: '09 / 03 / 2021,  10 AM',
    // File_Size: '250 MB',
  },
  {
    id: 1,
    name: 'Demo Review Meeting',
    Computer_Name: 'Olesia’s Macbook Pro',
    start_time: '09 / 03 / 2021,  10 AM',
    // File_Size: '250 MB',
  },
];
const LocalRecordings = () => (
  <div>
    <Table>
      <thead>
        <tr>
          <th width="24px">
            <Form.Check className="checkbox">
              <Form.Check.Input id="checkbox" className="checkbox-input" />
              <Form.Check.Label htmlFor="checkbox" className="checkbox-label" />
            </Form.Check>
          </th>
          {Object.keys(LOCALRECORDING_LIST[0]).map(meeting => (
            <>
              {meeting !== 'id' && (
                <th key={meeting} className="text-capitalize">
                  {meeting.replace('_', ' ')}
                </th>
              )}
            </>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {LOCALRECORDING_LIST.map(meeting => (
          <tr key={meeting.id}>
            <td width="24px">
              <Form.Check className="checkbox">
                <Form.Check.Input
                  id={`checkbox-${meeting.id}`}
                  className="checkbox-input"
                />
                <Form.Check.Label
                  htmlFor={`checkbox-${meeting.id}`}
                  className="checkbox-label"
                />
              </Form.Check>
            </td>

            {/* <
              //   onClick={() => handleMeetingListRedirect('folder')}
              aria-hidden="true"
            >
              {/* <Image className="me-3" src={documentIcon} /> */}

            <td>{meeting.name}</td>
            <td>{meeting.Computer_Name}</td>
            <td>{meeting.start_time}</td>
            <td>
              <img src={Delete} alt="delete" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default LocalRecordings;
