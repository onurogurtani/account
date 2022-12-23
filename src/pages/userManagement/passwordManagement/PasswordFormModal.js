import { CustomModal } from "../../../components"


const PasswordFormModal = ({ modalVisible, handleModalVisible }) => {
    return(
        <CustomModal
        className="payment-modal"
        maskClosable={false}
        footer={false}
        title={'Şifre Yönetimi'}
        visible={modalVisible}
        // onCancel={handleClose}
        // closeIcon={<CustomImage src={modalClose} />}
        >
dsfsd
        </CustomModal>
    )
}

export default PasswordFormModal;