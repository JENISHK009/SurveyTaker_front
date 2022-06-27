import React, { useState, useEffect } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import classNames from 'classnames';
import deleteIcon from '../../../assets/images/trash-default.svg';
import plusIcon from '../../../assets/images/blue/plus.svg';

//store
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer, { getHostUI } from '../../../store/reducers/host-ui';
import injectReducer from '../../../utils/injectReducer';
import { setHostUI } from '../../../store/actions/host-ui';

const INITIAL_LIST = [
  {
    id: 1,
    screen_name: 'Screen 1',
  },
  {
    id: 2,
    screen_name: 'Screen 2',
  },
  {
    id: 3,
    screen_name: 'Screen 3',
  },
  {
    id: 4,
    screen_name: 'Screen 4',
  },
];
const Moderator = (props) => {
  const [list, setList] = useState(INITIAL_LIST);
  const [selectedCard, setSelectedCard] = useState(1);

  const handleAdd = () => {
    const newList = list.concat({
      screen_name: `screen ${list.length + 1}`,
      id: list.length + 1,
    });

    setList(newList);
  };

  const handleDelete = (id) => {
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  };

  useEffect(() => {
    props.setHostUI({
      ...props.host_ui,
      selected_screen: selectedCard,
    });
  }, [selectedCard]); 

  return (
    <>
      <div className="host-sidebar__heading">Moderator</div>

      <div className="moderator__card host-sidebar-pad">
        <div className="moderator__card-items">
          {list.map((item) => (
            <Card
              body
              className={classNames(
                { active: selectedCard === item.id },
                'mb-2',
              )}
              key={item.id}
              onClick={() => setSelectedCard(item.id)}
            >
              {item.screen_name}
              <Button className="p-0" onClick={() => handleDelete(item.id)}>
                <Image src={deleteIcon} alt="Delete" width={20} />
              </Button>
            </Card>
          ))}
        </div>
        <Button className="moderator__btn" onClick={handleAdd}>
          <Image src={plusIcon} alt="Delete" width={18} />
          <div>Add Section</div>
        </Button>
      </div>
    </>
  );
};

const withReducer = injectReducer({ key: 'hostUI', reducer });

const mapStateToProps = (state) => {
  const { hostUI } = state;
  return {
    host_ui: getHostUI(hostUI),
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    setHostUI: (payload) => dispatch(setHostUI(payload)),
    dispatch,
  };
}

export default compose(
  withReducer,
  connect(mapStateToProps, mapDispatchToProps),
)(Moderator);
