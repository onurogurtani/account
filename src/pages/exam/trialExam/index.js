import { Form, Tabs } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CustomButton,
    CustomCheckbox,
    CustomCollapseCard,
    CustomDatePicker,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomPageHeader,
    CustomSelect,
    Option,
} from '../../../components';
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { getLessonsQuesiton } from '../../../store/slice/lessonsSlice';
import { getLessonSubjectsList, resetLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { getLessonSubSubjectsList, resetLessonSubSubjects } from '../../../store/slice/lessonSubSubjectsSlice';
import { getUnitsList, resetLessonUnits } from '../../../store/slice/lessonUnitsSlice';
import { setTrialExamFormData } from '../../../store/slice/trialExamSlice';
import { getTrialTypeList } from '../../../store/slice/trialTypeSlice';
import { getByFilterPagedVideosList, setVideos } from '../../../store/slice/videoSlice';
import '../../../styles/exam/trialExam.scss';
import { dateFormat } from '../../../utils/keys';
import { validation } from '../../../utils/utils';
import AddQuestion from './AddQuestion';

const TrialExam = () => {
    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState('0');
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { trialTypeList } = useSelector((state) => state.trialType);
    const { allClassList } = useSelector((state) => state.classStages);
    const { trialExamFormData } = useSelector((state) => state?.tiralExam);

    /*  const { lessons } = useSelector((state) => state.lessons);
    const { lessonUnits } = useSelector((state) => state?.lessonUnits);
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
    const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);
    const { videos } = useSelector((state) => state?.videos);
    const [dependLecturingVideo, setDependLecturingVideo] = useState(false);
*/

    const disabledEndDate = useCallback(
        (endValue) => {
            const { startDate } = form?.getFieldsValue(['startDate']);
            return endValue?.startOf('day') <= startDate?.startOf('day');
        },
        [form],
    );
    const isTheEndYearEqualToTheYearOfTheEndDate = useCallback(
        async (field, value) => {
            const startYear = form?.getFieldValue('startDate');
            try {
                if (!startYear || value.$d > startYear.$d) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error());
            } catch (e) {
                return Promise.reject(new Error());
            }
        },
        [form],
    );
    const isTheStartYearEqualToTheYearOfTheEndDate = useCallback(
        async (field, value) => {
            const finishDate = form?.getFieldValue('finishDate');
            try {
                if (!finishDate || value.$d < finishDate.$d) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error());
            } catch (e) {
                return Promise.reject(new Error());
            }
        },
        [form],
    );

    useEffect(() => {
        dispatch(getTrialTypeList({ testExamTypeDetailSearch: { pageNumber: 1, pageSize: 200 } }));
    }, [dispatch]);
    useEffect(() => {
        dispatch(getAllClassStages());
    }, [dispatch]);

    return (
        <div className=" trial-exam-add">
            <CustomPageHeader>
                <CustomCollapseCard cardTitle={'Deneme Sınavı Ekle'}>
                    <div className="trial-exam-add-content">
                        <Tabs
                            onChange={(e) => {
                                // setActiveKey(e);
                            }}
                            activeKey={activeKey}
                        >
                            <TabPane tab="Genel Bilgiler" key={'0'}>
                                <CustomForm
                                    onFinish={(e) => {
                                        const data = {
                                            ...trialExamFormData,
                                            ...e,
                                            finishDate: e?.finishDate?.$d,
                                            startDate: e?.startDate?.$d,
                                            transitionBetweenQuestions: e.transitionBetweenQuestions
                                                ? e.transitionBetweenQuestions
                                                : false,
                                            transitionBetweenSections: e.transitionBetweenSections
                                                ? e.transitionBetweenSections
                                                : false,
                                        };
                                        dispatch(setTrialExamFormData(data));
                                        setActiveKey('1');
                                    }}
                                    form={form}
                                    className="form"
                                >
                                    <CustomFormItem
                                        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                                        name={'testExamTypeId'}
                                        label="Deneme Türü"
                                    >
                                        <CustomSelect>
                                            {trialTypeList?.items?.map((item, index) => (
                                                <Option value={item.id} key={item.id}>
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </CustomSelect>
                                    </CustomFormItem>
                                    <CustomFormItem
                                        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                                        name={'name'}
                                        label="Sınav Adı"
                                    >
                                        <CustomInput />
                                    </CustomFormItem>
                                    <CustomFormItem
                                        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                                        name={'classroomId'}
                                        label="Sınıf"
                                    >
                                        <CustomSelect>
                                            {allClassList?.map((item, index) => (
                                                <Option value={item.id} key={item.id}>
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </CustomSelect>
                                    </CustomFormItem>
                                    <CustomFormItem
                                        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                                        name={'examType'}
                                        label="Sınav Türü"
                                    >
                                        <CustomSelect
                                            options={[
                                                {
                                                    value: 1,
                                                    label: 'LGS',
                                                },
                                                {
                                                    value: 2,
                                                    label: 'TYT',
                                                },
                                                {
                                                    value: 3,
                                                    label: 'AYT',
                                                },
                                            ]}
                                        ></CustomSelect>
                                    </CustomFormItem>
                                    <CustomFormItem
                                        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                                        name={'difficulty'}
                                        label="Zorluk"
                                    >
                                        <CustomSelect
                                            options={[
                                                {
                                                    value: '1',
                                                    label: '1',
                                                },
                                                {
                                                    value: '2',
                                                    label: '2',
                                                },
                                                {
                                                    value: '3',
                                                    label: '3',
                                                },
                                                {
                                                    value: '4',
                                                    label: '4',
                                                },
                                                {
                                                    value: '5',
                                                    label: '5',
                                                },
                                            ]}
                                        />
                                    </CustomFormItem>
                                    <div style={{ position: 'relative' }}>
                                        <CustomFormItem
                                            rules={[
                                                { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                                                {
                                                    validator: (field, value) => {
                                                        if (validation.isNumber(value) && value.search(' ') === -1) {
                                                            return Promise.resolve();
                                                        } else {
                                                            return Promise.reject(new Error());
                                                        }
                                                    },
                                                    message: 'Lütfen harf ve  boşluk girmeyiniz.',
                                                },
                                            ]}
                                            name={'testExamTime'}
                                            label="Sınav Süresi"
                                        >
                                            <CustomInput />
                                        </CustomFormItem>
                                        <div className="TestExamTimeType">Dk</div>
                                    </div>
                                    <CustomFormItem name={'keyWords'} label="Anahtar Kelimeler">
                                        <CustomSelect mode="tags" />
                                    </CustomFormItem>
                                    <CustomFormItem
                                        rules={[
                                            { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                                            {
                                                validator: isTheStartYearEqualToTheYearOfTheEndDate,
                                                message: 'Lütfen tarihleri kontrol ediniz.',
                                            },
                                        ]}
                                        name={'startDate'}
                                        label="Başlangıç Tarihi"
                                    >
                                        <CustomDatePicker />
                                    </CustomFormItem>
                                    <CustomFormItem
                                        rules={[
                                            { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                                            {
                                                validator: isTheEndYearEqualToTheYearOfTheEndDate,
                                                message: 'Lütfen tarihleri kontrol ediniz.',
                                            },
                                        ]}
                                        name={'finishDate'}
                                        label="Bitiş Tarihi"
                                    >
                                        <CustomDatePicker disabledDate={disabledEndDate} />
                                    </CustomFormItem>

                                    {/**    <CustomFormItem name={'dependLecturingVideo'}>
                                        <CustomCheckbox
                                            onChange={(e) => {
                                                setDependLecturingVideo(e.target.checked);
                                            }}
                                        >
                                            Konu anlatım vidosunda bağlı oluştur
                                        </CustomCheckbox>
                                    </CustomFormItem>  {dependLecturingVideo && (
                                        <>
                                            <CustomFormItem name={'classId'} label="Sınıf">
                                                <CustomSelect
                                                    onChange={(e) => {
                                                        dispatch(resetLessonUnits());
                                                        dispatch(resetLessonSubjects());
                                                        dispatch(resetLessonSubSubjects());
                                                        dispatch(setVideos([]));
                                                        form.resetFields([
                                                            'lessonId',
                                                            'lessonUnitId',
                                                            'lessonSubjectId',
                                                            'lessonSubSubjectId',
                                                            'videoId',
                                                        ]);
                                                        dispatch(
                                                            getLessonsQuesiton([
                                                                { field: 'classroomId', value: e, compareType: 0 },
                                                            ]),
                                                        );
                                                    }}
                                                >
                                                    {allClassList?.map((item, index) => (
                                                        <Option value={item.id} key={item.id}>
                                                            {item.name}
                                                        </Option>
                                                    ))}
                                                </CustomSelect>
                                            </CustomFormItem>
                                            <CustomFormItem name={'lessonId'} label="Ders">
                                                <CustomSelect
                                                    onChange={(e) => {
                                                        dispatch(resetLessonUnits());
                                                        dispatch(resetLessonSubjects());
                                                        dispatch(resetLessonSubSubjects());
                                                        dispatch(setVideos([]));
                                                        form.resetFields([
                                                            'lessonUnitId',
                                                            'lessonSubjectId',
                                                            'lessonSubSubjectId',
                                                            'videoId',
                                                        ]);

                                                        dispatch(
                                                            getUnitsList([
                                                                { field: 'lessonId', value: e, compareType: 0 },
                                                            ]),
                                                        );
                                                    }}
                                                >
                                                    {lessons?.map((item, index) => (
                                                        <Option value={item.id} key={item.id}>
                                                            {item.name}
                                                        </Option>
                                                    ))}
                                                </CustomSelect>
                                            </CustomFormItem>
                                            <CustomFormItem name={'lessonUnitId'} label="Ünite">
                                                <CustomSelect
                                                    onChange={(e) => {
                                                        dispatch(resetLessonSubjects());
                                                        dispatch(resetLessonSubSubjects());
                                                        dispatch(setVideos([]));
                                                        form.resetFields([
                                                            'lessonSubjectId',
                                                            'lessonSubSubjectId',
                                                            'videoId',
                                                        ]);
                                                        dispatch(
                                                            getLessonSubjectsList([
                                                                { field: 'lessonUnitId', value: e, compareType: 0 },
                                                            ]),
                                                        );
                                                    }}
                                                >
                                                    {lessonUnits?.map((item, index) => (
                                                        <Option value={item.id} key={item.id}>
                                                            {item.name}
                                                        </Option>
                                                    ))}
                                                </CustomSelect>
                                            </CustomFormItem>
                                            <CustomFormItem name={'lessonSubjectId'} label="Konu">
                                                <CustomSelect
                                                    onChange={(e) => {
                                                        dispatch(resetLessonSubSubjects());
                                                        dispatch(setVideos([]));
                                                        form.resetFields(['lessonSubSubjectId', 'videoId']);
                                                        dispatch(
                                                            getLessonSubSubjectsList([
                                                                { field: 'lessonSubjectId', value: e, compareType: 0 },
                                                            ]),
                                                        );
                                                    }}
                                                >
                                                    {lessonSubjects?.map((item, index) => (
                                                        <Option value={item.id} key={item.id}>
                                                            {item.name}
                                                        </Option>
                                                    ))}
                                                </CustomSelect>
                                            </CustomFormItem>
                                            <CustomFormItem name={'lessonSubSubjectId'} label="Alt Başlık">
                                                <CustomSelect
                                                    mode="multiple"
                                                    onChange={(e) => {
                                                        dispatch(setVideos([]));
                                                        form.resetFields(['videoId']);
                                                        const newData = {};
                                                        e.forEach((element, index) => {
                                                            newData[`VideoDetailSearch.LessonSubSubjectIds[${index}]`] =
                                                                element;
                                                        });
                                                        dispatch(
                                                            getByFilterPagedVideosList({
                                                                ...newData,
                                                                'VideoDetailSearch.PageSize:': 999999,
                                                            }),
                                                        );
                                                    }}
                                                >
                                                    {lessonSubSubjects?.map((item, index) => (
                                                        <Option value={item.id} key={item.id}>
                                                            {item.name}
                                                        </Option>
                                                    ))}
                                                </CustomSelect>
                                            </CustomFormItem>
                                            <CustomFormItem name={'videoId'} label="Video">
                                                <CustomSelect>
                                                    {videos?.map((item, index) => (
                                                        <Option value={item.id} key={item.id}>
                                                            {item.kalturaVideoName}
                                                        </Option>
                                                    ))}
                                                </CustomSelect>
                                            </CustomFormItem>
                                        </>
                                    )} */}

                                    <CustomFormItem valuePropName="checked" name={'transitionBetweenQuestions'}>
                                        <CustomCheckbox>Sorular Arası Geçise İzin Ver</CustomCheckbox>
                                    </CustomFormItem>
                                    <CustomFormItem valuePropName="checked" name={'transitionBetweenSections'}>
                                        <CustomCheckbox>Bölümler Arası Geçise İzin Ver</CustomCheckbox>
                                    </CustomFormItem>
                                    <CustomButton
                                        onClick={() => {
                                            form.submit();
                                        }}
                                    >
                                        İleri
                                    </CustomButton>
                                </CustomForm>
                            </TabPane>
                            <TabPane tab="Soru Seçimi" key={'1'}>
                                <AddQuestion setActiveKey={setActiveKey} />
                            </TabPane>
                        </Tabs>
                    </div>
                </CustomCollapseCard>
            </CustomPageHeader>
        </div>
    );
};

export default TrialExam;
