import { Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import {
    CustomCheckbox,
    CustomDatePicker,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomSelect,
    Option,
    Text,
} from '../../../../components';
import { getByFilterPagedAnnouncementTypes } from '../../../../store/slice/announcementSlice';
import { getByFilterPagedGroups } from '../../../../store/slice/groupsSlice';
import '../../../../styles/announcementManagement/addAnnouncementInfo.scss';
import { dateValidator, reactQuillValidator } from '../../../../utils/formRule';
import AddAnnouncementFooter from '../addAnnouncement/AddAnnouncementFooter';
import EditAnnouncementFooter from '../editAnnouncement/EditAnnouncementFooter';
import AnnouncementIcon from './AnnouncementIcon';

const announcementPublicationPlaces = [
    { id: 1, name: 'Anasayfa' },
    { id: 2, name: 'Tüm Duyurular Sayfası' },
    { id: 3, name: 'Bildirimler' },
    { id: 4, name: 'Pop-up' },
];

const AnnouncementInfoForm = ({
    setAnnouncementInfoData,
    history,
    initialValues,
    announcementInfoData,
    updated,
    setUpdated,
}) => {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const urlRef = useRef('');
    const nameRef = useRef('');
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [required, setRequired] = useState(false);
    useEffect(() => {}, [required]);

    const loadGroupsList = useCallback(async () => {
        let data = {
            pageSize: 10000,
        };
        await dispatch(getByFilterPagedGroups(data));
    }, [dispatch]);
    useEffect(() => {
        loadGroupsList();
    }, []);

    const { groupsList } = useSelector((state) => state?.groups);

    const [form] = Form.useForm();
    const { announcementTypes } = useSelector((state) => state?.announcement);

    const [quillValue] = useState('');
    const [fileImage, setFileImage] = useState(null);
    useEffect(() => {
        dispatch(getByFilterPagedAnnouncementTypes());
        if (initialValues) {
            const currentDate = dayjs().utc().format('YYYY-MM-DD-HH-mm');
            const startDate = dayjs(initialValues?.startDate).utc().format('YYYY-MM-DD-HH-mm');
            const endDate = dayjs(initialValues?.endDate).utc().format('YYYY-MM-DD-HH-mm');
            let idsOfRolesArr = [];
            for (let i = 0; i < initialValues.roles.length; i++) {
                idsOfRolesArr.push(initialValues.roles[i].id);
            }
            let initialData = {
                startDate: startDate >= currentDate ? dayjs(initialValues?.startDate) : undefined,
                endDate: endDate >= currentDate ? dayjs(initialValues?.endDate) : undefined,
                announcementPublicationPlaces: initialValues?.announcementPublicationPlaces,
                fileId: initialValues?.fileId,
                headText: initialValues.headText,
                announcementType: initialValues.announcementType.name,
                buttonName: initialValues?.buttonName,
                buttonUrl: initialValues?.buttonUrl,
                homePageContent: initialValues?.homePageContent,
                content: initialValues?.content,
                roles: idsOfRolesArr,
                isReadCheckbox: initialValues?.isReadCheckbox,
            };
            form.setFieldsValue({ ...initialData });
            setAnnouncementInfoData(initialValues.id);
            setFormData(form);
        }
    }, []);

    if (initialValues) {
        initialValues = {
            ...initialValues,
            endDate: dayjs(initialValues?.endDate),
            startDate: dayjs(initialValues?.startDate),
        };
    }
    const [isErrorReactQuill, setIsErrorReactQuill] = useState(false);
    const text = Form.useWatch('text', form);
    useEffect(() => {
        if (text === '<p><br></p>' || text === '') {
            setIsErrorReactQuill(true);
        } else {
            setIsErrorReactQuill(false);
        }
    }, [text]);

    const disabledStartDate = (startValue) => {
        const { endDate } = form?.getFieldsValue(['endDate']);
        return startValue?.startOf('day') > endDate?.startOf('day') || startValue < dayjs().startOf('day');
    };

    const disabledEndDate = (endValue) => {
        const { startDate } = form?.getFieldsValue(['startDate']);

        return endValue?.startOf('day') < startDate?.startOf('day') || endValue < dayjs().startOf('day');
    };
    const check = async () => {
        if (urlRef?.current?.input?.value != '' || nameRef?.current?.input?.value != '') {
            setRequired(true);
        } else {
            setRequired(false);
        }
    };
    const handleChange = async (value) => {
        setSelectedPlaces(value);
    };
    return (
        <CustomForm
            name="announcementInfo"
            className="addAnnouncementInfo-link-form"
            form={form}
            initialValues={initialValues ? initialValues : {}}
            autoComplete="off"
            layout={'horizontal'}
        >
            <CustomFormItem
                label={<Text t="Duyuru Tipi" />}
                name="announcementType"
                style={{ width: '100%' }}
                rules={[
                    { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                    { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                ]}
            >
                <CustomSelect className="form-filter-item" placeholder={'Seçiniz'} style={{ width: '100%' }}>
                    {announcementTypes?.map(({ id, name }) => (
                        <Option id={id} key={id} value={name}>
                            <Text t={name} />
                        </Option>
                    ))}
                </CustomSelect>
            </CustomFormItem>
            <CustomFormItem
                label={<Text t="Başlık" />}
                name="headText"
                rules={[
                    { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                    { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                ]}
            >
                <CustomInput placeholder={'Başlık'} />
            </CustomFormItem>
            <CustomFormItem
                className="editor"
                label={<Text t="İçerik" />}
                name="content"
                value={quillValue}
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
                label={<Text t="Duyuru Anasayfa Metni" />}
                name="homePageContent"
                placeholder={
                    'Bu alana girilen veri anasayfa, tüm duyurular sayfası ve pop-uplarda gösterilecek özet bilgi metnidir.'
                }
                rules={[
                    { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                    { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                ]}
            >
                <CustomInput placeholder={'Yeni duyurunuz ile ilgili özet metin'} />
            </CustomFormItem>
            <AnnouncementIcon
                initialValues={initialValues}
                announcementInfoData={announcementInfoData}
                setFormData={setFormData}
                updated={updated}
                setUpdated={setUpdated}
                fileImage={fileImage}
                setFileImage={setFileImage}
            />

            <div className="url-buttonName-Container ">
                <CustomFormItem
                    label={<Text t="Duyuru Detay Sayfasında Görünecek Buton Adı" />}
                    name="buttonName"
                    rules={[
                        {
                            required: required,
                            message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
                        },
                    ]}
                    onChange={() => {
                        check();
                    }}
                >
                    <CustomInput ref={nameRef} placeholder={'Buton İsmi'} />
                </CustomFormItem>

                <CustomFormItem
                    label={
                        <div>
                            <Text t="Duyuru Detay Sayfasındaki Butonun Yönlendireceği Link" />
                        </div>
                    }
                    name="buttonUrl"
                    rules={[
                        {
                            required: required,
                            message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
                        },
                        {
                            type: 'url',
                            message: 'Lütfen geçerli bir URL giriniz',
                        },
                    ]}
                    onChange={() => {
                        check();
                    }}
                >
                    <CustomInput ref={urlRef} placeholder={'https://ButonUrl.com'} />
                </CustomFormItem>
            </div>
            <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
                    <CustomFormItem
                        label={<Text t="Başlangıç Tarihi" />}
                        name="startDate"
                        rules={[
                            { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },

                            {
                                validator: dateValidator,
                                message: <Text t="Girilen tarihleri kontrol ediniz" />,
                            },
                        ]}
                    >
                        <CustomDatePicker
                            placeholder={'Tarih Seçiniz'}
                            disabledDate={disabledStartDate}
                            format="YYYY-MM-DD HH:mm"
                            showTime={true}
                        />
                    </CustomFormItem>
                </Col>
            </Row>
            <p style={{ color: 'red', marginTop: '5px', marginLeft: '200px' }}>
                Başlangıç Tarihi Duyurunun, Arayüzünden görüntüleneceği tarihi belirlemenizi sağlar.
            </p>
            <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
                    <CustomFormItem
                        label={<Text t="Bitiş Tarihi" />}
                        name="endDate"
                        rules={[
                            { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                            {
                                validator: dateValidator,
                                message: <Text t="Girilen tarihleri kontrol ediniz" />,
                            },
                        ]}
                    >
                        <CustomDatePicker
                            placeholder={'Tarih Seçiniz'}
                            disabledDate={disabledEndDate}
                            format="YYYY-MM-DD HH:mm"
                            hideDisabledOptions
                            showTime={true}
                        />
                    </CustomFormItem>
                </Col>
            </Row>
            <p style={{ color: 'red', marginTop: '5px', marginLeft: '200px' }}>
                Bitiş Tarihi Duyurunun, Arayüzünden kaldırılacağı tarihi belirlemenizi sağlar.
            </p>
            <CustomFormItem
                rules={[
                    {
                        required: true,
                        message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                    },
                ]}
                label="Duyuru Rolleri"
                name="roles"
            >
                <CustomSelect
                    placeholder="Seçiniz"
                    mode="multiple"
                    showArrow
                    style={{
                        width: '100%',
                    }}
                >
                    {groupsList?.map((item, i) => {
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
                label="Yayınlanma Yeri"
                name="announcementPublicationPlaces"
            >
                <CustomSelect
                    placeholder="Seçiniz"
                    mode="multiple"
                    showArrow
                    onChange={handleChange}
                    style={{
                        width: '100%',
                    }}
                >
                    {announcementPublicationPlaces.map((item, i) => {
                        return (
                            <Option key={item?.id} value={item?.id}>
                                {item?.name}
                            </Option>
                        );
                    })}
                </CustomSelect>
            </CustomFormItem>
            {(selectedPlaces?.includes(4) || initialValues?.announcementPublicationPlaces?.includes(4)) && (
                <CustomFormItem
                    name="isReadCheckbox"
                    className="custom-form-item"
                    valuePropName="checked"
                    style={{ marginLeft: '200px' }}
                >
                    <CustomCheckbox value="true">
                        <p style={{ fontSize: '16px', fontWeight: '500' }}>Okundu onayı alınsın</p>
                    </CustomCheckbox>
                </CustomFormItem>
            )}
            {!initialValues ? (
                <AddAnnouncementFooter form={form} history={history} fileImage={fileImage} />
            ) : (
                <EditAnnouncementFooter
                    initialValues={initialValues}
                    form={form}
                    history={history}
                    announcementInfoData={announcementInfoData}
                    currentId={initialValues.id}
                    updated={updated}
                    setUpdated={setUpdated}
                    fileImage={fileImage}
                />
            )}
        </CustomForm>
    );
};

export default AnnouncementInfoForm;
