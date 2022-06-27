import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import classNames from 'classnames';
import arrowIcon from '../../../assets/images/arrow-btn.svg';
import Moderator from './Moderator';
import Layouts from './Layouts';
import Templates from './Templates';

export const Sidebar = () => {
  const [openNavbar, setOpenNavbar] = useState(true);
  useEffect(() => {
    const screenHeader = document.querySelector('.dashboard');
    const hostSidebar = document.querySelector('.host-presenter-sidebar');
    const isChatExpanded = hostSidebar.classList.contains('chat-expanded');

    if (openNavbar) {
      screenHeader.classList.remove('expand-to-left');
      if (!screenHeader.classList.contains('expand-to-right')) {
        screenHeader.style.right = isChatExpanded ? '580px' : '290px';
      } else {
        screenHeader.style.right = isChatExpanded ? '310px' : '20px';
      }
      screenHeader.style.animation = 'dashboard-left-width 1s forwards';
    } else {
      screenHeader.classList.add('expand-to-left');
      if (!screenHeader.classList.contains('expand-to-right')) {
        screenHeader.style.right = isChatExpanded ? '580px' : '290px';
      } else {
        screenHeader.style.right = isChatExpanded ? '310px' : '20px';
      }
      screenHeader.style.animation = 'dashboard-left-0 1s forwards';
    }
  }, [openNavbar]);
  return (
    <div
      className={classNames(
        { show: openNavbar, hide: openNavbar === false },
        'host-sidebar',
      )}
    >
      <Button
        variant="outline-secondary "
        onClick={() => setOpenNavbar(!openNavbar)}
        className="p-0 toggle-btn"
      >
        <Image src={arrowIcon} />
      </Button>

      <Moderator />
      <Layouts />
      <Templates />
    </div>
  );
};

export default Sidebar;
