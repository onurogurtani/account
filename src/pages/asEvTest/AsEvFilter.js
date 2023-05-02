import { Form } from 'antd';
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import iconSearchWhite from '../../assets/icons/icon-white-search.svg';
import { CustomButton, CustomForm, CustomFormItem, CustomImage, CustomSelect, CustomTextInput, Option, Text,CustomInput } from '../../components';
import { getFilterPagedAsEvs } from '../../store/slice/asEvSlice';
import { getAllClassStages } from '../../store/slice/classStageSlice';
import { getEducationYearList } from '../../store/slice/educationYearsSlice';
import '../../styles/tableFilter.scss';


const AsEvFilter = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const { allClassList } = useSelector((state) => state?.classStages);
    const { educationYearList} = useSelector((state) => state?.educationYears);
    const { asEvList } = useSelector((state) => state?.asEv);

    useEffect(() => {
        form.resetFields();
        dispatch(getAllClassStages());
        dispatch(getEducationYearList());
    }, [dispatch, form]);


    const handleFilter = async(values) => {
      await dispatch(getFilterPagedAsEvs(values))
    }


    return (
        <div className="table-filter">
            <CustomForm onFinish={handleFilter} className="filter-form" name="filterForm" autoComplete="off" layout={'vertical'} form={form}>
                <div className="form-item">
                    <CustomFormItem
                        label={
                            <div>
                                <Text t="Test Adı" />
                            </div>
                        }
                        name="KalturaVideoName"
                        className="filter-item"
                    >
                        <CustomInput
                            className="form-filter-item"
                            placeholder={'Seçiniz'}
                            style={{
                                width: '100%',
                            }}
                           
                        >
                          
                        </CustomInput>
                    </CustomFormItem>
                    <CustomFormItem
                        label={
                            <div>
                                <Text t="Sınavı Oluşturan Kişi" />
                            </div>
                        }
                        name="CreatedName"
                        className="filter-item"
                    >
                        <CustomTextInput
                            className="form-filter-item"
                            placeholder={'Seçiniz'}
                            style={{
                                width: '100%',
                            }}
                          
                        ></CustomTextInput>
                    </CustomFormItem>
                    <CustomFormItem
                        label={
                            <div>
                                <Text t="Sınıf Seviyesi" />
                            </div>
                        }
                        name="ClassroomId"
                        className="filter-item"
                    >
                        <CustomSelect
                            className="form-filter-item"
                            placeholder={'Seçiniz'}
                            style={{
                                width: '100%',
                            }}
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
                        label={
                            <div>
                                <Text t="Çalışma Planı Bağlı Mı?" />
                            </div>
                        }
                        name="IsWorkPlanAttached"
                        className="filter-item"
                    >
                        <CustomSelect
                            className="form-filter-item"
                            placeholder={'Seçiniz'}
                            style={{
                                width: '100%',
                            }}
                        >
                          <Option key={true}>Evet</Option>
                          <Option key={false}>Hayır</Option>
                        </CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem
                        label={
                            <div>
                                <Text t="Ders" />
                            </div>
                        }
                        name="LessonId"
                        className="filter-item"
                    >
                        <CustomSelect
                            className="form-filter-item"
                            placeholder={'Seçiniz'}
                            style={{
                                width: '100%',
                            }}
                        >
                              {asEvList?.map((item) => {
                                    return (
                                        <Option key={item?.lesson?.id} value={item?.lesson?.id}>
                                            {item?.lesson?.name}
                                        </Option>
                                    );
                                })}
                        </CustomSelect>
                    </CustomFormItem>
                    <CustomFormItem
                        label={
                            <div>
                                <Text t="Eğitim Öğretim Yılı" />
                            </div>
                        }
                        name="EducationYearId"
                        className="filter-item"
                    >
                        <CustomSelect
                            className="form-filter-item"
                            placeholder={'Seçiniz'}
                            style={{
                                width: '100%',
                            }}
                        >
                             {educationYearList?.items?.map((item) => {
                                    return (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.startYear}  -  {item.endYear}
                                        </Option>
                                    );
                                })}
                        </CustomSelect>
                    </CustomFormItem>
                </div>

                <div className="form-footer">
                    <div className="action-buttons">
                        <CustomButton data-testid="clear" className="clear-btn">
                            <Text t="Temizle" />
                        </CustomButton>
                        <CustomButton htmlType="submit" data-testid="search" className="search-btn">
                            <CustomImage className="icon-search" src={iconSearchWhite} /> <Text t="Ara" />
                        </CustomButton>
                    </div>
                </div>
            </CustomForm>
        </div>
    );
};

export default AsEvFilter;
