import { Tabs, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { CustomCollapseCard, Text, confirmDialog } from '../../../../components';
import { getAllClassStages } from '../../../../store/slice/classStageSlice';
import { useDispatch, useSelector } from 'react-redux';
import classes from '../../../../styles/surveyManagement/showForm.module.scss';
import { getFormCategories, getFormPackages, getAllQuestionsOfForm } from '../../../../store/slice/formsSlice';
import PreviewList from '../addForm/questionComponents/PreviewList';

const { TabPane } = Tabs;

const ShowFormTabs = ({ showData }) => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(true);
  const { formCategories, formPackages, questionsOfForm } = useSelector((state) => state?.forms);
  useEffect(() => {
    if (!formPackages) {
      dispatch(getFormPackages());
    }
  }, [formPackages]);
  useEffect(() => {
    if (showData) {
      dispatch(getAllQuestionsOfForm({ formId: showData.id }));
    }
  }, [showData]);

  useEffect(() => {
    dispatch(getAllClassStages());
    dispatch(getFormCategories());
    dispatch(getFormPackages());
  }, []);
  const { allClassList } = useSelector((state) => state?.classStages);
  const handleClose = async () => {
    confirmDialog({
      title: <Text t="Bilgilendirme Mesajı" />,
      message: 'Kullanıcı anketi bitirdiğinde sorulara verdiği cevaplar kontrol edilecek, eğer anket bitirme koşulunu sağlamışsa cevaplar değerlendirilmek üzere kaydedilecektir.',
      okText: <Text t="Tamam" />,
      cancelText: <Text t="" />,
    });
  };

  return (
    <Tabs defaultActiveKey={'1'}>
      <TabPane tab="Genel Bilgiler" key="1">
        <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
          <ul className={classes['form-show']}>
            <li>
              <Text t="Anket Adı" /> : <span>{showData?.name}</span>
            </li>
            <li>
              <Text t="Açıklama" /> :<span>{showData?.description}</span>
            </li>
            <li>
              <Text t="Başlangıç Tarihi" /> : <span>{dayjs(showData?.startDate)?.format('YYYY-MM-DD HH:mm')}</span>
            </li>
            <li>
              <Text t="Bitiş Tarihi" /> : <span>{dayjs(showData?.endDate)?.format('YYYY-MM-DD HH:mm')}</span>
            </li>
            <li>
              <Text t="Yayında mı?" /> :{' '}
              <span>
                {showData?.publishStatus == 1 && <span className={classes['status-text-active']}>Evet</span>}
                {showData?.publishStatus == 2 && <span className={classes['status-text-passive']}>Hayır</span>}
                {showData?.publishStatus == 3 && (
                  <span className={classes['status-text-draft']}>Taslak Olarak Kaydedildi</span>
                )}
              </span>
            </li>
            <li>
              <Text t="Kategori" /> : <span>{showData?.categoryOfForm?.name}</span>
            </li>
            {showData?.categoryOfFormId == 5 && (
              <>
                <li>
                  <Text t="Sınıf Seviyesi" />:{" "} <span>{showData?.formClassrooms[0]?.classroom.name}</span>
                </li>
                <li>
                  <Text t="Paketler" />:{" "} <span>{showData?.packages[0].package?.name}</span>
                </li>
              </>
            )}
            <li>
              <Text t="Arşivlendi mi?" /> :{' '}
              <span>
                {showData?.isActive ? (
                  <span className={classes['status-text-active']}>Hayır</span>
                ) : (
                  <span className={classes['status-text-passive']}>Evet</span>
                )}
              </span>
            </li>
            <li>
              <Text t="Bitirme Koşulu?" /> :{' '}
              <span>
                {showData?.onlyComletedWhenFinish ? (
                  <span className={classes['status-text-active']}>
                    Kullanıcı tüm sorular cevapladığında anketi bitirebilir
                  </span>
                ) : (
                  <span className={classes['status-text-passive']}>Kullanıcı her an anketi bitirebilir</span>
                )}
              </span>
            </li>
          </ul>
        </CustomCollapseCard>
        <ul className={classes['form-show-footer']}>
          <li>
            <Text t="Oluşturma Tarihi" /> : <span>{dayjs(showData?.insertTime)?.format('YYYY-MM-DD HH:mm')}</span>
          </li>
          <li>
            <Text t="Oluşturan" /> : <span>{showData?.insertUserFullName}</span>
          </li>
          {/* <li>
            <Text t="Güncelleme Tarihi" /> : <span>{showData?.updateUserFullName}</span>
          </li> */}
          <li>
            <Text t="Güncelleyen" /> : <span>{showData?.updateUserFullName}</span>
          </li>
        </ul>
      </TabPane>
      <TabPane tab="Sorular" key="2">
        <CustomCollapseCard cardTitle={<Text t={`${showData.name} soruları`} />}>
          <PreviewList
            currentForm={showData}
            questionsOfForm={questionsOfForm}
            handleClose={handleClose}
            preview={preview}
            setPreview={setPreview}
          />
        </CustomCollapseCard>
      </TabPane>
    </Tabs>
  );
};

export default ShowFormTabs;
