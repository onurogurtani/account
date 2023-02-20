import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { CustomCheckbox, CustomFormItem, CustomSelect, Option } from '../../../../components';
import '../../../../styles/temporaryFile/asEvGeneral.scss';

const CustomCheckedFormItem = ({ data, label, name }) => {
  const [componentDisabled, setComponentDisabled] = useState(false);

  return (
    <CustomFormItem label={label} name={name}>
      <Row gutter={16}>
        <Col xs={{ span: 4 }} sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 4 }}>
          <CustomCheckbox
            checked={componentDisabled}
            onChange={(e) => {
              setComponentDisabled(e.target.checked);
            }}
          />
        </Col>
        <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 20 }} lg={{ span: 20 }}>
          <CustomSelect disabled={!componentDisabled}>
            {data?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
          </CustomSelect>
        </Col>
      </Row>
    </CustomFormItem>
  );
};

export default CustomCheckedFormItem;
