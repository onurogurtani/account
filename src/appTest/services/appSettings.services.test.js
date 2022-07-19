import appSettingsServices from '../../services/appSettings.services';

describe('App settings services tests', () => {
  it('getAppSettings call', () => {
    appSettingsServices.getAppSettings();
  });
});
