import profileServices from '../../services/profile.services';

describe('Profile services tests', () => {
  it('getCurrentUser call', () => {
    profileServices.getCurrentUser();
  });

  it('currentUserUpdate call', () => {
    profileServices.currentUserUpdate(1);
  });
});
