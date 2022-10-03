import { useCallback, useEffect } from 'react';
import { CustomImage } from '../index';
import { footerLink } from '../../utils/keys';
import rightArrow from '../../assets/icons/icon-rigth-arrow.svg';
import iconLanguageTr from '../../assets/icons/icon-language-tr.svg';
import iconLanguageEn from '../../assets/icons/icon-language-en.svg';
import iconFacebook from '../../assets/icons/icon-facebook.svg';
import iconInstagram from '../../assets/icons/icon-instagram.svg';
import iconLinkedin from '../../assets/icons/icon-linkedin.svg';
import iconTwitter from '../../assets/icons/icon-twitter.svg';
import iconYoutube from '../../assets/icons/icon-youtube.svg';
import { languageOptions } from '../../assets/language';
import { Text, useText } from '../';
import { Select } from 'antd';
import { useLang } from '../../context';
import '../../styles/components/footer.scss';

const { Option } = Select;

const Footer = () => {
  const { languageChange, language } = useLang();

  const ticketOnlineOrderingPlatformLanguage = useText('ticketOnlineOrderingPlatform');

  const handleChange = useCallback(
    (value) => {
      languageChange(value);
    },
    [languageChange],
  );

  const changeTitle = useCallback((text) => {
    document.title = 'Sanal Dershane | Admin';
  }, []);

  useEffect(() => {
    changeTitle(ticketOnlineOrderingPlatformLanguage);
  }, [language, changeTitle, ticketOnlineOrderingPlatformLanguage]);

  return (
    <div className={'dd-footer'}>
      <div className="campaigns">
        <span className="title">
          <Text t="redClubCampaigns" />
        </span>
        <CustomImage src={rightArrow} className="arrow-icon" />
      </div>

      <div className="contracts">
        <span className="title">
          <Text t="myContracts" />
        </span>
        <CustomImage src={rightArrow} className="arrow-icon" />
      </div>

      <div className="footer-line" />

      <div className="footer-link-content">
        <a className="link" href={footerLink?.help} target="_blank" rel="noreferrer">
          <Text t="help" />
        </a>
        <a className="link" href={footerLink?.communication} target="_blank" rel="noreferrer">
          <Text t="communication" />
        </a>
        <a
          className="link"
          href={footerLink?.protectionOfPersonalData}
          target="_blank"
          rel="noreferrer"
        >
          <Text t="protectionPersonalData" />
        </a>
        <a className="link" href={footerLink?.cookiePolicy} target="_blank" rel="noreferrer">
          <Text t="cookiePolicy" />
        </a>
        <div
          className="link ot-sdk-show-settings"
          onClick={() => {
            window?.OneTrust?.initializeCookiePolicyHtml();
          }}
        >
          <Text t="cookieSettings" />
        </div>
      </div>

      <div className="footer-line" />

      <Select
        data-testid="languageSelect"
        defaultValue={language}
        onChange={handleChange}
        bordered={false}
      >
        <Option data-testid="tr_language" value={languageOptions?.turkey}>
          <CustomImage src={iconLanguageTr} />
        </Option>
        <Option data-testid="en_language" value={languageOptions?.english}>
          <CustomImage src={iconLanguageEn} />
        </Option>
      </Select>

      <div className="footer-line" />

      <p className="footer-company-name">Ticket Online ©</p>
      <p className="all-rights-reserved">
        <Text t="rightsReserved" />
      </p>

      <div className="social-media-content">
        <a href={footerLink?.facebook}>
          <CustomImage src={iconFacebook} />
        </a>
        <a href={footerLink?.instagram}>
          <CustomImage src={iconInstagram} />
        </a>
        <a href={footerLink?.linkedin}>
          <CustomImage src={iconLinkedin} />
        </a>
        <a href={footerLink?.twitter}>
          <CustomImage src={iconTwitter} />
        </a>
        <a href={footerLink?.youtube}>
          <CustomImage src={iconYoutube} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
