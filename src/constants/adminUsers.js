import { EUserTypes } from './enum';

export const adminTypes = [
    { id: EUserTypes.Admin, value: 'Sistem Admin', accessType: [EUserTypes.Admin] },
    {
        id: EUserTypes.OrganisationAdmin,
        value: 'Kurum Admin',
        accessType: [EUserTypes.Admin, EUserTypes.OrganisationAdmin, EUserTypes.FranchiseAdmin],
    },
    {
        id: EUserTypes.FranchiseAdmin,
        value: 'Franchise Admin',
        accessType: [EUserTypes.Admin, EUserTypes.FranchiseAdmin],
    },
];
