import { Tag } from 'antd';
import React from 'react';
import { Text } from '../../../../components';
import '../../../../styles/temporaryFile/asEv.scss';
import { useSelector } from 'react-redux';

const AsEvInfo = () => {
    const { asEvDetail } = useSelector((state) => state?.asEv);

    return (
        <>
            <ul className="info-list">
                <li>
                    <Text t="Sınıf Seviyesi" /> :
                </li>
                <li>
                    <Text t="Ders" /> : <span>{asEvDetail?.items[0]?.asEvDetail?.lesson?.name}</span>
                </li>
                <li>
                    <Text t="Ünite" /> : <span>{asEvDetail?.items[0]?.asEvQuestionsResponse?.asEvQuestionsDetail?.lessonUnitName}</span>
                </li>
                <li>
                    <Text t="Konu" />:{' '}
                    {/* {showData?.subjectNames.map((item, index) => (
            <Tag color="red" key={index}>
              {item}{' '}
            </Tag>
          ))} */}
                </li>

                <li>
                    <Text t="Ölçme Değerlendirme Testi Adı" /> :{' '}
                    <span>{asEvDetail?.items[0]?.asEvDetail?.video?.name}</span>
                </li>

                <li>
                    <Text t="Soru Adedi" /> : <span>{asEvDetail?.items[0]?.asEvDetail?.questionCount}</span>
                </li>
            </ul>
        </>
    );
};

export default AsEvInfo;
