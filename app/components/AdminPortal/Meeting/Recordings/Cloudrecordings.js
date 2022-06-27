import React, { useState } from 'react';
import { Table, Form, Image, Button } from 'react-bootstrap';
import Delete from '../../../../assets/images/trash.png';
import Download from '../../../../assets/images/download.png';
import Share from '../../../../assets/images/share.png';
import ShareModal from '../../../../common/ShareModal';

const CLOUDRECORDING_LIST = [
  {
    id: 1,
    Preview: 'Template 123',
    name: 'Demo Review Meeting',
    start_time: '09 / 03 / 2021,  10 AM',
    File_Size: '250 MB',
    // duration: '02:00',
  },
  {
    id: 1,
    Preview: 'Template 123',
    name: 'Demo Review Meeting',
    start_time: '09 / 03 / 2021,  10 AM',
    File_Size: '250 MB',
  },
  {
    id: 1,
    Preview: 'Template 123',
    name: 'Demo Review Meeting',
    start_time: '09 / 03 / 2021,  10 AM',
    File_Size: '250 MB',
  },
];
const Cloudrecordings = () => {
  const [shareModal, setShareModal] = useState(false);
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th width="24px">
              <Form.Check className="checkbox">
                <Form.Check.Input id="checkbox" className="checkbox-input" />
                <Form.Check.Label
                  htmlFor="checkbox"
                  className="checkbox-label"
                />
              </Form.Check>
            </th>
            {Object.keys(CLOUDRECORDING_LIST[0]).map(meeting => (
              <>
                {meeting !== 'id' && (
                  <th key={meeting} className="text-capitalize">
                    {meeting.replace('_', ' ')}
                  </th>
                )}
              </>
            ))}
            <th />
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {CLOUDRECORDING_LIST.map(meeting => (
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

              <td
                //   onClick={() => handleMeetingListRedirect('folder')}
                aria-hidden="true"
              >
                {/* <Image className="me-3" src={documentIcon} /> */}
                <video width="50" height="30" controls>
                  <track default kind="captions" srcLang="en" src="" />
                </video>
              </td>
              <td>{meeting.name}</td>
              <td>{meeting.start_time}</td>
              <td>{meeting.File_Size}</td>

              <td>
                <Button className="p-0 border-0">
                  <Image
                    src={Share}
                    alt="share"
                    onClick={() => setShareModal(true)}
                  />
                </Button>
              </td>
              <td>
                <Button className="p-0 border-0">
                  <Image src={Download} alt="download" />
                </Button>
              </td>
              <td>
                <Button className="p-0 border-0">
                  <Image src={Delete} alt="delete" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {shareModal && (
        <ShareModal
          handleClose={() => setShareModal(false)}
          handleClick={() => setShareModal(false)}
        />
      )}
    </div>
  );
};
export default Cloudrecordings;
