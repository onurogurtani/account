import { Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomButton, CustomFormItem } from '../../../../components';
import UrlAndPdfModal from './UrlAndPdfModal';

const UrlAndPdfSection = ({ form }) => {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const { currentVideo } = useSelector((state) => state?.videos);

  useEffect(() => {
    const groupBy = (array, key) => {
      return array.reduce((result, currentValue) => {
        result[currentValue[key]] = {
          ...result[currentValue[key]],
          ...currentValue,
          urlFormList: result[currentValue[key]]?.urlFormList || [],
        };
        if (currentValue?.url) {
          (result[currentValue[key]].urlFormList || []).push({ url: currentValue?.url });
        }
        if (currentValue?.file) {
          result[currentValue[key]].uploadedFile = currentValue.file;
        }
        return result;
      }, {}); // empty object is the initial value for result object
    };

    const videoAttachmentsList = groupBy(currentVideo?.videoAttachmentsResponse || [], 'time');

    form.setFieldsValue({
      urlAndPdfAttach: Object.values(videoAttachmentsList),
    });
  }, [currentVideo]);

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
