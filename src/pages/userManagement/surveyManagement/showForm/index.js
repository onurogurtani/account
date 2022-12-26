import { useEffect, useState } from 'react';
import {
  confirmDialog,
  CustomButton,
  CustomPageHeader,
  errorDialog,
  Text,
  successDialog,
} from '../../../../components';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import classes from '../../../../styles/surveyManagement/showForm.module.scss';
// import { columns, sortList } from './static';
import { useDispatch, useSelector } from 'react-redux';
// import iconSearchWhite from '../../../../assets/icons/icon-white-search.svg';
import {
  getFilteredPagedForms,
  getFormCategories,
  setShowFormObj,
  updateForm,
  deleteForm,
  copyForm
} from '../../../../store/slice/formsSlice';
import ShowFormTabs from './ShowFormTabs';
import { BulbFilled } from '@ant-design/icons';
const publishStatus = [
  { id: 1, value: 'Yayında' },
  { id: 2, value: 'Yayında değil' },
  { id: 3, value: 'Taslak' },
];

const ShowForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { showFormObj } = useSelector((state) => state?.forms);

  useEffect(() => {
    if (showFormObj.id==undefined || showFormObj.id==0) {
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
            message: 'Anket başarıyla silinmiştir',
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
        let data = {
          form: {
            ...showFormObj,
            publishStatus: 1,
          },
        };
        const action2 = await dispatch(updateForm(data));
        if (updateForm.fulfilled.match(action2)) {
          successDialog({
            title: <Text t="success" />,
            message: 'Anket başarıyla yayınlanmıştır',
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
        let data = {
          form: {
            ...showFormObj,
            publishStatus: 2,
          },
        };
        const action = await dispatch(updateForm(data));
        if (updateForm.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: 'Anket başarıyla yayından kaldırılmıştır',
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
  const archiveFormHandler = async () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Arşivlemek / Yayından Kaldırmak istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      // onOk: async () => {
      //   let id = currentAnnouncement.id;
      //   const action = await dispatch(setArchiveAnnouncements({ id }));
      //   if (setArchiveAnnouncements.fulfilled.match(action)) {
      //     history.push({
      //       pathname: '/user-management/announcement-management/show',
      //       state: { data: { ...currentAnnouncement, isActive: false, isPublished: false } },
      //     });
      //     setCurrentAnnouncement({ ...currentAnnouncement, isActive: false, isPublished: false });
      //     await dispatch(
      //       getByFilterPagedAnnouncements({
      //         ...filterObject,
      //         IsActive: false,
      //       }),
      //     );
      //     successDialog({
      //       title: <Text t="success" />,
      //       message: action.payload?.message,
      //     });
      //   } else {
      //     if (action?.payload?.message) {
      //       errorDialog({
      //         title: <Text t="error" />,
      //         message: action?.payload?.message,
      //       });
      //     }
      //   }
      // },
    });
  };
  const copyHandler = async () => {
    let data={formId:showFormObj.id}
    await dispatch(copyForm(data));
  };

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
        <CustomButton htmlType="submit" className={classes['edit-btn']} onClick={handleEdit}>
          Düzenle
        </CustomButton>
        {showFormObj.publishStatus != 1 && (
          <CustomButton type="primary" onClick={onDelete} danger>
            Sil
          </CustomButton>
        )}
        {showFormObj.publishStatus == 1 && (
          <CustomButton
            type="primary"
            htmlType="submit"
            className={classes['publish-btn']}
            onClick={unPublishFormHandler}
          >
            {'Yayından Kaldır'}
          </CustomButton>
        )}
        {showFormObj.publishStatus == 2 && (
          <CustomButton
            type="primary"
            htmlType="submit"
            className={classes['publish-btn']}
            onClick={publishFormHandler}
          >
            {'Yayınla'}
          </CustomButton>
        )}
        {/* {showFormObj.publishStatus == 3 && (
          <CustomButton
            type="primary"
            htmlType="submit"
            className={classes['publish-btn']}
            onClick={archiveFormHandler} //BURAYI DÜZENLE
          >
            {'Anketi Düzenleyerek Yayınlayın'}
          </CustomButton>
        )} */}
        <CustomButton htmlType="submit" className={classes['copy-btn']} onClick={copyHandler}>
          Kopyala
        </CustomButton>
      </div>
      <ShowFormTabs showData={showFormObj} />
      {/* <ShowAnnouncementTabs showData={currentAnnouncement} />
      <UpdateAnnouncementDate
        setCurrentAnnouncement={setCurrentAnnouncement}
        currentAnnouncement={currentAnnouncement}
        dateVisible={dateVisible}
        setDateVisible={setDateVisible}
      /> */}
    </>
  );
};

export default ShowForm;
