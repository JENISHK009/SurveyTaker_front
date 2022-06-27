import React, { useState, useEffect } from 'react';
import { Button, Image } from 'react-bootstrap';
import classNames from 'classnames';
import sharingIcon from '../../../assets/images/sharing-illustration.svg';
import activeSharingIcon from '../../../assets/images/sharing-illustration-blue.svg';
import PODIcon from '../../../assets/images/POD-illustration.svg';
import activePODIcon from '../../../assets/images/POD-illustration-blue.svg';
import tickIcon from '../../../assets/images/tick.svg';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer, { getHostUI } from '../../../store/reducers/host-ui';
import injectReducer from '../../../utils/injectReducer';
import { setHostUI } from '../../../store/actions/host-ui';


const LAYOUTS = [
  {
    type: 'Sharing',
    icon: sharingIcon,
    icon2: activeSharingIcon,
  },
  {
    type: 'POD',
    icon: PODIcon,
    icon2: activePODIcon,
  },
];
const Layouts = (props) => {
  const [layoutType, setLayoutType] = useState('POD');

  useEffect(() => {
    props.setHostUI({
      ...props.host_ui,
      layout_view: layoutType,
    });
  }, [layoutType]);

  return (
    <>
      <div className="host-sidebar__heading">LayoutsCX</div>

      <div className="host-sidebar-pad layouts-btn ticks-btn">
        {LAYOUTS.map(layout => (
          <div className="layout__card">
            <Button
              onClick={() => setLayoutType(layout.type)}
              onFocus={() => setLayoutType(layout.type)}
              className={classNames(
                { active: layout.type === layoutType },
                'm-0',
              )}
            >
              <Image
                className="w-100 layout__illustration"
                src={layoutType === layout.type ? layout.icon2 : layout.icon}
                alt="Sharing"
              />

              {layout.type === layoutType && (
                <Image src={tickIcon} alt="tick" className="tick-icon" />
              )}
            </Button>
            <div className="layout__text">{layout.type}</div>
          </div>
        ))}
      </div>
    </>
  );
};


const withReducer = injectReducer({ key: 'hostUI', reducer });

const mapStateToProps = state => {
  const { hostUI } = state;
  console.log('hostUI', hostUI);
  return {
    host_ui: getHostUI(hostUI),
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    setHostUI: payload => dispatch(setHostUI(payload)),
    dispatch,
  };
}

export default compose(
  withReducer,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Layouts);
