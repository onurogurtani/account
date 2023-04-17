import { Form, Rate } from 'antd';
import React from 'react';
import { CustomForm, CustomFormItem, Text } from '../../../components';
import '../../../styles/temporaryFile/asEvQuestionFilter.scss';
import { useSelector } from 'react-redux';

const AsEvTestPreviewInfoBar = () => {
    const [form] = Form.useForm();

    const { asEvTestPreview } = useSelector((state) => state?.asEv);

    // if(!asEvTestPreview?.items) {
    //     return false
    // }

    return (
        <div className="table-filter">
            <CustomForm name="filterForm" className="filter-form" autoComplete="off" layout="horizontal" form={form}>
                <div className="form-item">
                    <CustomFormItem name={'classroomId'} label={<Text t="Ders:" />}>
                        {asEvTestPreview?.items[0]?.asEvTestPreviewDetail?.lessonName}
                    </CustomFormItem>
                    <CustomFormItem name={'lessonUnitId'} label={<Text t="Ünite:" />}>
                        {asEvTestPreview?.items[0]?.asEvTestPreviewDetail?.lessonUnitName}
                    </CustomFormItem>
                    <CustomFormItem name={'questionCount'} label={<Text t="Soru Sayısı:" />}>
                        {asEvTestPreview?.items[0]?.asEvTestPreviewDetail?.questionCount}
                    </CustomFormItem>
                    <CustomFormItem name={'difficulty1'} label={<Text t="Ortalama Zorluk Seviyesi :" />}>
                        <Rate defaultValue={3} />
                    </CustomFormItem>
                </div>
            </CustomForm>
        </div>
    );
};

export default AsEvTestPreviewInfoBar;
