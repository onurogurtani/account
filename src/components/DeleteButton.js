import { useDispatch } from 'react-redux';
import CustomButton from './CustomButton';
import { confirmDialog, errorDialog } from './CustomDialog';

const DeleteButton = ({ id, deleteAction, disabled= false }) => {
  const dispatch = useDispatch();
  const onDelete = (id) => {
    confirmDialog({
      title: 'Dikkat',
      message: 'Seçtiğiniz kaydı silmek istediğinize emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {
        const action = await dispatch(deleteAction({ id }));
        if (!deleteAction.fulfilled.match(action)) {
          if (action?.payload?.message) {
            errorDialog({
              title: 'Hata',
              message: action?.payload?.message,
            });
          }
        }
      },
    });
  };

  return (
    <CustomButton disabled={disabled} className="btn delete-btn" onClick={() => onDelete(id)}>
      SİL
    </CustomButton>
  );
};

export default DeleteButton;
