import { useState } from 'react';
import { CustomButton, CustomCheckbox, CustomFormItem, CustomModal } from '../../../components';

const SelectModal = ({ name, rules, title, disabled, informationText, selectOptionList }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <>
            <CustomButton height={36} onClick={() => setIsOpenModal(!isOpenModal)} disabled={disabled}>
                Seç
            </CustomButton>
            <CustomModal
                title={title}
                visible={isOpenModal}
                onOk={(val) => setIsOpenModal(false)}
                onCancel={() => {
                    setIsOpenModal(false);
                }}
                bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
                footer={null}
            >
                <CustomFormItem rules={rules} name={name}>
                    <CustomCheckbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
                        {informationText}
                        {selectOptionList?.map((item, i) => {
                            return (
                                <CustomCheckbox key={item.id} value={item.id}>
                                    {item.name}
                                </CustomCheckbox>
                            );
                        })}
                    </CustomCheckbox.Group>
                </CustomFormItem>
            </CustomModal>
        </>
    );
};

export default SelectModal;
