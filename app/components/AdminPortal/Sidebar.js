import React, { useEffect, useState } from 'react';
import { Button, Image, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import surveyIcon from '../../assets/images/survey.svg';
import surveyBlueIcon from '../../assets/images/survey-blue.svg';
import hamburgerIcon from '../../assets/images/hamburger.png';
import closeIcon from '../../assets/images/close.png';

const MENU_LIST = [
  {
    title: 'Surveys',
    icon: surveyIcon,
    iconOnHOver: surveyBlueIcon,
    url: '/surveys',
  },
];
export const Sidebar = () => {
  const { pathname } = useLocation();

  const [hoverIndex, setHoverIndex] = useState();
  const [activeMenu, setActiveMenu] = useState(null);
  const [openNavbar, setOpenNavbar] = useState(null);

  useEffect(() => {
    const activeMenuItem = MENU_LIST.filter(
      menu => pathname.indexOf(menu.url) > -1,
    );
    setHoverIndex(activeMenuItem && activeMenuItem[0] && activeMenuItem[0].url);
    setActiveMenu(activeMenuItem && activeMenuItem[0] && activeMenuItem[0].url);
  }, [pathname]);

  return (
    <div
      className={classNames(
        { show: openNavbar, hide: openNavbar === false },
        'admin-sidebar',
      )}
    >
      <Button
        variant="outline-secondary d-lg-none"
        onClick={() => setOpenNavbar(!openNavbar)}
        className="p-0"
      >
        <Image src={openNavbar ? closeIcon : hamburgerIcon} />
      </Button>
      <Nav variant="pills" activeKey={activeMenu} className="flex-column">
        {MENU_LIST &&
          MENU_LIST.length > 0 &&
          MENU_LIST.map(menu => (
            <Nav.Item key={menu.title}>
              <Nav.Link
                as={Link}
                to={menu.url}
                eventKey={menu.url}
                onMouseOver={() => setHoverIndex(menu.url)}
                onMouseOut={() => setHoverIndex(null)}
                onBlur={() => setHoverIndex(null)}
                onFocus={() => setHoverIndex(menu.url)}
              >
                <Image
                  src={
                    pathname.indexOf(menu.url) > -1 || menu.url === hoverIndex
                      ? menu.iconOnHOver
                      : menu.icon
                  }
                  className="admin-sidebar-nav__icon"
                />
                <div>{menu.title}</div>
              </Nav.Link>
            </Nav.Item>
          ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
