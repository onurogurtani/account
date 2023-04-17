import { lazy } from 'react';

const Categories = lazy(() =>
    import('./categories').then(({ default: Component }) => ({
        default: Component,
    })),
);
const Packages = lazy(() =>
    import('./packages').then(({ default: Component }) => ({
        default: Component,
    })),
);
const AddEditCopyPackages = lazy(() =>
    import('./packages/AddEditCopyPackages').then(({ default: Component }) => ({
        default: Component,
    })),
);

const Lessons = lazy(() =>
    import('./acquisitionTree/AcquisitionTreeList').then(({ default: Component }) => ({
        default: Component,
    })),
);
const Activities = lazy(() =>
    import('./activities').then(({ default: Component }) => ({
        default: Component,
    })),
);

const ClassStages = lazy(() =>
    import('./classStages').then(({ default: Component }) => ({
        default: Component,
    })),
);

const AnnouncementType = lazy(() =>
    import('./announcementType').then(({ default: Component }) => ({
        default: Component,
    })),
);
const PackagesType = lazy(() =>
    import('./packagesType').then(({ default: Component }) => ({
        default: Component,
    })),
);

const AcademicYear = lazy(() =>
    import('./academicYear').then(({ default: Component }) => ({
        default: Component,
    })),
);
const TargetSentence = lazy(() =>
    import('./targetSentence').then(({ default: Component }) => ({
        default: Component,
    })),
);

const PreferencePeriod = lazy(() =>
    import('./preferencePeriod').then(({ default: Component }) => ({
        default: Component,
    })),
);
const TargetScreen = lazy(() =>
    import('./targetScreen').then(({ default: Component }) => ({
        default: Component,
    })),
);

const Branch = lazy(() =>
    import('./branch').then(({ default: Component }) => ({
        default: Component,
    })),
);
const PublisherBook = lazy(() =>
    import('./publisherBook').then(({ default: Component }) => ({
        default: Component,
    })),
);
const Publisher = lazy(() =>
    import('./publisher').then(({ default: Component }) => ({
        default: Component,
    })),
);
const ParticipantGroups = lazy(() =>
    import('./participantGroups').then(({ default: Component }) => ({
        default: Component,
    })),
);
const TrialType = lazy(() =>
    import('./trialType').then(({ default: Component }) => ({
        default: Component,
    })),
);
const OrganisationTypes = lazy(() =>
    import('./organisationTypes/OrganisationTypesList').then(({ default: Component }) => ({
        default: Component,
    })),
);
const ContractTypes = lazy(() =>
    import('./contractType').then(({ default: Component }) => ({
        default: Component,
    })),
);
const ContractKinds = lazy(() =>
    import('./contractKinds').then(({ default: Component }) => ({
        default: Component,
    })),
);

const MaxNetNumber = lazy(() =>
    import('./maxNetNumber').then(({ default: Component }) => ({
        default: Component,
    })),
);

const Contracts = lazy(() =>
    import('./contracts').then(({ default: Component }) => ({
        default: Component,
    })),
);
const AddContract = lazy(() =>
    import('./contracts/contractHandlers/AddContract').then(({ default: Component }) => ({
        default: Component,
    })),
);
const EditContracts = lazy(() =>
    import('./contracts/contractHandlers/EditContract').then(({ default: Component }) => ({
        default: Component,
    })),
);
const ShowContracts = lazy(() =>
    import('./contracts/contractHandlers/ShowContracts').then(({ default: Component }) => ({
        default: Component,
    })),
);
const JobSettings = lazy(() =>
    import('./jobSettings').then(({ default: Component }) => ({
        default: Component,
    })),
);
const UpdateVersion = lazy(() =>
    import('./updateVersion').then(({ default: Component }) => ({
        default: Component,
    })),
);

const Messages = lazy(() =>
    import('./messages').then(({ default: Component }) => ({
        default: Component,
    })),
);
const Settings = {
    Categories,
    Packages,
    AddEditCopyPackages,
    Lessons,
    Activities,
    ClassStages,
    AnnouncementType,
    Branch,
    PackagesType,
    TargetScreen,
    AcademicYear,
    TargetSentence,
    PreferencePeriod,
    PublisherBook,
    Publisher,
    ParticipantGroups,
    TrialType,
    OrganisationTypes,
    ContractTypes,
    ContractKinds,
    MaxNetNumber,
    Contracts,
    AddContract,
    EditContracts,
    ShowContracts,
    JobSettings,
    UpdateVersion,
    Messages,
};

export default Settings;
