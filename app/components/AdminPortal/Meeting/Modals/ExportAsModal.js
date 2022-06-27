/* eslint-disable react/no-unused-prop-types */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import tickIcon from '../../../../assets/images/tick.svg';

const EXPORT_TYPES = [
  {
    type: 'CSV',
  },
  // {
  //   type: 'XLS',
  // },
  {
    type: 'SPSS',
    label: 'with data labels',
  },
];

const ExportAsModal = ({ setType }) => {
  const [exportType, setExportType] = useState('XLS');
  return (
    <div className="ticks-btn export-as-btn">
      {EXPORT_TYPES &&
        EXPORT_TYPES.length > 0 &&
        EXPORT_TYPES.map(exportAs => (
          <Button
            key={exportAs.type}
            variant="alice-blue"
            className={classNames({ active: exportType === exportAs.type })}
            onClick={() => setType(exportAs.type)}
            onFocus={() => setExportType(exportAs.type)}
          >
            {exportAs.type} {exportAs.label && <span>with data labels</span>}
            {exportType === exportAs.type && (
              <Image className="tick-icon" src={tickIcon} alt="tick" />
            )}
          </Button>
        ))}
    </div>
  );
};

ExportAsModal.propTypes = {
  setType: PropTypes.func,
};

export default ExportAsModal;
