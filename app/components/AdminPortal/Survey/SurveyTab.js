import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Tab } from 'react-bootstrap';

const SurveyTab = ({ setSurveyType }) => {
  const MENU_LIST = [
    {
      title: 'All Surveys',
      component: '',
    },
    {
      title: 'Recent',
      component: '',
    },
    {
      title: 'Trash',
      component: '',
    },
    {
      title: 'Archived',
      component: '',
    },
  ];

  const [key, setKey] = useState(MENU_LIST[0].title);
  return (
    <>
      <Tab.Container id="left-tabs-example" activeKey={key}>
        <ul variant="pills" className="meeting-tabs  nav nav-pills">
          {MENU_LIST.map(menu => (
            <li className="nav-item">
              <button
                onClick={() => {
                  setKey(menu.title);
                  setSurveyType(menu.title);
                }}
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
        {/* <Tab.Content>
          {MENU_LIST.map(menu => (
            <>
              {key === menu.title && (
                <Tab.Pane eventKey={menu.title}>{menu.component}</Tab.Pane>
              )}
            </>
          ))}
        </Tab.Content> */}
      </Tab.Container>
    </>
  );
};

SurveyTab.propTypes = {
  setSurveyType: PropTypes.func,
};
export default SurveyTab;
