import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import reducer, { getHostUI } from '../../../store/reducers/host-ui';
import injectReducer from '../../../utils/injectReducer';
import Attendees from './Attendees';
import Waitlist from './Waitlist';
import ShareVideo from './ShareVideo';

const MENU_LIST = [
  {
    title: 'Attendees (100)',
    component: <Attendees />,
  },
  {
    title: 'Waitlist (5)',
    component: <Waitlist />,
  },
];

export const HostAndPresenter = props => (
  <>
    <div className="host-presenter-area">
      {props.host_ui.scale_view && <ShareVideo />}

      <Tabs
        defaultActiveKey={MENU_LIST[1].title}
        className="lined-tabs host-presenter-sidebar-tabs"
      >
        {MENU_LIST.map(menu => (
          <Tab eventKey={menu.title} title={menu.title} key={menu.title}>
            {menu.component}
          </Tab>
        ))}
      </Tabs>
    </div>
  </>
);

HostAndPresenter.propTypes = {
  host_ui: PropTypes.object.isRequired,
};

const withReducer = injectReducer({ key: 'hostUI', reducer });

const mapStateToProps = state => {
  const { hostUI } = state;
  return {
    host_ui: getHostUI(hostUI),
  };
};

export default compose(
  withReducer,
  connect(
    mapStateToProps,
    null,
  ),
)(HostAndPresenter);
