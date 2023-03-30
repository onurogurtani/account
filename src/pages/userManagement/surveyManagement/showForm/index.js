import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    confirmDialog,
    CustomButton,
    CustomPageHeader,
    errorDialog,
    successDialog,
    Text,
} from '../../../../components';
import { copyForm, deleteForm, setShowFormObj, updateForm } from '../../../../store/slice/formsSlice';
import classes from '../../../../styles/surveyManagement/showForm.module.scss';
import ShowFormTabs from './ShowFormTabs';

const ShowForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { showFormObj } = useSelector((state) => state?.forms);

    const editObj = async (value) => {
        let groupArr = [];
        showFormObj?.participantGroup?.id
            ?.split(',')
            ?.map((item) => Number(item))
            ?.map((item) => groupArr.push({ participantGroupId: item }));
        let data = { ...showFormObj };
        delete data.participantType;
        delete data.participantGroup;
        data.formParticipantGroups = groupArr;
        data.publishStatus = value;
        return data;
    };
    editObj();

    useEffect(() => {
        if (showFormObj.id == undefined || showFormObj.id == 0) {
            history.push('/user-management/survey-management');
        }
    }, [showFormObj]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [showFormObj]);
    const handleBack = () => {
        history.push('/user-management/survey-management');
        dispatch(setShowFormObj({}));
    };
    const handleEdit = () => {
        history.push({
            pathname: '/user-management/survey-management/add',
            state: { data: showFormObj },
        });
    };

    const onDelete = async () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'Silmek istediğinizden emin misiniz?',
            okText: <Text t="Evet" />,
            cancelText: 'Hayır',
            onOk: async () => {
                let data = {
                    ids: [showFormObj.id],
                };
                const action3 = await dispatch(deleteForm(data));
                if (deleteForm.fulfilled.match(action3)) {
                    successDialog({
                        title: <Text t="success" />,
                        message: action3?.payload?.message,
                    });
                    await dispatch(setShowFormObj({}));
                    history.push('/user-management/survey-management');
                } else {
                    if (action3?.payload?.message) {
                        errorDialog({
                            title: <Text t="error" />,
                            message: action3?.payload?.message,
                        });
                    }
                }
            },
        });
    };
    const publishFormHandler = async () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'Anketi yayınlamak istediğinize emin misiniz?',
            okText: <Text t="Evet" />,
            cancelText: 'Hayır',
            onOk: async () => {
                let body = await editObj(1);
                let data = {
                    form: {
                        ...body,
                    },
                };
                const action2 = await dispatch(updateForm(data));
                if (updateForm.fulfilled.match(action2)) {
                    successDialog({
                        title: <Text t="success" />,
                        message: action2?.payload?.message,
                    });
                    await dispatch(setShowFormObj({ ...showFormObj, publishStatus: 1 }));
                } else {
                    if (action2?.payload?.message) {
                        errorDialog({
                            title: <Text t="error" />,
                            message: action2?.payload?.message,
                        });
                    }
                }
            },
        });
    };
    const unPublishFormHandler = async () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'Anketi Yayından Kaldırmak İstediğinizden Emin Misiniz?',
            okText: <Text t="Evet" />,
            cancelText: 'Hayır',
            onOk: async () => {
                let body = await editObj(2);
                let data = {
                    form: {
                        ...body,
                    },
                };
                const action = await dispatch(updateForm(data));
                if (updateForm.fulfilled.match(action)) {
                    successDialog({
                        title: <Text t="success" />,
                        message: action?.payload?.message,
                    });
                    await dispatch(setShowFormObj({ ...showFormObj, publishStatus: 2 }));
                } else {
                    if (action?.payload?.message) {
                        errorDialog({
                            title: <Text t="error" />,
                            message: action?.payload?.message,
                        });
                    }
                }
            },
        });
    };
    const copyHandler = async () => {
        let data = { formId: showFormObj.id };
        await dispatch(copyForm(data));
    };

    console.log('index te showFormObj', showFormObj)

    return (
        <>
            <CustomPageHeader
                title={<Text t="Anket Görüntüleme" />}
                showBreadCrumb
                showHelpButton
                routes={['Kullanıcı Yönetimi', 'Anketler']}
            ></CustomPageHeader>
            <div className={classes['btn-group']}>
                <CustomButton type="primary" htmlType="submit" onClick={handleBack}>
                    Geri
                </CustomButton>
                {showFormObj.publishStatus !== 1 && (
                    <CustomButton htmlType="submit" className={classes['edit-btn']} onClick={handleEdit}>
                        Düzenle
                    </CustomButton>
                )}
                {showFormObj.publishStatus != 1 && (
                    <CustomButton type="primary" onClick={onDelete} danger>
                        Sil
                    </CustomButton>
                )}
                {showFormObj.publishStatus === 1 && (
                    <CustomButton
                        type="primary"
                        htmlType="submit"
                        className={classes['publish-btn']}
                        onClick={unPublishFormHandler}
                    >
                        {'Yayından Kaldır'}
                    </CustomButton>
                )}
                {showFormObj.publishStatus === 2 && (
                    <CustomButton
                        type="primary"
                        htmlType="submit"
                        className={classes['publish-btn']}
                        onClick={publishFormHandler}
                    >
                        {'Yayınla'}
                    </CustomButton>
                )}
                <CustomButton htmlType="submit" className={classes['copy-btn']} onClick={copyHandler}>
                    Kopyala
                </CustomButton>
            </div>
            <ShowFormTabs showData={showFormObj} />
        </>
    );
};

export default ShowForm;
