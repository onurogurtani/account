import { EUserTypes } from '../enum';

export const participantGroupTypes = {
    [EUserTypes.Student]: { value: 'Öğrenci' },
    [EUserTypes.Parent]: { value: 'Veli' },
    [EUserTypes.Teacher]: { value: 'Öğretmen' },
    [EUserTypes.Coach]: { value: 'Koç' },
    [EUserTypes.OrganisationAdmin]: { value: 'Kurum Admini' },
    [EUserTypes.FranchiseAdmin]: { value: 'Franchise Admini' },
};
