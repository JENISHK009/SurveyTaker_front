import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CustomModal from '../../../common/customModal';
import SaveTemplate from './SaveTemplate';
import SelectTemplate from './SelectTemplate';

const Templates = () => {
  const [selectTemplateModal, setSelectTemplateModal] = useState(false);
  const [templatePreview, setTemplatePreview] = useState(false);
  const [saveTemplate, setSaveTemplate] = useState(false);

  return (
    <>
      <div className="host-sidebar__heading">Templates</div>
      <div className="host-sidebar-pad">
        {!templatePreview && (
          <div className="d-flex justify-content-between">
            <Button
              size="sm"
              variant="blue-10"
              className="text-blue flex-fill justify-content-center"
              onClick={() => setSelectTemplateModal(true)}
            >
              Load
            </Button>
            <Button
              size="sm"
              variant="blue"
              className="ms-2 flex-fill justify-content-center"
              onClick={() => setSaveTemplate(true)}
            >
              Save
            </Button>
          </div>
        )}

        {templatePreview && (
          <>
            <div className="d-flex justify-content-between">
              <Button
                size="sm"
                variant="blue-10"
                className="text-blue flex-fill justify-content-center"
                onClick={() => setSelectTemplateModal(true)}
              >
                Delete
              </Button>
              <Button
                size="sm"
                variant="blue"
                className="ms-2 flex-fill justify-content-center"
                onClick={() => setTemplatePreview(false)}
              >
                Use
              </Button>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Button
                size="sm"
                variant="link"
                className="text-decoration-none text-blue p-0"
                onClick={() => setTemplatePreview(false)}
              >
                Exit Template Preview
              </Button>
            </div>
          </>
        )}
      </div>

      <CustomModal
        title="Please Enter a Template Name"
        isActive={saveTemplate}
        handleClose={() => setSaveTemplate(false)}
        handleClick={() => setSaveTemplate(false)}
        handleCloseIcon={() => setSaveTemplate(false)}
        buttonTitle="Save Template"
        size="xs"
      >
        <SaveTemplate />
      </CustomModal>
      <CustomModal
        title="Select a Template"
        isActive={selectTemplateModal}
        handleClose={() => setSelectTemplateModal(false)}
        handleCloseIcon={() => setSelectTemplateModal(false)}
        handleClick={() => {
          setSelectTemplateModal(false);
          setTemplatePreview(true);
        }}
        buttonTitle="Load Template"
        size="xs"
      >
        <SelectTemplate />
      </CustomModal>
    </>
  );
};

export default Templates;
