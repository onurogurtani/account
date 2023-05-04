import { Tag } from 'antd';
import React from 'react';
import { Text } from '../../../components';
import '../../../styles/asEvTest/asEv.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAsEvById } from '../../../store/slice/asEvSlice';
import { useEffect } from 'react';

const AsEvInfo = ({ showData }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAsEvById({ id: showData?.id }));
    }, []);

    const { asEvDetail } = useSelector((state) => state?.asEv);

    return (
        <>
            {asEvDetail?.items && (
                <ul className="info-list">
                    <li>
                        <Text t="Eğitim Öğretim Yılı" /> : <span>{asEvDetail?.items[0]?.asEvDetail?.educationYear?.name}</span>
                    </li>
                    <li>
                        <Text t="Sınıf Seviyesi" /> : <span>{asEvDetail?.items[0]?.asEvDetail?.classroom?.name}</span>
                    </li>
                    <li>
                        <Text t="Ders" /> : <span>{asEvDetail?.items[0]?.asEvDetail?.lesson?.name}</span>
                    </li>
                    <li>
                        <Text t="Ünite" /> :
                        <span>{asEvDetail?.items[0]?.asEvQuestionsResponse?.asEvQuestionsDetail?.lessonUnitName}</span>
                    </li>
                    {asEvDetail?.items[0]?.asEvDetail?.subjects && (
                        <li>
                            <Text t="Konu" />:
                            {asEvDetail?.items[0]?.asEvDetail?.subjects.map((item, index) => (
                                <Tag color="red" key={index}>
                                    {item?.name}
                                </Tag>
                            ))}
                        </li>
                    )}
                    <li>
                        <Text t="Ölçme Değerlendirme Testi Adı" /> :
                        <span>{asEvDetail?.items[0]?.asEvDetail?.video?.name}</span>
                    </li>

                    <li>
                        <Text t="Soru Adedi" /> : <span>{asEvDetail?.items[0]?.asEvDetail?.questionCount}</span>
                    </li>
                </ul>
            )}
        </>
    );
};

export default AsEvInfo;
