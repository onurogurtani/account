import { EUserTypes } from './enum';

export const adminTypes = {
    [EUserTypes.Admin]: { label: 'Sistem Admin', accessType: [EUserTypes.Admin] },
    [EUserTypes.OrganisationAdmin]: {
        label: 'Kurum Admin',
        accessType: [EUserTypes.Admin, EUserTypes.OrganisationAdmin, EUserTypes.FranchiseAdmin],
    },
    [EUserTypes.FranchiseAdmin]: {
        label: 'Franchise Admin',
        accessType: [EUserTypes.Admin, EUserTypes.FranchiseAdmin],
    },
};
