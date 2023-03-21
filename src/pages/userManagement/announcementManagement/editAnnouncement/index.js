import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomPageHeader, Text } from '../../../../components';
import { getByFilterPagedAnnouncementTypes } from '../../../../store/slice/announcementSlice';
import { getParticipantGroupsList } from '../../../../store/slice/eventsSlice';
import '../../../../styles/announcementManagement/saveAndFinish.scss';
import EditAnnouncementInfo from './EditAnnouncementInfo';

const EditAnnouncement = () => {
    const dispatch = useDispatch();

    const [announcementInfoData, setAnnouncementInfoData] = useState({});
    const [updated, setUpdated] = useState(false);
    const { announcementTypes } = useSelector((state) => state?.announcement);
    const { participantGroupsList } = useSelector((state) => state?.events);
    const history = useHistory();
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

    useEffect(() => {
        window.scrollTo(0, 0);
        loadAnnouncemenTypes();
        loadParticipantGroups();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBackButton = () => {
        history.push('/user-management/announcement-management');
    };
    return (
        <>
            <CustomPageHeader
                title={<Text t="Duyuru Düzenle" />}
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

            <EditAnnouncementInfo
                setAnnouncementInfoData={setAnnouncementInfoData}
                announcementInfoData={announcementInfoData}
                updated={updated}
                setUpdated={setUpdated}
            />
        </>
    );
};

export default EditAnnouncement;
