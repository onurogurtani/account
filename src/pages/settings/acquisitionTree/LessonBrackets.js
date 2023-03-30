import { Typography } from 'antd';
import { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLessonBrackets } from '../../../store/slice/lessonBracketsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import LessonBracket from './LessonBracket';

const { Title } = Typography;
const LessonBrackets = ({ lessonAcquisition, selectedInsertKey, setSelectedInsertKey, parentIsActive }) => {
    const dispatch = useDispatch();
    const { lessonBrackets } = useSelector((state) => state?.lessonBrackets);

    const filteredLessonBracket = useMemo(
        () => lessonBrackets?.filter((item) => item.lessonAcquisitionId === lessonAcquisition.id),
        [lessonBrackets, lessonAcquisition.id],
    );

    const addLessonBracket = async (value) => {
        const entity = {
            entity: {
                name: value.name,
                code: value.code,
                isActive: parentIsActive,
                lessonAcquisitionId: lessonAcquisition.id,
            },
        };
        await dispatch(addLessonBrackets(entity)).unwrap();
    };
    return (
        <>
            {filteredLessonBracket.length > 0 && <Title level={3}>Ayraçlar - Ayraç Kodları</Title>}
            <AcquisitionTreeCreateOrEdit
                height="40"
                isEdit={
                    lessonAcquisition.id === selectedInsertKey?.id && selectedInsertKey?.type === 'lessonAcquisition'
                }
                setIsEdit={setSelectedInsertKey}
                onEnter={addLessonBracket}
                code
            />
            {filteredLessonBracket.map((lessonBracket) => (
                <div className="mb-3">
                    <LessonBracket
                        parentIsActive={parentIsActive}
                        setSelectedInsertKey={setSelectedInsertKey}
                        lessonBracket={lessonBracket}
                    />
                </div>
            ))}
        </>
    );
};

export default memo(LessonBrackets);
