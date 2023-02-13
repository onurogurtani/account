import dayjs from 'dayjs';
import { Tabs, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  confirmDialog,
  CustomButton,
  CustomPageHeader,
  errorDialog,
  successDialog,
  Text,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomInput,
} from '../../../../components';
import '../../../../styles/temporaryFile/asEv.scss';

const data = {
  createdName: 'Abdulkerim ',
  isWorkPlanAttached: false,
  questionCountExceptForCancel: 0,
  subjectCount: 0,
  startDate: '2023-01-17T11:12:30.066+00:00',
  endDate: '2023-01-27T11:12:25.066+00:00',
  questionCount: 0,
  kalturaVideoName: 'Divan edebiyatı soru çözümü',
  classroomName: 'hopp',
  lessonName: 'türkçe',
  lessonUnitName: 'hopp',
  lessonSubjects: [{ name: 'türkçe' }, { name: 'türkçe' }],
  lessonSubSubjects: [{ name: 'türkçe' }, { name: 'türkçe' }],
  id: 6,
  questionCountOfDifficulty1level: 1,
  questionCountOfDifficulty2level: 2,
  questionCountOfDifficulty3level: 3,
  questionCountOfDifficulty4level: 4,
  questionCountOfDifficulty5level: 5,
};
const countsArr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

const AsEvInfo = () => {
  //TODO AŞ. FONK OLARA DÜZENLENECEK
  const diffArr = [];
  for (const key in data) {
    if (key.includes('questionCountOfDifficulty')) {
      diffArr.push(data[key]);
    }
  }
  console.log('diffArr :>> ', diffArr);
  return (
    <>
      <ul className="info-list">
        <li>
          <Text t="Sınıf Seviyesi" /> : <span>{data?.classroomName}</span>
        </li>
        <li>
          <Text t="Ders" /> :<span>{data?.lessonName}</span>
        </li>
        <li>
          <Text t="Ünite" /> : <span>{data?.lessonUnitName}</span>
        </li>
        <li>
          <Text t="Konu" />:{' '}
          {data?.lessonSubjects.map((item, index) => (
            <Tag color="red" key={index}>
              {item?.name}{' '}
            </Tag>
          ))}
        </li>
        <li>
          <Text t="Alt Başlık" />:{' '}
          {data?.lessonSubSubjects.map((item, index) => (
            <Tag color="green" key={index}>
              {item?.name}{' '}
            </Tag>
          ))}
        </li>
        <li>
          <Text t="Ölçme Değerlendirme Test Adı" /> : <span>{data?.kalturaVideoName}</span>
        </li>
        <li>
          <Text t="Döküman Tanımlama Başlangıç Tarihi" /> : <span>{dayjs(data?.startDate)?.format('YYYY-MM-DD')}</span>
        </li>
        <li>
          <Text t="Döküman Tanımlama Bitiş Tarihi" /> : <span>{dayjs(data?.endDate)?.format('YYYY-MM-DD')}</span>
        </li>
        <li>
          <Text t="Soru Adedi" /> : <span>{data?.questionCount}</span>
        </li>
      </ul>
      <div className="countsContainer">
        <h3 className="counts-header">Seçilecek Soru Sayısı : {data?.questionCount} </h3>
        <div className="counts">
          {countsArr.map((id, index) => (
            <div key={index}>
              <CustomFormItem label={`Zorluk ${index + 1}`}>
                <CustomInput
                  disabled={true}
                  min={0}
                  value={diffArr[index]}
                  // className={classes.inputContainer}
                  // style={{ margin: '0 1em' }}
                />
              </CustomFormItem>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AsEvInfo;
