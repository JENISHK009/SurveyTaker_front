import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

const AddNoteModal = ({ onChange }) => {
  // eslint-disable-next-line no-unused-vars
  const [notes, setNotes] = useState('');

  const onAddNotes = note => {
    setNotes(note);
    onChange({ body: note });
  };
  return (
    <div>
      <Editor
        tinymceScriptSrc="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js"
        // initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount lists code emoticons',
          ],
          toolbar:
            'undo redo | ' +
            'bold italic  underline forecolor | ' +
            ' bullist numlist  | ' +
            'backcolor | emoticons',
          content_style:
            'body { font-family: "Museo Sans", sans-serif; font-size:14px; }',

          selector: 'textarea#emoticons',
          emoticons_append: {
            custom_mind_explode: {
              keywords: ['brain', 'mind', 'explode', 'blown'],
              char: '🤯',
            },
          },
        }}
        apiKey="4n4qxvxryadb31lr4g6fuookb4idn4lw504pxm910mtuln8n"
        onEditorChange={e => {
          onAddNotes(e.target.getContent());
        }}
        // type="text"
      />
    </div>
  );
};
AddNoteModal.propTypes = {
  onChange: PropTypes.func,
};

export default AddNoteModal;
