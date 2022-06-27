import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Broadcast from './Broadcast';
import DashboardHeader from './DashboardHeader';
import RightSidebar from './RightSidebar';
import QuestionCard from './QuestionCard';
import addIcon from '../../../assets/images/blue/plus.svg';
import zoomInIcon from '../../../assets/images/zoom-in.svg';
import zoomOutIcon from '../../../assets/images/zoom-out.svg';
import maximizeIcon from '../../../assets/images/maximize.svg';
import Loading from '../../../common/loading';
import { useModalWithData } from '../../../hooks/useModalWithData';
import CustomModal from '../../../common/customModal';
import AddNoteModal from './AddNoteModal';
import { getHostUI } from '../../../store/reducers/host-ui';

const Dashboard = props => {
  const [isLoading, setIsLoading] = useState(true);
  const { modalOpen, setModalState } = useModalWithData();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  return (
    <>
      <Broadcast />
      <RightSidebar />
      <div className="dashboard">
        <DashboardHeader />

        <div
          className={classNames(
            { 'justify-content-center': isLoading },
            'dashboard-wrapper',
          )}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <QuestionCard />
              <div className="dashboard-footer">
                <Button
                  variant="white"
                  className="text-blue custom-shadow"
                  onClick={() => setModalState(true)}
                >
                  <Image src={addIcon} alt="Add" className="me-2" width={20} />{' '}
                  Add Note
                </Button>
                {props.host_ui.scale_view && (
                  <>
                    <Button variant="white" className="btn-icon ms-auto">
                      <Image src={maximizeIcon} alt="Add" width={24} />
                    </Button>
                    <Button variant="white" className="btn-icon ms-3">
                      <Image src={zoomOutIcon} alt="Add" width={24} />
                    </Button>
                    <Button variant="white" className="btn-icon ms-3">
                      <Image src={zoomInIcon} alt="Add" width={24} />
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <CustomModal
        title="Add Note"
        isActive={modalOpen}
        handleClose={() => setModalState(false)}
        handleClick={() => setModalState(false)}
        handleCloseIcon={() => setModalState(false)}
        buttonTitle="Add Note"
        size="lg"
      >
        <AddNoteModal />
      </CustomModal>
    </>
  );
};

Dashboard.propTypes = {
  host_ui: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { hostUI } = state;
  return {
    host_ui: getHostUI(hostUI),
  };
};

export default connect(
  mapStateToProps,
  null,
)(Dashboard);
