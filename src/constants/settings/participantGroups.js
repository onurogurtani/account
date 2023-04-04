import { EUserTypes } from '../enum';

export const participantGroupTypes = {
    [EUserTypes.Student]: { label: 'Öğrenci' },
    [EUserTypes.Parent]: { label: 'Veli' },
    [EUserTypes.Teacher]: { label: 'Öğretmen' },
    [EUserTypes.Coach]: { label: 'Koç' },
    [EUserTypes.OrganisationAdmin]: { label: 'Kurum Admini' },
    [EUserTypes.FranchiseAdmin]: { label: 'Franchise Admini' },
};
