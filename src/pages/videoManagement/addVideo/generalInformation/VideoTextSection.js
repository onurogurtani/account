import React from 'react';
import ReactQuill from 'react-quill';
import { CustomFormItem } from '../../../../components';
import { reactQuillValidator } from '../../../../utils/formRule';

const VideoTextSection = () => {
  return (
    <>
      <CustomFormItem
        className="editor"
        label="Video Metni"
        name="text"
        rules={[
          { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          { validator: reactQuillValidator, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
        ]}
      >
        <ReactQuill theme="snow" />
      </CustomFormItem>
    </>
  );
};

export default VideoTextSection;
