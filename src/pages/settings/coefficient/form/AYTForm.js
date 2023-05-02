import React from 'react';
import {
    CustomFormItem,
    CustomInputNumber,
    CustomSelect,
    CustomButton,
    Option,
    Text,
} from '../../../../components';
import { dummySections, AYTFormTemplate } from '../../../../constants/settings/coefficients';
import { replaceCommaWithDot } from '../../../../utils/utils';
import '../../../../styles/settings/coefficient.scss';

const AYTForm = () => {

    const renderSectionRow = (index) => {
        return (
            <div key={index} className="row-content">
                <CustomFormItem className="drop-down" name="sectionId" rules={[{ required: true }]}>
                    <CustomSelect allowClear showArrow placeholder="Bölüm adı seçiniz">
                        {dummySections?.map((section) => (
                            <Option key={section?.id} value={section?.id}>
                                {section?.value}
                            </Option>
                        ))}
                    </CustomSelect>
                </CustomFormItem>

                <CustomFormItem name="coefficient" rules={[{ required: true }, { type: 'number' }]}>
                    <div className="input-label-container">
                        <CustomInputNumber
                            className="input-container"
                            placeholder="Katsayı bilgisini giriniz"
                            min={0}
                            step={0.01}
                            precision={2}
                            parser={(value) => replaceCommaWithDot(value)}
                        />
                        <span className="row-content-item">
                            <Text t="Puan" />
                        </span>
                    </div>
                </CustomFormItem>

                <CustomButton className="delete-btn" type="primary">
                    <span>
                        <Text t="Sil" />
                    </span>
                </CustomButton>
            </div>
        );
    };

    const renderAYTFormTemplate = () => {
        return AYTFormTemplate.map((item) => {
            return (
                <div key={item?.id}>
                    <span className="row-title">
                        <Text t={item?.title} />
                    </span>
                    {[...Array(item?.rowCount)].map((_, index) => {
                        return renderSectionRow(index);
                    })}
                    <CustomButton className="section-add-button">Bölüm Ekle</CustomButton>
                </div>
            );
        });
    };

    return <div className="form-content">{renderAYTFormTemplate()}</div>;
};

export default AYTForm;
