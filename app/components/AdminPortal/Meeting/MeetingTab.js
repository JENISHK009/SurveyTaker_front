import React, { useState } from 'react';
import { Tab } from 'react-bootstrap';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import Participant from './Participant';

import Email from './email';

import MeetingInfo from './MeetingInfo';
import CustomBreadcrumbs from '../../../common/customBreadcrumbs';
// import Recordings from './Recordings/Recordings';

const MeetingTab = props => {
  const history = useHistory();
  const meetingDetail =
    props.location && props.location.state && props.location.state.meetData;
  if (!meetingDetail) {
    history.push('/meetings');
  }
  const MENU_LIST = [
    {
      title: 'Meeting Information',
      component: <MeetingInfo meetingDetail={meetingDetail} />,
    },
    {
      title: 'Users',
      component: <Participant meetingDetail={meetingDetail} />,
    },
    {
      title: 'Emails',
      component: <Email meetingDetail={meetingDetail} />,
    },
    // {
    //   title: 'Recordings',
    //   component: <Recordings />,
    // },
    {
      title: 'Reports',
      component: <Reports meetingDetail={meetingDetail} />,
    },
  ];
  const [key, setKey] = useState(MENU_LIST[0].title);

  const breadCrumb = [
    { title: 'Meetings', url: '/meetings' },
    { title: meetingDetail && meetingDetail.name, url: '' },
  ];

  const breadCrumbFolder = [
    { title: 'Meetings', url: '/meetings' },
    {
      title: meetingDetail && meetingDetail.folderName,
      url: `/meetings/list/${meetingDetail && meetingDetail.folderId}`,
    },
    { title: meetingDetail && meetingDetail.name, url: '' },
  ];

  return (
    <>
      <CustomBreadcrumbs
        breadCrumb={
          meetingDetail && meetingDetail.type === 'meeting'
            ? breadCrumb
            : breadCrumbFolder
        }
      />

      <Tab.Container id="left-tabs-example" activeKey={key}>
        <ul variant="pills" className="meeting-tabs  nav nav-pills">
          {MENU_LIST &&
            MENU_LIST.length > 0 &&
            MENU_LIST.map(menu => (
              <li className="nav-item">
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
          {MENU_LIST &&
            MENU_LIST.length > 0 &&
            MENU_LIST.map(menu => (
              <>
                {key === menu.title && (
                  <Tab.Pane eventKey={menu.title}>{menu.component}</Tab.Pane>
                )}
              </>
            ))}
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

MeetingTab.propTypes = {
  location: PropTypes.object,
};

export default MeetingTab;
