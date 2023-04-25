import { Col, Form, Row } from 'antd';
import {
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomInputNumber,
    CustomSelect,
    Option,
    Text,
} from '../../../../../components';
import { examKinds } from '../../assets/constants';
import { validateNumber } from '../../assets/utils';
import ActiveRecordWarnInfo from '../atoms/ActiveRecordWarnInfo';

const SectionActionsForm = ({ form, actionType, styles, onSelectChange, formListVisible, activeDescriptionErr }) => {
    return (
        <CustomForm autoComplete="off" layout="horizontal" form={form} className={styles.descForm}>
            <CustomFormItem
                rules={[
                    {
                        required: true,
                        message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                    },
                ]}
                label="Sınav Türü"
                name="examKind"
                className={styles.selectContainer}
            >
                <CustomSelect
                    disabled={actionType !== 'add'}
                    placeholder={'Seçiniz'}
                    onChange={(value) => onSelectChange(value)}
                >
                    {examKinds?.map(({ id, description }, index) => (
                        <Option key={index} value={id}>
                            {description}
                        </Option>
                    ))}
                </CustomSelect>
            </CustomFormItem>
            {formListVisible && !activeDescriptionErr && (
                <Form.List name={'sectionDescriptionChapters'} className={styles.formListContainer}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => {
                                return (
                                    <Row gutter={16}>
                                        <Col span={fields.length > 1 ? 17 : 19}>
                                            <Form.Item
                                                {...restField}
                                                key={key}
                                                label={`${index + 1}`}
                                                validateTrigger={['onChange', 'onBlur']}
                                                name={[name, 'name']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
                                                    },
                                                ]}
                                            >
                                                <CustomInput
                                                    key={key}
                                                    placeholder="Bölüm adı giriniz..."
                                                    className=""
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={fields.length > 1 ? 5 : 5} style={{}}>
                                            <Form.Item
                                                label={'Katsayı'}
                                                validateTrigger={['onChange', 'onBlur']}
                                                name={[index, 'coefficient']}
                                                rules={[{ validator: validateNumber }]}
                                            >
                                                <CustomInputNumber step={0.1} min={0} max={100} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}>
                                            {fields.length > 1 ? (
                                                <CustomButton
                                                    className={styles.deleteButton}
                                                    onClick={() => remove(name)}
                                                >
                                                    Sil
                                                </CustomButton>
                                            ) : null}
                                        </Col>
                                    </Row>
                                );
                            })}
                            <Form.Item>
                                <div className={styles.formFooter}>
                                    <CustomButton
                                        onClick={() => {
                                            add();
                                        }}
                                    >
                                        Bölüm Ekle
                                    </CustomButton>
                                </div>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            )}
            {activeDescriptionErr && <ActiveRecordWarnInfo />}
        </CustomForm>
    );
};

export default SectionActionsForm;
