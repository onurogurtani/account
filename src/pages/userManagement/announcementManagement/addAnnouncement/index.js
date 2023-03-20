import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomPageHeader, Text } from '../../../../components';
import { getByFilterPagedAnnouncementTypes } from '../../../../store/slice/announcementSlice';
import { getParticipantGroupsList } from '../../../../store/slice/eventsSlice';
import AddAnnouncementInfo from './AddAnnouncementInfo';

const AddAnnouncement = () => {
    const dispatch = useDispatch();

    const { announcementTypes } = useSelector((state) => state?.announcement);
    const { participantGroupsList } = useSelector((state) => state?.events);
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
        loadAnnouncemenTypes();
        loadParticipantGroups();
    }, []);

    const loadAnnouncemenTypes = useCallback(async () => {
        let typeData = {
            pageSize: 1000,
            pageNumber: 1,
            isActive: true,
        };
        announcementTypes?.length === 0 && (await dispatch(getByFilterPagedAnnouncementTypes(typeData)));
    }, [dispatch, announcementTypes]);

    const loadParticipantGroups = useCallback(async () => {
        participantGroupsList?.length === 0 &&
            dispatch(
                getParticipantGroupsList({
                    params: {
                        'ParticipantGroupDetailSearch.PageSize': 100000000,
                    },
                }),
            );
    }, [dispatch, participantGroupsList]);

    const handleBackButton = () => {
        history.push('/user-management/announcement-management');
    };
    return (
        <>
            <CustomPageHeader
                title={<Text t="Yeni Duyuru" />}
                showBreadCrumb
                showHelpButton
                routes={['Kullanıcı Yönetimi', 'Duyurular']}
            ></CustomPageHeader>
            <CustomButton
                type="primary"
                htmlType="submit"
                className="submit-btn"
                onClick={handleBackButton}
                style={{ marginBottom: '1em' }}
            >
                Geri
            </CustomButton>
            <AddAnnouncementInfo />
        </>
    );
};

export default AddAnnouncement;
