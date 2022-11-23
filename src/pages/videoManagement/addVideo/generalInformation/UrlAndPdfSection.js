import { Tag } from 'antd';
import React, { useState } from 'react';
import { CustomButton, CustomFormItem } from '../../../../components';
import UrlAndPdfModal from './UrlAndPdfModal';

const UrlAndPdfSection = ({ form }) => {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState();

  const addUrlOrPdf = () => {
    setSelectedTime();
    setOpen(true);
  };

  const handleClose = async (removedTag) => {
    const tagList = await form?.getFieldValue('urlAndPdfAttach');
    const newTags = [...tagList.slice(0, removedTag), ...tagList.slice(removedTag + 1)];
    form.setFieldsValue({
      urlAndPdfAttach: newTags,
    });
  };
  const handleClickTag = (item, index) => {
    setSelectedTime({ ...item, index });
    setOpen(true);
  };

  return (
    <>
      <CustomFormItem name="addUrlOrPdf" label=" Bağlantılar Dosya" className="url-pdf-attach">
        <CustomButton
          style={{ display: 'block' }}
          type="primary"
          className="add-btn mb-2"
          onClick={addUrlOrPdf}
        >
          Ekle
        </CustomButton>

        {form?.getFieldValue('urlAndPdfAttach')
          ? form?.getFieldValue('urlAndPdfAttach').map((item, index) => (
              <Tag
                key={index}
                closable
                onClick={() => handleClickTag(item, index)}
                onClose={() => handleClose(index)}
                color="default"
              >
                {item.time}
              </Tag>
            ))
          : ''}
      </CustomFormItem>
      <UrlAndPdfModal selectedTime={selectedTime} form={form} open={open} setOpen={setOpen} />
    </>
  );
};

export default UrlAndPdfSection;
