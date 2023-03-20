import { PlusCircleOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import { useState } from 'react';
import { CustomButton, CustomCollapseCard, CustomPageHeader, CustomSelect, Option } from '../../../components';
import useAcquisitionTree from '../../../hooks/useAcquisitionTree';

import '../../../styles/settings/lessons.scss';

import AcquisitionTreeUploadExcelModal from './AcquisitionTreeUploadExcelModal';
import Lessons from './Lessons';

const { Title } = Typography;
const AcquisitionTreeList = () => {
    const { allClassList, classroomId, setClassroomId, isLoading } = useAcquisitionTree(false, true);
    const [isAdd, setIsAdd] = useState(false);

    return (
        <>
            <CustomPageHeader title="Kazanım Ağacı" showBreadCrumb routes={['Ayarlar']}>
                <CustomCollapseCard cardTitle="Kazanım Ağacı">
                    <div className="lessons-wrapper">
                        <div className="lessons-header">
                            <div className="class-select-container">
                                <Title level={5}>Sınıf Seviyesi Seç :</Title>
                                <CustomSelect
                                    style={{
                                        width: 300,
                                        paddingLeft: 5,
                                    }}
                                    placeholder="Seçiniz"
                                    onChange={(e) => setClassroomId(e)}
                                >
                                    {allClassList
                                        ?.filter((item) => item.isActive === true)
                                        ?.map(({ id, name }) => (
                                            <Option key={id} value={id}>
                                                {name}
                                            </Option>
                                        ))}
                                </CustomSelect>
                            </div>
                            <Space>
                                <CustomButton
                                    onClick={() => {
                                        setIsAdd(true);
                                    }}
                                    className="add-btn"
                                    icon={<PlusCircleOutlined />}
                                    disabled={!classroomId}
                                >
                                    Ders Ekle
                                </CustomButton>
                                <AcquisitionTreeUploadExcelModal selectedClassId={classroomId} />
                            </Space>
                        </div>

                        {classroomId && !isLoading && (
                            <Lessons classroomId={classroomId} isAdd={isAdd} setIsAdd={setIsAdd} />
                        )}
                    </div>
                </CustomCollapseCard>
            </CustomPageHeader>
        </>
    );
};

export default AcquisitionTreeList;
