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
    CustomModal,
    CustomRadio,
    CustomRadioGroup,
    CustomSelect,
    errorDialog,
    Option,
    successDialog,
    Text,
} from '../../../components';
import { packageKind } from '../../../constants/package';
import useAcquisitionTree from '../../../hooks/useAcquisitionTree';
import fileServices from '../../../services/file.services';
import { getByFilterPagedBooks } from '../../../store/slice/booksSlice';
import { getContractKindsByContractTypes } from '../../../store/slice/contractKindsSlice';
import { getContractTypeAll } from '../../../store/slice/contractTypeSlice';
import { getListDocuments } from '../../../store/slice/documentsSlice';
import { getGroupsList } from '../../../store/slice/groupsSlice';
import { addPackage, getPackageById, updatePackage } from '../../../store/slice/packageSlice';
import { getPackageTypeList } from '../../../store/slice/packageTypeSlice';
import '../../../styles/settings/packages.scss';
import classes from '../../../styles/surveyManagement/addSurvey.module.scss';
import { reactQuillValidator } from '../../../utils/formRule';
import { removeFromArray, turkishToLower } from '../../../utils/utils';
import DateSection from '../../eventManagement/forms/DateSection';

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
    const [isErrorReactQuill, setIsErrorReactQuill] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [isFormSubmitDisable, setIsFormSubmitDisable] = useState(false);
    const [errorUpload, setErrorUpload] = useState();
    const [selectedClassrooms, setSelectedClassrooms] = useState([]);
    const [lessonsOptions, setLessonsOptions] = useState([]);
    const [currentClassroomIds, setCurrentClassroomIds] = useState([]);
    const [isDisableButtonMaxNetCount, seTisDisableButtonMaxNetCount] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const { lessons } = useSelector((state) => state?.lessons);
    const token = useSelector((state) => state?.auth?.token);
    const { packageTypeList } = useSelector((state) => state?.packageType);
    const { allClassList } = useSelector((state) => state?.classStages);
    const { allGroupList } = useSelector((state) => state?.groups);
    const { documentsList } = useSelector((state) => state?.documents);
    const { booksList } = useSelector((state) => state?.books);
    const { selectedPackages } = useSelector((state) => state?.packages);
    const { contractTypeAllList } = useSelector((state) => state?.contractTypes);
    const { contractKindsByContractTypesList } = useSelector((state) => state?.contractKinds);

    const { setClassroomId, setLessonId } = useAcquisitionTree();
    const lessonIds = Form.useWatch('lesson', form) || [];

    useEffect(() => {
        if (allGroupList.length) return false;
        dispatch(getGroupsList());
    }, []);

    useEffect(() => {
        if (operationType !== OPERATION_TYPES.ADD) {
            loadPackageById();
        }
        loadPackageList();
    }, []);

    useEffect(() => {
        if (contractTypeAllList.length > 0) return false;
        dispatch(getContractTypeAll());
    }, []);

    useEffect(() => {
        const checkedList = [];
        booksList?.forEach((item) => {
            checkedList.push(item.id);
        });
        form.setFieldsValue({ packageBooks: checkedList });
    }, [booksList]);

    useEffect(() => {
        if (documentsList.length) return false;
        dispatch(getListDocuments());
    }, []);

    useEffect(() => {
        if (booksList?.length) return false;
        dispatch(getByFilterPagedBooks());
    }, []);

    useEffect(async () => {
        const checkedList = [];
        booksList?.forEach((item) => {
            if (selectedPackages?.packageBooks?.find((elmt) => elmt?.bookId === item?.id)) checkedList.push(item.id);
        });
        form.setFieldsValue({ packageBooks: checkedList });
    }, [booksList]);

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

    const loadPackageById = async () => {
        const currentPackageResponse = await dispatch(getPackageById(id));

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

        seTisDisableButtonMaxNetCount(currentPackageResponse.payload.packageType.isCanSeeTargetScreen);
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
        });

        form.setFieldsValue({
            gradeLevel: currentClassrooms,
            lesson: currentPackageResponse.payload.packageLessons.map((item) => item.lesson.id),
            packageGroups: currentGroupRole,
            hasMotivationEvent: currentPackageResponse.payload.hasMotivationEvent,
            hasTryingTest: currentPackageResponse.payload.hasTryingTest,
            packageKind: currentPackageResponse.payload.packageKind,
            contractTypeId: contractTypeId,
            packageDocuments: currentPackageResponse.payload.packageDocuments.map((item) => item.document.id),
        });

        setIsDisable(currentImageArray.length >= 5);
    };

    const loadPackageList = async () => {
        dispatch(getPackageTypeList());
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const beforeUpload = async (file) => {
        const isImage = file.type.toLowerCase().includes('image');
        if (!isImage) {
            message.error(`${file.name} bir resim dosyası değil`);
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
                name: values.name,
                summary: values.summary,
                content: values.content,
                maxNetCount: Number(values.maxNetCount),
                packageTypeId: values.packageTypeId,
                isActive: values.isActive,
                startDate: values.startDate.$d,
                finishDate: values.endDate.$d,
                packageLessons: lessonsArr,
                imageOfPackages: await handleUpload(values.imageOfPackages),
                examType: 10, //sınav tipi halihazırda inputtan alınmıyor
                packageGroups: packageGroups,
                hasCoachService: values.hasCoachService,
                hasTryingTest: values.hasTryingTest,
                tryingTestQuestionCount: Number(values?.tryingTestQuestionCount),
                hasMotivationEvent: values.hasMotivationEvent,
                packageBooks: values.packageBooks?.map((item) => {
                    return { bookId: item };
                }),
                packageDocuments: values.packageDocuments?.map((item) => {
                    return { documentId: item };
                }),
                packageKind: values.packageKind,
                contractTypeId: values.contractTypeId,
                packageContractTypes: values.contractTypeId.map((item) => ({ contractTypeId: item })),
            },
        };

        if (operationType === OPERATION_TYPES.EDIT) {
            data.package.id = id;
        }

        const serviceFunction = operationType === OPERATION_TYPES.EDIT ? updatePackage : addPackage;

        const action = await dispatch(serviceFunction(data));

        if (serviceFunction.fulfilled.match(action)) {
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
    };

    const onLessonChange = (value) => {
        setLessonId(value.at(-1));
    };

    const onPackageTypeChange = (value) => {
        packageTypeList.forEach((item) => {
            if (item.id === value) seTisDisableButtonMaxNetCount(item.isCanSeeTargetScreen ? true : false);
        });
    };

    const onClassroomsDeselect = (value) => {
        const findLessonsIds = lessons.filter((i) => i.classroomId === value).map((item) => item.id);
        form.setFieldsValue({
            lesson: removeFromArray(lessonIds, ...findLessonsIds),
        });
    };

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
                            { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                            { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                        ]}
                    >
                        <CustomInput placeholder={'Paket Adı'} />
                    </CustomFormItem>
                    <CustomFormItem
                        className={classes['ant-form-item']}
                        label={<Text t="Paket Tipi" />}
                        name="packageKind"
                        rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
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

                    <CustomFormItem
                        label={<Text t="Paket Özeti" />}
                        name="summary"
                        rules={[
                            { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
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
                            { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
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

                    <CustomFormItem label={false} name="hasCoachService" valuePropName="checked">
                        <CustomCheckbox>
                            <Text t="Koçluk Hizmeti Vardır" />
                        </CustomCheckbox>
                    </CustomFormItem>

                    <div className="has-trying-test-wrapper">
                        <CustomFormItem label={false} name="hasTryingTest" valuePropName="checked">
                            <CustomCheckbox>
                                <Text t="Paket İçinde Deneme Sınavı Vardır" />
                            </CustomCheckbox>
                        </CustomFormItem>

                        <CustomFormItem
                            label={false}
                            noStyle
                            shouldUpdate={(prevValues, curValues) =>
                                prevValues.hasTryingTest !== curValues.hasTryingTest
                            }
                        >
                            {({ getFieldValue }) => (
                                <CustomFormItem label={false} name="tryingTestQuestionCount">
                                    <CustomInput
                                        type={'number'}
                                        className="has-tryin-test-count"
                                        placeholder={'Deneme sınavı adedini giriniz'}
                                        disabled={!getFieldValue('hasTryingTest')}
                                    />
                                </CustomFormItem>
                            )}
                        </CustomFormItem>
                    </div>

                    <CustomFormItem label={false} name="hasMotivationEvent" valuePropName="checked">
                        <CustomCheckbox>
                            <Text t="Motivasyon Etkinliklerine Paket Satın Alan Kullanıcıların Erişimi Vardır" />
                        </CustomCheckbox>
                    </CustomFormItem>

                    <div className="package-books-wrapper">
                        <CustomFormItem label={false} name="packageBooksOpen" valuePropName="checked">
                            <CustomCheckbox>
                                <Text t="Soru Bankası Yayınından Çıkar" />
                            </CustomCheckbox>
                        </CustomFormItem>

                        <CustomFormItem
                            noStyle
                            shouldUpdate={(prevValues, curValues) =>
                                prevValues.packageBooksOpen !== curValues.packageBooksOpen
                            }
                        >
                            {({ getFieldValue }) => (
                                <CustomFormItem label={false}>
                                    <span>Yayınlar </span>
                                    <CustomButton
                                        height={36}
                                        onClick={() => setIsOpenModal(!isOpenModal)}
                                        disabled={!getFieldValue('packageBooksOpen')}
                                    >
                                        Seç
                                    </CustomButton>
                                </CustomFormItem>
                            )}
                        </CustomFormItem>
                    </div>

                    <CustomFormItem
                        label={<Text t="Durumu" />}
                        name="isActive"
                        rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
                    >
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

                    <CustomFormItem
                        label={<Text t="Sınıf Seviyesi" />}
                        name="gradeLevel"
                        rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
                    >
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

                    <CustomFormItem
                        label="Ders"
                        name="lesson"
                        rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
                    >
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
                        label={<Text t="Paket Türü" />}
                        name="packageTypeId"
                        rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
                    >
                        <CustomSelect
                            className="form-filter-item"
                            placeholder={'Seçiniz'}
                            onChange={onPackageTypeChange}
                        >
                            {packageTypeList?.map((item) => {
                                return (
                                    <Option key={`packageTypeList-${item.id}`} value={item.id}>
                                        <Text t={item.name} />
                                    </Option>
                                );
                            })}
                        </CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem label={<Text t="Max. Net Sayısı" />} name="maxNetCount">
                        <CustomInput
                            type={'number'}
                            placeholder={'Max. Net Sayısı'}
                            className="max-net-count"
                            disabled={!isDisableButtonMaxNetCount}
                        />
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
                    <CustomModal
                        title="Yayın Evleri Listesi"
                        visible={isOpenModal}
                        onOk={(val) => setIsOpenModal(false)}
                        okText="Kaydet"
                        cancelText="Vazgeç"
                        onCancel={() => {
                            setIsOpenModal(false);
                        }}
                        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
                    >
                        <CustomFormItem
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                                },
                            ]}
                            name="packageBooks"
                        >
                            <CustomCheckbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
                                {booksList?.map((item, i) => {
                                    return (
                                        <CustomCheckbox key={item.id} value={item.id}>
                                            {item.name}
                                        </CustomCheckbox>
                                    );
                                })}
                            </CustomCheckbox.Group>
                        </CustomFormItem>
                    </CustomModal>

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
