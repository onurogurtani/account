import React from 'react';
import {
    CustomFormItem,
    CustomInputNumber,
    CustomSelect,
    CustomButton,
    Option,
    Text,
} from '../../../components';
import { dummySections } from '../../../constants/settings/coefficients';
import { replaceCommaWithDot } from '../../../utils/utils';
import '../../../styles/settings/coefficient.scss';

const FormSection = ({ title, rowCount }) => {
    return (
        <div>
            <span className="row-sub-title">
                <Text t={title} />
            </span>
            {Array.from({ length: rowCount }, (_, index) => (
                <div key={index} className="row-content">
                    <CustomFormItem
                        className="drop-down"
                        name="sectionId"
                        rules={[{ required: true }]}
                    >
                        <CustomSelect allowClear showArrow placeholder="Bölüm adı seçiniz">
                            {dummySections?.map((section) => (
                                <Option key={section?.id} value={section?.id}>
                                    {section?.value}
                                </Option>
                            ))}
                        </CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem
                        name="coefficient"
                        rules={[{ required: true }, { type: "number" }]}
                    >
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
            ))}
            <CustomButton className="section-add-button">Bölüm Ekle</CustomButton>
        </div>
    );
};

export default FormSection;
