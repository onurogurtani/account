import { Col, Row } from 'antd';
import React from 'react';
import {
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomPageHeader,
  CustomSelect,
  Text,
} from '../../../components';
import '../../../styles/questionManagement/questionIdentification.scss';
const QuestionIdentification = () => {
  return (
    <CustomPageHeader>
      <CustomCollapseCard cardTitle={'Soru Kimliklendirme'}>
        <div className="questionIdentification">
          <div className="questionIdentificationMain">
            <div className="questionIdentificationMainLeft">
              <CustomForm layout="vertical">
                <CustomFormItem label="Dönem" name="">
                  <CustomSelect />
                </CustomFormItem>
                <CustomFormItem label="Sınıf Seviyesi" name="">
                  <CustomSelect />
                </CustomFormItem>
                <CustomFormItem label="Yayın Adı" name="">
                  <CustomSelect />
                </CustomFormItem>
                <CustomFormItem label="Kitap Adı" name="">
                  <CustomSelect />
                </CustomFormItem>
                <CustomFormItem label="Ders Adı" name="">
                  <CustomSelect />
                </CustomFormItem>
                <CustomFormItem>
                  <CustomButton className="findButton" type="primary" htmlType="submit">
                    <span>
                      <Text t="Getir" />
                    </span>
                  </CustomButton>
                </CustomFormItem>
              </CustomForm>
            </div>
            <div className="questionIdentificationMainRight">
              <div>
                <CustomForm layout="vertical">
                  <Row gutter={16}>
                    <Col span={5}>
                      <CustomFormItem label="Zorluk Derecesi ">
                        <CustomSelect />
                      </CustomFormItem>
                    </Col>
                    <Col span={8}>
                      <CustomFormItem label="Kazanım Eşleşme Durumu">
                        <CustomSelect />
                      </CustomFormItem>
                    </Col>
                    <Col span={6}>
                      <CustomFormItem label="Soru Hata Durumu">
                        <CustomSelect />
                      </CustomFormItem>
                    </Col>
                    <Col span={5}>
                      <CustomFormItem label="Soru Türü">
                        <CustomSelect />
                      </CustomFormItem>
                    </Col>
                  </Row>
                </CustomForm>
              </div>

              <Row gutter={16}>
                <Col span={12}>
                  <div className="quesiton-images">asdasdsa</div>
                </Col>
                <Col pan={12}></Col>
              </Row>
            </div>
          </div>
        </div>
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default QuestionIdentification;
