import { Col, Form, Row, Upload, Modal } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from '@ant-design/icons';
import {
  CustomButton,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  Option,
  Text,
  CustomImage,
} from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getBase64 } from '../../../../store/slice/fileSlice';
import QuestionSideBar from './QuestionSideBar';
import '../../../../styles/temporaryFile/asEvSwiper.scss';

const SingleQuestion = ({ id, index }) => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const getImage = async () => {
    let response = await dispatch(getBase64({ id: id }));
    let data = response.payload.data;
    const imageUrl = `data:${data?.contentType};base64,${data?.file}`;
    setUrl(imageUrl);
  };
  useEffect(() => {
    getImage();
  }, [dispatch]);

  return (
    <div
      style={{
        width: '100%',
        height: '750px',
        border: '2px solid red',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '0',
        margin: '0',
      }}
      className="single-image-container"
    >
      <img src={url} alt="Soru Resmi" width={'100%'} height={'100%'} key={id} />
    </div>
  );
};

export default SingleQuestion;
