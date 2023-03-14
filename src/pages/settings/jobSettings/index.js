import { CustomPageHeader } from '../../../components';
import JobSettingsTable from './JobSettingsTable';

const JobSettings = () => {
    return (
        <CustomPageHeader title="Jobların Çalışma Rutin Kontrolü" showBreadCrumb showHelpButton routes={['Ayarlar']}>
            <JobSettingsTable />
        </CustomPageHeader>
    );
};

export default JobSettings;
