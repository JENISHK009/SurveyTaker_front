import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const TextEditor = ({ height, getEditorContent, value, from }) => {
  const handleEditorChange = e => {
    const data = e.target.getContent();
    getEditorContent(data);
  };

  return (
    <div className={from === 'media' ? 'mediaText' : 'texteditor'}>
      <Editor
        initialValue={value}
        tinymceScriptSrc="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js"
        init={{
          height: height || 400,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount lists code  emoticons',
          ],
          toolbar:
            'undo redo | ' +
            'bold italic  underline forecolor | ' +
            ' bullist numlist  | ' +
            'backcolor | link | emoticons',
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
        onChange={handleEditorChange}
        apiKey="4n4qxvxryadb31lr4g6fuookb4idn4lw504pxm910mtuln8n"
      />
    </div>
  );
};

TextEditor.propTypes = {
  height: PropTypes.number,
  getEditorContent: PropTypes.func,
  from: PropTypes.string,
  value: PropTypes.string,
};

export default TextEditor;
