/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Image, Spinner, Form } from 'react-bootstrap';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import tickIcon from '../../../../assets/images/blue/tick.svg';

const MoveMeeting = ({
  meetingsFolder,
  setMoveFolderId,
  errors,
  moveFolderId,
  setErrors,
}) => {
  const [activeTemplate, setActiveTemplate] = useState();
  const [folderData, setFolderData] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    const data =
      meetingsFolder &&
      meetingsFolder.meetingsFolderList &&
      meetingsFolder.meetingsFolderList.data &&
      meetingsFolder.meetingsFolderList.data.length > 0 &&
      meetingsFolder.meetingsFolderList.data.filter(({ type }) => {
        return type === 'folder';
      });

    setFolderData(data);
  }, [meetingsFolder]);

  return (
    <>
      {meetingsFolder && meetingsFolder.fetching ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      ) : (
        <ListGroup className="select-template-list">
          {id && (
            <ListGroup.Item
              onClick={() => {
                setErrors({});
                setMoveFolderId(null);
              }}
              className={classNames({
                'text-blue': moveFolderId === null,
              })}
            >
              No Folder
              {moveFolderId === null && (
                <Image
                  className="ms-auto"
                  src={tickIcon}
                  width={24}
                  height={24}
                />
              )}
            </ListGroup.Item>
          )}
          {folderData &&
            folderData.length > 0 &&
            folderData.map((obj, index) => (
              <>
                {(!id || (id && id.toString() !== obj.id.toString())) && (
                  <ListGroup.Item
                    onClick={() => {
                      setActiveTemplate(index);
                      setMoveFolderId(obj.id);
                      setErrors({});
                    }}
                    className={classNames({
                      'text-blue': activeTemplate === index,
                      'is-invalid': errors.folderId,
                    })}
                  >
                    {obj.folderName}{' '}
                    {activeTemplate === index && (
                      <Image
                        className="ms-auto"
                        src={tickIcon}
                        width={24}
                        height={24}
                      />
                    )}
                  </ListGroup.Item>
                )}
              </>
            ))}
          {errors && errors.folderId && (
            <Form.Control.Feedback type="invalid">
              {errors.folderId}
            </Form.Control.Feedback>
          )}
        </ListGroup>
      )}
    </>
  );
};

MoveMeeting.propTypes = {
  meetingsFolder: PropTypes.object,
  setMoveFolderId: PropTypes.string,
  errors: PropTypes.string,
  moveFolderId: PropTypes.string,
  setErrors: PropTypes.func,
};

export default MoveMeeting;
