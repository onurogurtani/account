import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, message, Upload } from 'antd';
import { CancelToken, isCancel } from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
    confirmDialog,
    CustomButton,
    CustomCheckbox,
    CustomCollapseCard,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomRadio,
    CustomRadioGroup,
    CustomSelect,
    errorDialog,
    Option,
    successDialog,
    Text,
} from '../../../components';
import { packageKind, packageTypes, packageFieldTypes, PACKAGE_TYPES } from '../../../constants/package';
import useAcquisitionTree from '../../../hooks/useAcquisitionTree';
import fileServices from '../../../services/file.services';
import { getPublisherList } from '../../../store/slice/publisherSlice';
import { getContractKindsByContractTypes } from '../../../store/slice/contractKindsSlice';
import { getContractTypeAll } from '../../../store/slice/contractTypeSlice';
import { getListDocuments } from '../../../store/slice/documentsSlice';
import { getGroupsList } from '../../../store/slice/groupsSlice';
import { addPackage, getPackageById, updatePackage, getByFilterPagedPackages } from '../../../store/slice/packageSlice';
import { getByFilterPagedEvents } from '../../../store/slice/eventsSlice';
import '../../../styles/settings/packages.scss';
import classes from '../../../styles/surveyManagement/addSurvey.module.scss';
import { reactQuillValidator } from '../../../utils/formRule';
import { removeFromArray, turkishToLower } from '../../../utils/utils';
import DateSection from '../../eventManagement/forms/DateSection';
import SelectModal from './SelectModal';

const OPERATION_TYPES = {
    ADD: 'add',
    EDIT: 'edit',
    COPY: 'copy',
};

const AddEditCopyPackages = () => {
    const { id } = useParams();
    const location = useLocation();

    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const history = useHistory();

    const cancelFileUpload = useRef(null);

    const [operationType] = useState(Object.values(OPERATION_TYPES).find((ot) => location.pathname.includes(ot)));
    const [currentPackage, setCurrentPackage] = useState();
    const [isErrorReactQuill, setIsErrorReactQuill] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [isFormSubmitDisable, setIsFormSubmitDisable] = useState(false);
    const [errorUpload, setErrorUpload] = useState();
    const [selectedClassrooms, setSelectedClassrooms] = useState([]);
    const [lessonsOptions, setLessonsOptions] = useState([]);
    const [currentClassroomIds, setCurrentClassroomIds] = useState([]);

    const { lessons } = useSelector((state) => state?.lessons);
    const token = useSelector((state) => state?.auth?.token);
    const { allClassList } = useSelector((state) => state?.classStages);
    const { allGroupList } = useSelector((state) => state?.groups);
    const { documentsList } = useSelector((state) => state?.documents);
    const { coachServiceList, testExamList, motivationActivityList } = useSelector((state) => state?.packages);
    const { motivationEventList } = useSelector((state) => state?.events);
    const { publisherList } = useSelector((state) => state?.publisher);
    const { contractTypeAllList } = useSelector((state) => state?.contractTypes);
    const { contractKindsByContractTypesList } = useSelector((state) => state?.contractKinds);

    const { setClassroomId, setLessonId } = useAcquisitionTree();
    const lessonIds = Form.useWatch('lesson', form) || [];
    const hasCoachService = Form.useWatch('hasCoachService', form) || false;
    const hasTryingTest = Form.useWatch('hasTryingTest', form) || false;
    const hasMotivationEvent = Form.useWatch('hasMotivationEvent', form) || false;

    useEffect(() => {
        if (allGroupList.length) return false;
        dispatch(getGroupsList());
    }, []);

    useEffect(() => {
        if (operationType !== OPERATION_TYPES.ADD) {
            loadPackageById();
        }
    }, []);

    useEffect(() => {
        if (contractTypeAllList.length > 0) return false;
        dispatch(getContractTypeAll());
    }, []);

    useEffect(() => {
        const checkedList = [];
        publisherList?.items?.forEach((item) => {
            checkedList.push(item.id);
        });
        form.setFieldsValue({ packagePublishers: checkedList });
    }, [publisherList]);

    useEffect(() => {
        if (documentsList.length) return false;
        dispatch(getListDocuments());
    }, []);

    useEffect(() => {
        if (publisherList?.length) return false;
        dispatch(getPublisherList({ params: { 'PublisherDetailSearch.PageSize': 1000 } }));
    }, []);

    useEffect(() => {
        const selectedLessonsOptions = selectedClassrooms?.map((item) => {
            return {
                label: item.name,
                options: lessons
                    .filter((i) => i.classroomId === item.id)
                    .map((a) => {
                        return {
                            label: a.name,
                            value: a.id,
                        };
                    }),
            };
        });

        setLessonsOptions(selectedLessonsOptions);
    }, [lessons, selectedClassrooms]);

    useEffect(() => {
        let selectedClass = allClassList?.filter((item) => currentClassroomIds?.includes(item.id));
        setSelectedClassrooms(selectedClass);
    }, [allClassList, currentClassroomIds]);

    useEffect(() => {
        if (!hasCoachService || coachServiceList?.length > 0) return;
        dispatch(getByFilterPagedPackages({ PageSize: 1000, PackageTypeEnumIds: PACKAGE_TYPES.CoachService }));
    }, [hasCoachService]);

    useEffect(() => {
        if (!hasTryingTest || testExamList?.length > 0) return;
        dispatch(getByFilterPagedPackages({ PageSize: 1000, PackageTypeEnumIds: PACKAGE_TYPES.TestExam }));
    }, [hasTryingTest]);

    useEffect(() => {
        if (!hasMotivationEvent) return;

        const packageType = form.getFieldValue('packagePackageTypeEnums');
        if (packageType !== PACKAGE_TYPES.MotivationEvent && motivationActivityList?.length <= 0) {
            dispatch(getByFilterPagedPackages({ PageSize: 1000, PackageTypeEnumIds: PACKAGE_TYPES.MotivationEvent }));
        }
        if (packageType === PACKAGE_TYPES.MotivationEvent && motivationEventList?.length <= 0) {
            dispatch(getByFilterPagedEvents({ PageSize: 1000, EventTypeCode: 'motivation' }));
        }
    }, [hasMotivationEvent, Form.useWatch('packagePackageTypeEnums', form)]);

    useEffect(() => {
        switch (form.getFieldValue('packagePackageTypeEnums')) {
            case PACKAGE_TYPES.CoachService:
                form.setFieldsValue({ coachServicePackages: [] });
                break;
            case PACKAGE_TYPES.TestExam:
                form.setFieldsValue({ testExamList: [] });
                break;
            // case PACKAGE_TYPES.MotivationEvent:
            //     form.setFieldsValue({ motivationActivityList: [] });
            //     break;
            default:
                break;
        }
    }, [Form.useWatch('packagePackageTypeEnums', form)]);

    const loadPackageById = async () => {
        const currentPackageResponse = await dispatch(getPackageById(id));
        setCurrentPackage(currentPackageResponse?.payload);
        const currentImageArray = [];
        currentPackageResponse?.payload?.imageOfPackages?.forEach((item) => {
            currentImageArray.push({
                name: item.file.fileName,
                fileId: item.fileId,
            });
        });

        let currentClassrooms = [
            ...new Set(currentPackageResponse?.payload?.packageLessons?.map((item) => item.lesson.classroom.id)),
        ];

        let currentGroupRole = [
            ...new Set(currentPackageResponse?.payload?.packageGroups?.map((item) => item.groupId)),
        ];
        let contractTypeId = [
            ...new Set(currentPackageResponse?.payload?.packageContractTypes?.map((item) => item.contractType.id)),
        ];

        dispatch(getContractKindsByContractTypes({ Ids: contractTypeId }));

        setCurrentClassroomIds(currentClassrooms);

        currentClassrooms.map((item) => {
            setClassroomId(item);
        });

        form.setFieldsValue({
            ...currentPackageResponse.payload,
            name: currentPackageResponse.payload.name + (operationType === OPERATION_TYPES.COPY ? ' Kopyası' : ''),
            startDate: dayjs(currentPackageResponse.payload.startDate),
            endDate: dayjs(currentPackageResponse.payload.finishDate),
            imageOfPackages: currentImageArray,
            packagePackageTypeEnums: currentPackageResponse.payload?.packagePackageTypeEnums?.map(
                (item) => item.packageTypeEnum,
            )[0],
            packageFieldTypes: currentPackageResponse.payload?.packageFieldTypes?.map((item) => item.fieldType)[0],
            packagePublishers: currentPackageResponse.payload?.packagePublishers?.map((item) => item.publisherId)[0],
            coachServicePackages: currentPackageResponse.payload?.hasCoachService
                ? currentPackageResponse.payload?.coachServicePackages?.map((item) => item.coachServicePackageId)
                : [],
            testExamPackages: currentPackageResponse.payload?.hasTryingTest
                ? currentPackageResponse.payload?.testExamPackages?.map((item) => item.testExamPackageId)
                : [],
            motivationActivityPackages: currentPackageResponse.payload?.hasMotivationEvent
                ? currentPackageResponse.payload?.motivationActivityPackages?.map(
                      (item) => item.motivationActivityPackageId,
                  )
                : [],
            packageEvents: currentPackageResponse.payload?.hasMotivationEvent
                ? currentPackageResponse.payload?.packageEvents?.map((item) => item.eventId)
                : [],
        });

        form.setFieldsValue({
            gradeLevel: currentClassrooms,
            lesson: currentPackageResponse.payload.packageLessons.map((item) => item.lesson.id),
            packageGroups: currentGroupRole,
            contractTypeId: contractTypeId,
            packageDocuments: currentPackageResponse.payload.packageDocuments.map((item) => item.document.id),
        });

        setIsDisable(currentImageArray.length >= 5);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const beforeUpload = async (file) => {
        setErrorUpload();
        const isImage = file.type.toLowerCase().includes('image');
        if (!isImage) {
            message.error(`${file.name} bir resim dosyası değil`);
            setErrorUpload('Lütfen resim uzantılı dosya yükletyin!');
            return Upload.LIST_IGNORE;
        }
        return false; //disable auto post
        //return isImage || Upload.LIST_IGNORE;
    };

    const handleCancelFileUpload = () => {
        if (cancelFileUpload.current) cancelFileUpload.current('User has canceled the file upload.');
    };

    const handleUpload = async (images) => {
        let imageListArray = [],
            imageFileIDList = [];
        for (let i = 0; i < images.length; i++) {
            if (images[i]?.fileId !== undefined) {
                imageFileIDList.push({ fileId: images[i].fileId });
                imageListArray.push(images[i]);
            } else {
                const fileData = images[i]?.originFileObj;
                const data = new FormData();
                data.append('File', fileData);
                data.append('FileType', 5);
                data.append('FileName', images[i]?.name);
                const options = {
                    cancelToken: new CancelToken((cancel) => (cancelFileUpload.current = cancel)),
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: `Bearer ${token}`,
                    },
                };
                setIsDisable(true);

                try {
                    const response = await fileServices.uploadFile(data, options);
                    imageListArray.push({
                        fileId: response.data.data.id,
                        ...images[i],
                    });
                    imageFileIDList.push({ fileId: response.data.data.id });
                } catch (error) {
                    if (isCancel(error)) {
                        setErrorUpload();
                        return;
                    }
                    setErrorUpload('Dosya yüklenemedi yeniden deneyiniz');
                }
            }
        }
        form.setFieldsValue({
            imageOfPackages: imageListArray,
        });
        return imageFileIDList;
    };

    const onFinish = async (values) => {
        setIsFormSubmitDisable(true);

        let lessonsArr = values?.lesson?.map((item) => {
            return { lessonId: item };
        });

        const packageGroups = [];
        values?.packageGroups?.forEach((item) => {
            packageGroups.push({
                groupId: item,
            });
        });

        const data = {
            package: {
                ...values,
                packagePackageTypeEnums: [{ packageTypeEnum: values.packagePackageTypeEnums }],
                packageFieldTypes: [{ fieldType: values.packageFieldTypes }],
                startDate: values.startDate.$d,
                finishDate: values.endDate.$d,
                packageLessons: lessonsArr,
                imageOfPackages: await handleUpload(values.imageOfPackages),
                examType: 10, //sınav tipi halihazırda inputtan alınmıyor
                packageGroups: packageGroups,
                packagePublishers: values.packagePublishers?.map((item) => ({ publisherId: item })),
                packageDocuments: values.packageDocuments?.map((item) => ({ documentId: item })),
                packageContractTypes: values.contractTypeId.map((item) => ({ contractTypeId: item })),
                coachServicePackages: values.coachServicePackages?.map((item) => ({ coachServicePackageId: item })),
                testExamPackages: values.testExamPackages?.map((item) => ({ testExamPackageId: item })),
                motivationActivityPackages:
                    values.packagePackageTypeEnums !== PACKAGE_TYPES.MotivationEvent
                        ? values.motivationActivityPackages?.map((item) => ({
                              motivationActivityPackageId: item,
                          }))
                        : [],
                packageEvents:
                    values.packagePackageTypeEnums === PACKAGE_TYPES.MotivationEvent
                        ? values.packageEvents?.map((item) => ({
                              eventId: item,
                          }))
                        : [],
            },
        };

        if (operationType === OPERATION_TYPES.EDIT) {
            data.package.id = id;
        }

        const serviceFunction = operationType === OPERATION_TYPES.EDIT ? updatePackage : addPackage;

        const action = await dispatch(serviceFunction(data));
        if (serviceFunction.fulfilled.match(action)) {
            if (
                values.packagePackageTypeEnums &&
                [PACKAGE_TYPES.CoachService, PACKAGE_TYPES.TestExam, PACKAGE_TYPES.MotivationEvent].includes(
                    values.packagePackageTypeEnums,
                )
            ) {
                dispatch(
                    getByFilterPagedPackages({ PageSize: 1000, PackageTypeEnumIds: values.packagePackageTypeEnums }),
                );
            }

            if (
                currentPackage?.packagePackageTypeEnums?.length > 0 &&
                currentPackage?.packagePackageTypeEnums[0].packageTypeEnum !== values.packagePackageTypeEnums &&
                [PACKAGE_TYPES.CoachService, PACKAGE_TYPES.TestExam, PACKAGE_TYPES.MotivationEvent].includes(
                    currentPackage?.packagePackageTypeEnums[0].packageTypeEnum,
                )
            ) {
                dispatch(
                    getByFilterPagedPackages({
                        PageSize: 1000,
                        PackageTypeEnumIds: currentPackage?.packagePackageTypeEnums[0].packageTypeEnum,
                    }),
                );
            }

            successDialog({
                title: <Text t="success" />,
                message: action?.payload.message,
                onOk: async () => {
                    history.push('/settings/packages');
                },
            });
        } else {
            errorDialog({
                title: <Text t="error" />,
                message: action?.payload.message,
            });
        }
        setIsDisable(false);
        setIsFormSubmitDisable(false);
    };

    const onCancel = () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'İptal etmek istediğinizden emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            onOk: async () => {
                history.push('/settings/packages');
            },
        });
    };

    const onClassroomChange = (value) => {
        setClassroomId(value.at(-1));
        let selectedClass = allClassList.filter((item) => value.includes(item.id));
        setSelectedClassrooms(selectedClass);
        if (!selectedClassrooms.some((i) => i.schoolLevel === 30)) {
            form.setFieldsValue({ packageFieldTypes: 0 });
        }
    };

    const onLessonChange = (value) => {
        setLessonId(value.at(-1));
    };

    const onClassroomsDeselect = (value) => {
        const findLessonsIds = lessons.filter((i) => i.classroomId === value).map((item) => item.id);
        form.setFieldsValue({
            lesson: removeFromArray(lessonIds, ...findLessonsIds),
        });
    };

    function getCoachServiceList() {
        return form.getFieldValue('packagePackageTypeEnums') !== PACKAGE_TYPES.CoachService
            ? coachServiceList.filter((i) => i.id?.toString() !== id?.toString())
            : [];
    }

    function getTestExamList() {
        return form.getFieldValue('packagePackageTypeEnums') !== PACKAGE_TYPES.TestExam
            ? testExamList.filter((i) => i.id?.toString() !== id?.toString())
            : [];
    }

    function getMotivationActivityList() {
        return form.getFieldValue('packagePackageTypeEnums') !== PACKAGE_TYPES.MotivationEvent
            ? motivationActivityList.filter((i) => i.id?.toString() !== id?.toString())
            : motivationEventList;
    }

    const formRules = [
        {
            required: true,
            message: 'Lütfen Zorunlu Alanları Doldurunuz.',
        },
    ];

    const TITLES = {
        [OPERATION_TYPES.ADD]: 'Yeni Paket Oluşturma',
        [OPERATION_TYPES.EDIT]: 'Paket Güncelleme',
        [OPERATION_TYPES.COPY]: 'Paket Kopyalama',
    };

    return (
        <CustomCollapseCard cardTitle={TITLES[operationType]}>
            <div className="add-packages-container">
                <CustomForm
                    name="packagesInfo"
                    className="addPackagesInfo-link-form"
                    form={form}
                    autoComplete="off"
                    layout={'horizontal'}
                    onFinish={onFinish}
                >
                    <CustomFormItem
                        label={<Text t="Paket Adı" />}
                        name="name"
                        rules={[
                            ...formRules,
                            { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                        ]}
                    >
                        <CustomInput placeholder={'Paket Adı'} />
                    </CustomFormItem>
                    <CustomFormItem
                        className={classes['ant-form-item']}
                        label={<Text t="Paket Tipi" />}
                        name="packageKind"
                        rules={formRules}
                    >
                        <CustomRadioGroup
                            className={classes.radioGroup}
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            {packageKind.map((radio, index) => (
                                <CustomRadio key={index} value={radio.value} className={classes.radio} checked={true}>
                                    {radio.label}
                                </CustomRadio>
                            ))}
                        </CustomRadioGroup>
                    </CustomFormItem>
                    <CustomFormItem label={<Text t="Paket Türü" />} name="packagePackageTypeEnums" rules={formRules}>
                        <CustomSelect className="form-filter-item" placeholder={'Seçiniz'}>
                            {packageTypes?.map((item) => {
                                return (
                                    <Option key={`packageTypeList-${item.value}`} value={item.value}>
                                        <Text t={item.label} />
                                    </Option>
                                );
                            })}
                        </CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem
                        label={<Text t="Paket Özeti" />}
                        name="summary"
                        rules={[
                            ...formRules,
                            { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                        ]}
                    >
                        <CustomInput placeholder={'Paket Özeti'} />
                    </CustomFormItem>

                    <CustomFormItem
                        className="editor"
                        label={<Text t="Paket İçeriği" />}
                        name="content"
                        rules={[
                            ...formRules,
                            {
                                validator: reactQuillValidator,
                                message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
                            },
                            {
                                type: 'string',
                                max: 2500,
                                message: 'Duyurunuz En fazla 2500 Karakter İçerebilir.',
                            },
                        ]}
                    >
                        <ReactQuill className={isErrorReactQuill ? 'quill-error' : ''} theme="snow" />
                    </CustomFormItem>

                    <CustomFormItem
                        label="Paket Görseli"
                        name="imageOfPackages"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen dosya seçiniz.',
                            },
                        ]}
                    >
                        <Upload
                            name="files"
                            maxCount={5}
                            multiple={true}
                            showUploadList={{
                                showRemoveIcon: true,
                                removeIcon: <DeleteOutlined onClick={(e) => handleCancelFileUpload()} />,
                            }}
                            beforeUpload={beforeUpload}
                            onChange={(e) => {
                                e.fileList.length >= 5 ? setIsDisable(true) : setIsDisable(false);
                            }}
                            accept="image/*"
                        >
                            <Button disabled={isDisable} icon={<UploadOutlined />}>
                                Upload
                            </Button>
                        </Upload>
                    </CustomFormItem>
                    {errorUpload && <div className="ant-form-item-explain-error">{errorUpload}</div>}

                    <div className="package-books-wrapper">
                        <CustomFormItem label={false} name="hasCoachService" valuePropName="checked">
                            <CustomCheckbox>
                                <Text t="Koçluk Hizmeti Vardır" />
                            </CustomCheckbox>
                        </CustomFormItem>

                        <CustomFormItem
                            noStyle
                            shouldUpdate={(prevValues, curValues) =>
                                prevValues.hasCoachService !== curValues.hasCoachService ||
                                prevValues.packagePackageTypeEnums !== curValues.packagePackageTypeEnums
                            }
                        >
                            {({ getFieldValue }) => (
                                <>
                                    <CustomFormItem
                                        label={false}
                                        rules={
                                            getFieldValue('hasCoachService') && getCoachServiceList().length > 0
                                                ? formRules
                                                : []
                                        }
                                    >
                                        <span>Pakete Dahil Olan Koçluk Hizmetleri </span>
                                        <SelectModal
                                            title="Koçluk Hizmeti Listesi"
                                            name="coachServicePackages"
                                            disabled={!getFieldValue('hasCoachService')}
                                            informationText={`Koçluk Hizmeti ${
                                                getCoachServiceList().length > 0 ? 'Vardır' : 'Yoktur'
                                            }`}
                                            selectOptionList={getCoachServiceList()}
                                        />
                                    </CustomFormItem>
                                </>
                            )}
                        </CustomFormItem>
                    </div>

                    <div className="has-trying-test-wrapper">
                        <CustomFormItem label={false} name="hasTryingTest" valuePropName="checked">
                            <CustomCheckbox>
                                <Text t="Paket İçinde Deneme Sınavı Vardır" />
                            </CustomCheckbox>
                        </CustomFormItem>

                        <CustomFormItem
                            noStyle
                            shouldUpdate={(prevValues, curValues) =>
                                prevValues.hasTryingTest !== curValues.hasTryingTest ||
                                prevValues.packagePackageTypeEnums !== curValues.packagePackageTypeEnums
                            }
                        >
                            {({ getFieldValue }) => (
                                <CustomFormItem
                                    label={false}
                                    rules={
                                        getFieldValue('hasTryingTest') && getTestExamList().length > 0 ? formRules : []
                                    }
                                >
                                    <span>Pakete Dahil Olan Deneme Sınavları </span>
                                    <SelectModal
                                        title="Deneme Sınavı Listesi"
                                        name="testExamPackages"
                                        disabled={!getFieldValue('hasTryingTest')}
                                        informationText={`Paketin İçinde Deneme Sınavı ${
                                            getTestExamList().length > 0 ? 'Vardır' : 'Yoktur'
                                        }`}
                                        selectOptionList={getTestExamList()}
                                    />
                                </CustomFormItem>
                            )}
                        </CustomFormItem>
                    </div>

                    <div className="has-trying-test-wrapper">
                        <CustomFormItem label={false} name="hasMotivationEvent" valuePropName="checked">
                            <CustomCheckbox>
                                <Text t="Motivasyon Etkinliklerine Paket Satın Alan Kullanıcıların Erişimi Vardır" />
                            </CustomCheckbox>
                        </CustomFormItem>

                        <CustomFormItem
                            noStyle
                            shouldUpdate={(prevValues, curValues) =>
                                prevValues.hasMotivationEvent !== curValues.hasMotivationEvent ||
                                prevValues.packagePackageTypeEnums !== curValues.packagePackageTypeEnums
                            }
                        >
                            {({ getFieldValue }) => (
                                <CustomFormItem
                                    label={false}
                                    rules={
                                        getFieldValue('hasMotivationEvent') && getMotivationActivityList().length > 0
                                            ? formRules
                                            : []
                                    }
                                >
                                    <span>Pakete Dahil Olan Motivasyon Etkinlikleri </span>
                                    <SelectModal
                                        title="Motivasyon Etkinlikleri Listesi"
                                        name={
                                            form.getFieldValue('packagePackageTypeEnums') !==
                                            PACKAGE_TYPES.MotivationEvent
                                                ? 'motivationActivityPackages'
                                                : 'packageEvents'
                                        }
                                        disabled={!getFieldValue('hasMotivationEvent')}
                                        informationText={`Paketin İçinde Motivasyon Etkinliği ${
                                            getMotivationActivityList().length > 0 ? 'Vardır' : 'Yoktur'
                                        }`}
                                        selectOptionList={getMotivationActivityList()}
                                    />
                                </CustomFormItem>
                            )}
                        </CustomFormItem>
                    </div>

                    <CustomFormItem label={<Text t="Yayınlar" />}>
                        <SelectModal
                            title="Yayın Evleri Listesi"
                            name="packagePublishers"
                            selectOptionList={publisherList?.items?.filter((i) => i.recordStatus === 1)}
                        />
                    </CustomFormItem>

                    <CustomFormItem label={<Text t="Durumu" />} name="isActive" rules={formRules}>
                        <CustomSelect className="form-filter-item" placeholder={'Seçiniz'}>
                            <Option key={'true'} value={true}>
                                <Text t={'Aktif'} />
                            </Option>{' '}
                            <Option key={false} value={false}>
                                <Text t={'Pasive'} />
                            </Option>
                        </CustomSelect>
                    </CustomFormItem>

                    <DateSection form={form} />

                    <CustomFormItem label={<Text t="Sınıf Seviyesi" />} name="gradeLevel" rules={formRules}>
                        <CustomSelect
                            className="form-filter-item"
                            placeholder={'Seçiniz'}
                            filterOption={(input, option) =>
                                turkishToLower(option.children).includes(turkishToLower(input))
                            }
                            showArrow
                            mode="multiple"
                            onDeselect={onClassroomsDeselect}
                            onChange={onClassroomChange}
                        >
                            {allClassList?.map((item) => {
                                return (
                                    <Option key={item?.id} value={item?.id}>
                                        {item?.name}
                                    </Option>
                                );
                            })}
                        </CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem label="Ders" name="lesson" rules={formRules}>
                        <CustomSelect
                            className="form-filter-item"
                            placeholder={'Seçiniz'}
                            filterOption={(input, option) =>
                                turkishToLower(option.children).includes(turkishToLower(input))
                            }
                            showArrow
                            mode="multiple"
                            onChange={onLessonChange}
                            options={lessonsOptions}
                        ></CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem
                        label={<Text t="Paket Alanı" />}
                        name="packageFieldTypes"
                        shouldUpdate={(prevValues, curValues) => prevValues.gradeLevel !== curValues.gradeLevel}
                        rules={selectedClassrooms.some((i) => i.schoolLevel === 30) ? formRules : []}
                    >
                        <CustomSelect
                            className="form-filter-item"
                            placeholder={'Seçiniz'}
                            disabled={!selectedClassrooms.some((i) => i.schoolLevel === 30)}
                        >
                            {packageFieldTypes?.map((item) => {
                                return (
                                    <Option key={`packageFieldTypes-${item.value}`} value={item.value}>
                                        <Text t={item.label} />
                                    </Option>
                                );
                            })}
                        </CustomSelect>
                    </CustomFormItem>
                    <CustomFormItem rules={[{ required: true }]} label="Rol" name="packageGroups">
                        <CustomSelect
                            filterOption={(input, option) =>
                                turkishToLower(option.children).includes(turkishToLower(input))
                            }
                            showArrow
                            mode="multiple"
                            placeholder="Rol"
                        >
                            {allGroupList
                                ?.filter((item) => item.isPackageRole)
                                ?.map((item) => {
                                    return (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.groupName}
                                        </Option>
                                    );
                                })}
                        </CustomSelect>
                    </CustomFormItem>
                    <CustomFormItem
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                            },
                        ]}
                        label="Sözleşme Tipi"
                        name="contractTypeId"
                    >
                        <CustomSelect
                            placeholder="Seçiniz"
                            mode="multiple"
                            showArrow
                            onChange={(values) => {
                                form.resetFields(['packageDocuments']);
                                dispatch(getContractKindsByContractTypes({ Ids: values }));
                            }}
                        >
                            {contractTypeAllList.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item?.name}
                                </Option>
                            ))}
                        </CustomSelect>
                    </CustomFormItem>
                    <CustomFormItem
                        rules={[{ required: true }]}
                        label="Paketi Satın Alan Kullanıcılara Onaylatılacak Evraklar"
                        name="packageDocuments"
                    >
                        <CustomSelect showArrow mode="multiple" placeholder="Seçiniz">
                            {contractKindsByContractTypesList?.map((item) => {
                                return (
                                    <Option key={item?.id} value={item?.id}>
                                        {item?.label}
                                    </Option>
                                );
                            })}
                        </CustomSelect>
                    </CustomFormItem>
                    <div className="add-package-footer">
                        <CustomButton type="primary" className="cancel-btn" onClick={onCancel}>
                            İptal
                        </CustomButton>
                        <CustomButton
                            type="primary"
                            className="save-btn"
                            loading={isFormSubmitDisable}
                            onClick={() => form.submit()}
                        >
                            {operationType === OPERATION_TYPES.EDIT ? 'Güncelle' : 'Kaydet'}
                        </CustomButton>
                    </div>
                </CustomForm>
            </div>
        </CustomCollapseCard>
    );
};

export default AddEditCopyPackages;
