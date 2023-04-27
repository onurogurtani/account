import { CustomButton } from '../../../../../components';

const AddButton = ({ onClick }) => {
    const onClickHandler = async () => {
        onClick();
    };

    return <CustomButton onClick={() => onClickHandler()}>Bölüm Adı Ekle</CustomButton>;
};

export default AddButton;
