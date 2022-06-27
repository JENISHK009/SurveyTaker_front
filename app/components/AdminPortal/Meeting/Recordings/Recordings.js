import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Cloudrecordings from './Cloudrecordings';
import LocalRecordings from './LocalRecordings';

const MENU_LIST = [
  {
    title: 'Cloud Recordings',
    component: <Cloudrecordings />,
  },
  {
    title: 'Local Recordings',
    component: <LocalRecordings />,
  },
];
const Recordings = () => (
  <>
    <Tabs defaultActiveKey={MENU_LIST[0].title} className="lined-tabs">
      {MENU_LIST.map(menu => (
        <Tab eventKey={menu.title} title={menu.title} key={menu.title}>
          {menu.component}
        </Tab>
      ))}
    </Tabs>
  </>
);

export default Recordings;
