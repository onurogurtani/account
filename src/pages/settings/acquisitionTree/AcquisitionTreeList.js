import { PlusCircleOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomCollapseCard,
  CustomPageHeader,
  CustomSelect,
  Option,
  Text,
  warningDialog,
} from '../../../components';
import EditableInput from '../../../components/EditableInput';
import useAcquisitionTree from '../../../hooks/useAcquisitionTree';
import { addLessons } from '../../../store/slice/lessonsSlice';
import '../../../styles/settings/lessons.scss';
import AcquisitionTreeUploadExcelModal from './AcquisitionTreeUploadExcelModal';
import Lesson from './Lesson';

const { Title } = Typography;
const AcquisitionTreeList = () => {
  const dispatch = useDispatch();
  const { classroomId, setClassroomId } = useAcquisitionTree();
  const { allClassList } = useSelector((state) => state?.classStages);
  const { lessons } = useSelector((state) => state?.lessons);
  const [isAdd, setIsAdd] = useState(false);

  const validateClassroom = useCallback(() => {
    if (!classroomId) {
      warningDialog({
        title: <Text t="error" />,
        message: 'Ders eklemek  için öncelikle sınıf seçmeniz gerekmektedir.',
      });
    } else {
      setIsAdd(true);
    }
  }, [classroomId]);

  const addLesson = useCallback(
    async (value) => {
      const entity = {
        entity: {
          name: value,
          classroomId,
        },
      };
      await dispatch(addLessons(entity));
    },
    [classroomId, dispatch],
  );

  const filteredLessons = useMemo(
    () => lessons?.filter((item) => item.classroomId === classroomId),
    [lessons, classroomId],
  );
  return (
    <>
      <CustomPageHeader title="Kazanım Ağacı" showBreadCrumb routes={['Ayarlar']}>
        <CustomCollapseCard cardTitle="Kazanım Ağacı">
          <div className="lessons-wrapper">
            <div className="lessons-header">
              <div className="class-select-container">
                <Title level={5}>Sınıf Bilgisi :</Title>
                <CustomSelect
                  style={{
                    width: 300,
                    paddingLeft: 5,
                  }}
                  placeholder="Seçiniz"
                  onChange={(e) => setClassroomId(e)}
                >
                  {allClassList?.map(({ id, name }) => (
                    <Option key={id} value={id}>
                      {name}
                    </Option>
                  ))}
                </CustomSelect>
              </div>
              <Space>
                <CustomButton onClick={validateClassroom} className="add-btn" icon={<PlusCircleOutlined />}>
                  Ders Ekle
                </CustomButton>
                <AcquisitionTreeUploadExcelModal selectedClassId={classroomId} />
              </Space>
            </div>
            <EditableInput height="40" isEdit={isAdd} setIsEdit={setIsAdd} onEnter={addLesson} />
            {filteredLessons.length > 0 && <Title level={3}>Dersler</Title>}
            {filteredLessons
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((i) => (
                <Lesson key={i.id} lesson={i} />
              ))}
          </div>
        </CustomCollapseCard>
      </CustomPageHeader>
    </>
  );
};

export default AcquisitionTreeList;
