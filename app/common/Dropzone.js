/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
import UploadImg from '../assets/images/upload.png';
import removeIcon from '../assets/images/close.svg';

const DropzoneComponent = ({ changeParticipantData, setErrors, payload }) => {
  const [myFiles, setMyFiles] = React.useState([]);

  const onDrop = React.useCallback(
    acceptedFiles => {
      setMyFiles([...acceptedFiles]);
      const file = acceptedFiles[0];
      const reader = new FileReader();

      // eslint-disable-next-line func-names
      reader.onload = function(e) {
        const text = e.target.result;
        processCSV(text);
      };

      reader.readAsText(file);
      setErrors({});
    },
    [myFiles, payload],
  );
  const processCSV = async str => {
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');
    const newArray = (await rows) && rows.filter(row => row !== '');
    changeParticipantData({ emailData: newArray });
  };
  const { getRootProps, getInputProps } = useDropzone({
    noKeyboard: true,
    maxSize: 20971520,
    multiple: false,
    maxFiles: 1,
    onDrop,
    accept: '.csv',
  });

  const removeFile = file => () => {
    const newFiles = [...myFiles];
    setErrors({});
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
    changeParticipantData({ emailData: [] });
  };

  const files = myFiles.map(file => (
    <li key={file.path} className="d-flex align-items-center">
      {file.path} - {file.size} bytes{' '}
      <Button className="ms-3 p-0" onClick={removeFile(file)}>
        <Image src={removeIcon} alt="remove" width={20} />
      </Button>
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <div className="dropzone__file">
          <img src={UploadImg} alt="upload" />
          <input {...getInputProps()} />
          <p className="mt-3 mb-5 ">
            Drag & Drop .CSV file here or find it on your computer.
          </p>
          <div className="d-flex justify-content-center">
            <Button variant="blue" type="button">
              Choose File
            </Button>
          </div>
        </div>
      </div>
      {files.length > 0 && (
        <aside className="mt-4">
          <h4>Files</h4>
          <ul className="ps-0">{files}</ul>
        </aside>
      )}
    </section>
  );
};

DropzoneComponent.propTypes = {
  onDrop: PropTypes.func,
  multiple: PropTypes.bool,
  setErrors: PropTypes.func,
  payload: PropTypes.func,
  changeParticipantData: PropTypes.func,
};
export default DropzoneComponent;
