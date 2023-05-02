import React from 'react';
import {
    CustomFormItem,
    CustomNumberInput,
    CustomInputNumber,
    CustomSelect,
    CustomButton,
    Option,
    Text,
} from '../../../../components';
import { dummySections, defaultRowCount } from '../../../../constants/settings/coefficients';
import { replaceCommaWithDot } from '../../../../utils/utils';
import '../../../../styles/settings/coefficient.scss';

const LGSForm = ({ type }) => {

    const renderSectionRow = (_, index) => {
        return (
            <div key={index} className="row-content">
                <CustomFormItem className="drop-down" name="sectionId" rules={[{ required: true }]}>
                    <CustomSelect allowClear showArrow placeholder="Bölüm adı seçiniz">
                        {dummySections?.map((item) => (
                            <Option key={item?.id} value={item?.id}>
                                {item?.value}
                            </Option>
                        ))}
                    </CustomSelect>
                </CustomFormItem>

                <CustomFormItem name="coefficient" rules={[{ required: true }]}>
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
                    <Text t="Sil" />
                </CustomButton>
            </div>
        );
    };

    const renderSectionRows = () => Array.from({ length: defaultRowCount[type] }, renderSectionRow);

    return (
        <div className="form-content">
            <CustomFormItem
                label="MEB Taban Puan"
                name="mebBasePoint"
                rules={[
                    { required: true },
                    { type: 'number' },
                ]}
            >
                <CustomNumberInput className="input-container" placeholder="MEB Taban Puan" />
            </CustomFormItem>
            {renderSectionRows()}
            <CustomButton className="section-add-button">
                <Text t="Bölüm Ekle" />
            </CustomButton>
        </div>
    );
};

export default LGSForm;
