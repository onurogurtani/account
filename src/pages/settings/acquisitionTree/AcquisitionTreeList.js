import { PlusCircleOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomCollapseCard, CustomPageHeader, CustomSelect, Option } from '../../../components';
import useAcquisitionTree from '../../../hooks/useAcquisitionTree';
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { getEducationYearList } from '../../../store/slice/educationYearsSlice';
import { getListFilterParams } from '../../../utils/utils';
import AcquisitionTreeUploadExcelModal from './AcquisitionTreeUploadExcelModal';
import Lessons from './Lessons';
import '../../../styles/settings/lessons.scss';

const { Title } = Typography;
const AcquisitionTreeList = () => {
    const dispatch = useDispatch();
    const { classroomId, setClassroomId, isLoading } = useAcquisitionTree(false, true, true);
    const { educationYearList } = useSelector((state) => state.educationYears);
    const { allClassList } = useSelector((state) => state?.classStages);
    const [isAdd, setIsAdd] = useState(false);
    const [selectedEducationYear, setSelectedEducationYear] = useState();

    useEffect(() => {
        dispatch(getEducationYearList());
    }, [dispatch]);
    return (
        <>
            <CustomPageHeader title="Kazanım Ağacı" showBreadCrumb routes={['Ayarlar']}>
                <CustomCollapseCard cardTitle="Kazanım Ağacı">
                    <div className="lessons-wrapper">
                        <div className="lessons-header">
                            <div className="class-select-container">
                                <Space>
                                    <Title level={5}>Eğitim Öğretim Yılı:</Title>
                                    <CustomSelect
                                        style={{
                                            width: 150,
                                            paddingLeft: 5,
                                        }}
                                        placeholder="Seçiniz"
                                        onChange={(e) => {
                                            dispatch(
                                                getAllClassStages(
                                                    getListFilterParams('educationYearId', e).concat([
                                                        { field: 'isActive', value: true, compareType: 0 },
                                                    ]),
                                                ),
                                            );
                                            setSelectedEducationYear(e);
                                        }}
                                    >
                                        {educationYearList?.items?.map(({ id, startYear, endYear }) => (
                                            <Option key={id} value={id}>
                                                {startYear} - {endYear}
                                            </Option>
                                        ))}
                                    </CustomSelect>
                                    <Title level={5}>Sınıf Seviyesi Seç:</Title>
                                    <CustomSelect
                                        style={{
                                            width: 250,
                                            paddingLeft: 5,
                                        }}
                                        disabled={!selectedEducationYear}
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
                                </Space>
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
