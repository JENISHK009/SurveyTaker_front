/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Form, ListGroup, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { OneChoise } from './QuestionOptionSection/OneChoise';
import { MultiChoise } from './QuestionOptionSection/MultiChoise';
import { RankOrder } from './QuestionOptionSection/RankOrder';
import tickIcon from '../../../assets/images/blue/check.svg';

export const AddQuestion = () => (
  <div>
    <Form.Check>
      <Form.Check.Input name="question" id="checkbox-audio-1" type="radio" />
      <Form.Check.Label htmlFor="checkbox-audio-1">One Choise</Form.Check.Label>
    </Form.Check>
    <Form.Check>
      <Form.Check.Input name="question" id="checkbox-audio-2" type="radio" />
      <Form.Check.Label htmlFor="checkbox-audio-2">
        Multiple Choise
      </Form.Check.Label>
    </Form.Check>
    <Form.Check>
      <Form.Check.Input name="question" id="checkbox-audio-3" type="radio" />
      <Form.Check.Label htmlFor="checkbox-audio-3">
        Quick Answer
      </Form.Check.Label>
    </Form.Check>
    <Form.Check>
      <Form.Check.Input name="question" id="checkbox-audio-4" type="radio" />
      <Form.Check.Label htmlFor="checkbox-audio-4">Rank Order</Form.Check.Label>
    </Form.Check>
  </div>
);

export const AddQuestionDetail = ({ questionType, handleChange }) => {
  const [queType, setQueType] = useState('');
  const [queTitle, setQueTitle] = useState('');
  const handleQuestionType = (type) => {
    setQueType(type);
  };

  useEffect(() => {
    if (questionType) {
      setQueType(questionType);
    }
  }, [questionType]);

  const onChange = (e) => {
    const { name, value } = e.target;
    handleChange({ [name]: value });
  };

  return (
    <Form>
      <Form.Label>The question</Form.Label>
      <Form.Control
        type="text"
        value={queTitle}
        name="question"
        placeholder="The Question"
        onChange={(e) => {
          onChange(e);
          setQueTitle(e.target.value);
        }}
        className="mb-3"
      />
      <Form.Group className="form-group">
        <Form.Select
          className="bg-transparent"
          name="type"
          onChange={(e) => {
            handleQuestionType(e.target.value);
            onChange(e);
          }}
          value={queType}
        >
          <option value="">select </option>
          <option value="1">One choise</option>
          <option value="2">Multiple Choise</option>
          <option value="3">Quick Answer</option>
          <option value="4">Rank Order</option>
        </Form.Select>
      </Form.Group>
      {queType === '1' ? (
        <OneChoise handleChange={handleChange} />
      ) : queType === '2' ? (
        <MultiChoise handleChange={handleChange} />
      ) : queType === '4' ? (
        <RankOrder handleChange={handleChange} />
      ) : (
        ''
      )}
    </Form>
  );
};

AddQuestionDetail.propTypes = {
  questionType: PropTypes.object.isRequired,
};

export const SelectQuestionTemplateModal = () => {
  const LIST = [
    'Template1_1.0',
    'Template1_1.0',
    'Template1_1.0',
    'Template1_1.0',
    'Template1_1.0',
    'Template1_1.0',
    'Template1_1.0',
    'Template1_1.0',
    'Template1_1.0',
    'Template1_1.0',
    'Template1_1.0',
    'Template1_1.0',
    'Template1_1.0',
    'Template1_1.0',
  ];

  const [activeTemplate, setActiveTemplate] = useState(1);

  return (
    <>
      <ListGroup className="select-template-list">
        {LIST.map((obj, index) => (
          <ListGroup.Item
            onClick={() => setActiveTemplate(index)}
            className={classNames({ 'text-blue': activeTemplate === index })}
          >
            {obj}{' '}
            {activeTemplate === index && (
              <Image
                className="ms-auto"
                src={tickIcon}
                width={24}
                height={24}
              />
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
