import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../../../../components';
import { reactQuillValidator } from '../../../../utils/formRule';

const StatusAndVideoTextSection = ({ form }) => {
  const { currentVideo } = useSelector((state) => state?.videos);
  useEffect(() => {
    form.setFieldsValue({
      isActive: currentVideo?.isActive,
      text: currentVideo?.text,
    });
  }, [currentVideo]);

  return (
    <>
      <CustomFormItem
        rules={[
          {
            required: true,
            message: 'Lütfen Zorunlu Alanları Doldurunuz.',
          },
        ]}
        label="Durum"
        name="isActive"
      >
        <CustomSelect placeholder="Durum">
          <Option key={1} value={true}>
            Aktif
          </Option>
          <Option key={2} value={false}>
            Pasif
          </Option>
        </CustomSelect>
      </CustomFormItem>

      <CustomFormItem
        className="editor"
        label="Video Metni"
        name="text"
        rules={[
          { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          {
            validator: reactQuillValidator,
            message: 'Lütfen Zorunlu Alanları Doldurunuz.',
          },
        ]}
      >
        <ReactQuill theme="snow" />
      </CustomFormItem>
    </>
  );
};

export default StatusAndVideoTextSection;
