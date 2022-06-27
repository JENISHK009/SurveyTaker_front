import React, { useEffect, useState } from 'react';
import { Dropdown, Image, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import logo from '../../../assets/images/EAB_logo.svg';
import downArrow from '../../../assets/images/down-arrow.svg';
import microIcon from '../../../assets/images/micro.svg';
import microMuteIcon from '../../../assets/images/micro-mute.svg';
import cameraIcon from '../../../assets/images/camera-white.svg';
import cameraDisableIcon from '../../../assets/images/camera-disable.svg';
import shareScreenIcon from '../../../assets/images/share-screen.svg';
import shareScreenActiveIcon from '../../../assets/images/share-screen-active.svg';
import chatIcon from '../../../assets/images/chat.svg';
import chatDisableIcon from '../../../assets/images/chat-disable.svg';
import screenRecordingIcon from '../../../assets/images/screen-recording.svg';
import screenRecordingActiveIcon from '../../../assets/images/screen-recording-active.svg';
import VoiceSessionDropdown from './VoiceSessionDropdown';
import CustomToast from '../../../common/customToast';
import { setHostUI } from '../../../store/actions/host-ui';
import injectReducer from '../../../utils/injectReducer';
import reducer, { getHostUI } from '../../../store/reducers/host-ui';
import useLocalStorage from '../../../hooks/useLocalStorage';

const DROPDOWN_ITEMS = [
  {
    title: 'Mic',
    icon: microIcon,
    icon2: microMuteIcon,
    options: ['Option 1'],
  },
  {
    title: 'Camera',
    icon: cameraDisableIcon,
    icon2: cameraIcon,
    options: ['Option 1'],
  },
  {
    title: 'Share Screen',
    icon: shareScreenIcon,
    icon2: shareScreenActiveIcon,
    options: ['Option 1'],
  },
  {
    title: 'Chat',
    icon: chatDisableIcon,
    icon2: chatIcon,
    options: ['Option 1'],
  },
  {
    title: 'Recording',
    icon: screenRecordingIcon,
    icon2: screenRecordingActiveIcon,
    options: ['Record on this Computer', 'Record to the Cloud'],
  },
];

const Header = () => (
  <header>
    <Navbar bg="gray-dark" className="custom-navbar" fixed="top">
      <div className="d-flex align-items-center">
        <Navbar.Brand className="py-0 me-4">
          <Link to="/">
            <Image src={logo} width={40} height={40} />
          </Link>
        </Navbar.Brand>
        <VoiceSessionDropdown />
      </div>

      <div className="custom-navbar__middle">
        {DROPDOWN_ITEMS.map(obj => (
          <DropdownCardB key={obj.title} obj={obj} />
        ))}
      </div>
      <div>
        <Dropdown align="end">
          <div className="custom-navbar__dropdown">
            <div className="custom-navbar__title">
              <div className="fw-bold text-truncate text-white">Alexander</div>
              <div className="text-gray-middle custom-navbar__title-sub">
                Host
              </div>
            </div>
            <Dropdown.Toggle variant="link">
              <Image
                className="custom-navbar__arrow invert-white"
                src={downArrow}
                width={24}
                height={24}
                alt="Arrow"
              />
            </Dropdown.Toggle>
          </div>
          <Dropdown.Menu>
            <Dropdown.Item>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  </header>
);

const DropdownCard = ({ obj, ...props }) => {
  const [selected, setSelected] = useState(false);
  const [chat, setChat] = useLocalStorage('chat_expand', false);

  // useEffect(() => {
  //   if (obj.title !== 'Chat') {
  //     return;
  //   }
  //   if (selected) {
  //     setChat(true);
  //     // props.setHostUI({ chat_expand: true });
  //   } else {
  //     setChat(false);
  //     // props.setHostUI({ chat_expand: false });
  //   }
  // }, [obj, selected]);

  useEffect(() => {
    if (obj.title !== 'Chat') {
      return;
    }
    if (chat) {
      props.setHostUI({ ...props.host_ui, chat_expand: true });
      setSelected(true);
    } else {
      props.setHostUI({ ...props.host_ui, chat_expand: false });
      setSelected(false);
    }
  }, [chat]);

  const handleToggle = isSelected => {
    setSelected(!isSelected);
    if (obj.title !== 'Chat') {
      return;
    }
    if (!isSelected) {
      setChat(true);
      // props.setHostUI({ chat_expand: true });
    } else {
      setChat(false);
      // props.setHostUI({ chat_expand: false });
    }
  };
  return (
    <>
      <Dropdown key={obj.title}>
        <div className="custom-navbar__dropdown">
          <div
            className={classNames(
              {
                active: selected && obj.title === 'Share Screen',
              },
              'custom-navbar__title cursor-pointer',
            )}
          >
            <Image
              src={
                (props.host_ui.chat_expand &&
                  obj.title === 'Chat' &&
                  obj.icon2) ||
                (selected ? obj.icon2 : obj.icon)
              }
              alt={obj.title}
              onClick={() => handleToggle(selected)}
            />
          </div>
          <Dropdown.Toggle variant="link">
            <Image
              className="custom-navbar__arrow invert-white"
              src={downArrow}
              width={16}
              height={16}
              alt="Arrow"
            />
          </Dropdown.Toggle>
        </div>
        <Dropdown.Menu>
          {obj.options.map(option => (
            <Dropdown.Item>{option}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {obj.title === 'Recording' && selected && <CustomToast />}
    </>
  );
};

const withReducer = injectReducer({ key: 'hostUI', reducer });

DropdownCard.propTypes = {
  obj: PropTypes.object.isRequired,
  setHostUI: PropTypes.func.isRequired,
  host_ui: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { hostUI } = state;
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

const DropdownCardB = compose(
  withReducer,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DropdownCard);

export default Header;
