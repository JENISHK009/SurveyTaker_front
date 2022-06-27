/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Resizable } from 're-resizable';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import closeIcon from '../../../assets/images/close.svg';
import broadcastIcon from '../../../assets/images/broadcast.svg';
import editIcon from '../../../assets/images/edit.svg';
import moveIcon from '../../../assets/images/move.svg';
import Answers from './Answers';
import CustomModal from '../../../common/customModal';
import { AddQuestionDetail } from '../Modal/AddQuestion';
import { useModalWithData } from '../../../hooks/useModalWithData';

// store
import reducer, { getHostUI } from '../../../store/reducers/host-ui';
import injectReducer from '../../../utils/injectReducer';

import saga from '../../../store/sagas/questions';
import injectSaga from '../../../utils/injectSaga';

import { addQuestionRequest } from '../../../store/actions/questions';

const QUESTIONS = [
  {
    id: 1,
    question: 'Which of the following best describes your gender?',
    type: 'one_choise',
    answers: [
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
    ],
  },
  {
    id: 2,
    question: 'Which of the following best describes your gender?',
    type: 'quick_answer',
    answers: [
      {
        name: 'anon1',
        value: 'Lorem ipsum dolor sit amet, cons',
      },
      {
        name: 'anon1',
        value: 'Lorem ipsum dolor sit amet, cons',
      },
      {
        name: 'anon1',
        value: 'Lorem ipsum dolor sit amet, cons',
      },
      {
        name: 'anon1',
        value: 'Lorem ipsum dolor sit amet, cons',
      },
      {
        name: 'anon1',
        value: 'Lorem ipsum dolor sit amet, cons',
      },
      {
        name: 'anon1',
        value: 'Lorem ipsum dolor sit amet, cons',
      },
    ],
  },
  {
    id: 3,
    question: 'Which of the following best describes your gender?',
    type: 'one_choise',
    answers: [
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
    ],
  },
  {
    id: 4,
    question: 'Which of the following best describes your gender?',
    type: 'multiple_choise',
    answers: [
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
    ],
  },
  {
    id: 5,
    question: 'Which of the following best describes your gender?',
    type: 'rank_order',
    answers: [
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
      {
        name: 'Lorem ipsum',
        value: '0% (0)',
      },
    ],
  },
];

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

const QuestionCard = props => {
  const pointX = useRef();
  const [list, setList] = useState(QUESTIONS);
  const [payload, setPayload] = useState({});
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const [editQuestionModal, setEditQuestionModal] = useState();
  const { modalOpen, setModalState } = useModalWithData();

  const onDragStart = event => {
    const crt = event.currentTarget.cloneNode(true);

    crt.style.transform = 'rotate(2deg)';
    crt.style.overflow = 'hidden';
    crt.style.width = `${event.currentTarget.offsetWidth}px`;
    crt.classList.add('border-blue');
    crt.querySelector('.card-header').classList.add('overflow-hidden');
    crt.querySelector('.card-header button').classList.add('d-none');
    crt.querySelector('.card-body').classList.add('d-none');
    crt.querySelector('.card-footer').classList.add('d-none');
    crt.classList.add('ghost-image');
    crt.style.position = 'absolute';
    crt.style.top = '0px';
    crt.style.right = '0px';
    document.body.appendChild(crt);
    event.dataTransfer.setDragImage(crt, 0, 0);
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    });
    event.dataTransfer.setData('text/html', '');
  };

  const onDragOver = event => {
    event.preventDefault();
    const draggedTo = Number(event.currentTarget.dataset.position);
    setTimeout(() => {
      if (draggedTo !== dragAndDrop.draggedTo) {
        setDragAndDrop({
          ...dragAndDrop,
          draggedTo,
        });
      }
    }, 100);
  };

  const onDrop = () => {
    const { draggedFrom, draggedTo } = dragAndDrop;

    const newList = dragAndDrop.originalOrder;
    const itemDropped = newList[draggedTo];
    const itemDragged = newList[draggedFrom];
    newList[draggedFrom] = itemDropped;
    newList[draggedTo] = itemDragged;
    setList(newList);
    setTimeout(() => {
      setDragAndDrop({
        ...dragAndDrop,
        draggedFrom: null,
        draggedTo: null,
        isDragging: false,
      });
    }, 100);

    const ghostImage = document.querySelector('.ghost-image');
    if (ghostImage) {
      ghostImage.remove();
    }
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };
  const onDragEnd = () => {
    setTimeout(() => {
      setDragAndDrop({
        ...dragAndDrop,
        draggedTo: null,
        draggedFrom: null,
      });
    }, 100);

    const ghostImage = document.querySelector('.ghost-image');
    if (ghostImage) {
      ghostImage.remove();
    }
  };

  const handleAddQuestion = () => {
    const payloadData = {
      ...payload,
      input_type: Number(payload.type) || '',
    };
    props.addQuestionRequest(payloadData);
  };

  const handleChange = data => {
    const py = {
      ...payload,
      ...data,
    };
    setPayload(py);
  };

  useEffect(() => {
    () => clearInterval(pointX.current);
    setPayload({ ...payload, screen_id: props.host_ui.selected_screen });
  }, [props.host_ui.selected_screen]);

  return (
    <>
      <div className="question d-flex">
        {list.map((question, index) => (
          <Resizable
            defaultSize={{ width: 282, height: 'auto' }}
            minWidth={200}
            enable={{
              top: false,
              right: true,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            onResizeStop={(e, direction, ref, d) => {
              e.target.style.width = `${d.width}px`;
            }}
            onResizeStart={() => {
              const leftPos = document.querySelector('.dashboard-wrapper')
                .scrollLeft;
              pointX.current = leftPos;
            }}
            onResize={() => {
              document.querySelector('.dashboard-wrapper').scrollLeft =
                pointX.current;
            }}
            className="question-card-resize"
            handleStyles={{ width: '282px' }}
          >
            <Card
              data-position={index}
              draggable
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              onDragEnd={onDragEnd}
              className={classNames(
                {
                  'drop-area':
                    dragAndDrop &&
                    dragAndDrop.draggedTo === Number(index) &&
                    dragAndDrop.draggedFrom !== null &&
                    dragAndDrop.draggedTo !== null,
                  'drag-area':
                    dragAndDrop &&
                    dragAndDrop.draggedFrom === Number(index) &&
                    dragAndDrop.draggedTo !== null,
                },
                'question-card',
              )}
            >
              <Card.Header className="fw-bold d-flex justify-content-between align-items-center">
                Question {question.id}
                <Button className="p-0">
                  <Image src={closeIcon} alt="Close" width={24} />
                </Button>
              </Card.Header>
              <Card.Body>
                <Card.Title className="fw-bold fs-14 text-start bg-alice-blue">
                  {question.question}
                </Card.Title>
                <div className="question-card-body">
                  <Answers type={question.type} answers={question.answers} />
                </div>
              </Card.Body>
              <Card.Footer className="d-flex">
                8/8
                <Button className="ms-auto btn-icon-default">
                  <Image src={duplicatIcon} alt="Duplicate" width={24} />
                </Button>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Broadcast Results</Tooltip>}
                >
                  <Button className="ms-3 btn-icon-default">
                    <Image src={broadcastIcon} alt="Broadcast" width={24} />
                  </Button>
                </OverlayTrigger>
                <Button
                  className="ms-3 btn-icon-default"
                  onClick={() => {
                    setModalState(true);
                    setEditQuestionModal(question.type);
                  }}
                >
                  <Image src={editIcon} alt="Edit" width={24} />
                </Button>
              </Card.Footer>
              {dragAndDrop &&
                dragAndDrop.draggedFrom !== dragAndDrop.draggedTo && (
                  <div className="switch-card">
                    <Image src={moveIcon} alt="Move" width={32} />
                    <div className="text-blue fw-14 mt-2 fw-bold">Switch</div>
                  </div>
                )}
            </Card>
          </Resizable>
        ))}
      </div>
      <CustomModal
        title="Add New Question"
        isActive={modalOpen}
        handleClose={() => setModalState(false)}
        handleCloseIcon={() => setModalState(false)}
        handleClick={() => setModalState(false)}
        handleSaveClick={handleAddQuestion}
        buttonTitle="Add Question"
        buttonBottomTitle="Save Question to the Bank"
        buttonBottomFrom
      >
        <AddQuestionDetail
          questionType={editQuestionModal}
          handleChange={handleChange}
        />
      </CustomModal>
    </>
  );
};

const withReducer = injectReducer({ key: 'questions', reducer });
const withSaga = injectSaga({ key: 'questions', saga });

const mapStateToProps = state => {
  const { hostUI } = state;
  return {
    host_ui: getHostUI(hostUI),
  };
};

const mapDispatchToProps = dispatch => ({
  addQuestionRequest: payload => dispatch(addQuestionRequest(payload)),
  dispatch,
});

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(QuestionCard);

QuestionCard.propTypes = {
  addQuestionRequest: PropTypes.func,
  host_ui: PropTypes.object,
};
