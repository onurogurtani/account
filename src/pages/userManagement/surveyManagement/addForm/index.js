import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomPageHeader, Text } from '../../../../components';
import AddSurveyTabs from './AddSurveyTabs';
import { setShowFormObj, setCurrentForm } from '../../../../store/slice/formsSlice';
import { getByFilterPagedAnnouncementTypes } from '../../../../store/slice/announcementSlice';
import { getParticipantGroupsList } from '../../../../store/slice/eventsSlice';

const AddSurvey = () => {
    const dispatch = useDispatch();
    const { formCategories, formPackages, currentForm, showFormObj } = useSelector((state) => state?.forms);

    const [updateForm, setUpdateForm] = useState(currentForm.id != undefined ? true : false);

    const [pageName, setPageName] = useState(showFormObj?.name != undefined ? 'Anket Güncelleme' : 'Yeni Anket');
    const { participantGroupsList } = useSelector((state) => state?.events);

    useEffect(() => {
        dispatch(setCurrentForm({ ...showFormObj }));
    }, [showFormObj]);

    const [step, setStep] = useState('1');

    const history = useHistory();

    const loadParticipantGroups = async () => {
        participantGroupsList?.length === 0 &&
            dispatch(
                getParticipantGroupsList({
                    params: {
                        'ParticipantGroupDetailSearch.PageSize': 100000000,
                    },
                }),
            );
    };

    loadParticipantGroups();

    const handleBackButton = () => {
        history.push('/user-management/survey-management');
        dispatch(setShowFormObj({}));
        setUpdateForm(false);
    };
    return (
        <>
            <CustomPageHeader
                title={<Text t={pageName} />}
                showBreadCrumb
                showHelpButton
                routes={['Kullanıcı Yönetimi', 'Anketler']}
            ></CustomPageHeader>
            <CustomButton type="primary" htmlType="submit" className="submit-btn" onClick={handleBackButton}>
                Geri
            </CustomButton>
            <AddSurveyTabs step={step} setStep={setStep} />
        </>
    );
};

export default AddSurvey;
