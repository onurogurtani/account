import { Menu } from 'antd';
import styled from 'styled-components';
import CustomImage from './CustomImage';
import Text from './Text';
import { useHistory, useLocation } from 'react-router-dom';
import menuIcons from '../assets/icons/icon-menu-icons.svg';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuChange } from '../store/slice/menuSlice';
import { SettingOutlined } from '@ant-design/icons';

const { SubMenu, ItemGroup, Item } = Menu;

const CustomMenu = styled(Menu)`
    background-color: #3f4957;
    border-right: 0;

    li.ant-menu-item-selected {
        background-color: #4d5868 !important;
        box-shadow: inset 4px 0 0 0 #fff;
    }

    li:first-child {
        margin-top: 7px !important;
        margin-bottom: 12px !important;
    }

    li.menu-last-child {
        box-shadow: none;
    }

    li.ant-menu-item:active,
    .ant-menu-submenu-title:active {
        background: none;
    }
`;

const CustomItem = styled(Item)`
    padding: 0 !important;
    margin: 0 !important;
    background-color: #3f4957;
    :hover,
    :active {
        color: #ffffff !important;
    }
`;

const CustomSubMenu = styled(SubMenu)`
    // height: 48px;

    .ant-menu-title-content {
        color: #d5d8de;
        font-family: UbuntuMedium, sans-serif;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        padding-left: 2px;
    }
    .ant-menu-sub.ant-menu-inline {
        background: #3f4957 !important;
    }

    .ant-menu-submenu-title {
        margin: 0 36px !important;
        padding: 0 !important;
        box-shadow: inset 0px -1px 0 0 #4d5868;

        :hover,
        :active,
        :hover > .ant-menu-submenu-arrow,
        :active > .ant-menu-submenu-arrow {
            color: #ffffff !important;
        }
    }

    .ant-menu-submenu-expand-icon,
    .ant-menu-submenu-arrow {
        color: #d5d8de;
        width: 4px;
        height: 8px;
        top: 58%;
    }

    :hover,
    :active {
        color: #ffffff !important;
    }

    .ant-menu-submenu-arrow {
        right: 46px !important;
    }

    .ant-menu-inline .ant-menu-item,
    .ant-menu-inline .ant-menu-submenu-title {
        width: 100% !important;
    }
`;

const CustomItemGroup = styled(ItemGroup)(
    ({ color }) => `
  .ant-menu-item-group-title{
    color: ${color};
    padding: 12px 36px 12px 36px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    font-size: 14px;
    letter-spacing: normal;
  }
`,
);

const MenuItemText = styled.div`
    margin: 0 36px;
    box-shadow: inset 0px -1px 0 0 #4d5868;
    display: flex;
    white-space: initial;
    height: 48px;
    align-items: center;

    img {
        width: 20px;
        height: 20px;
    }

    span {
        font-family: UbuntuMedium, sans-serif;
        padding-left: 12px;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        color: #d5d8de;
    }
`;

const MenuSubItemText = styled.div`
    margin: 0 66px;
    box-shadow: inset 0px -1px 0 0 #4d5868;
    display: flex;
    white-space: initial;
    height: 48px;
    align-items: center;

    img {
        width: 20px;
        height: 20px;
    }

    .sub-menu-text-dot {
        width: 4px;
        height: 4px;
        margin: 10px 8px 10px 0;
        background-color: #d8d8d8;
        border-radius: 50%;
    }

    span {
        font-family: UbuntuMedium, sans-serif;
        //padding-left: 12px;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        color: #d5d8de;
    }
`;

const Menus = () => {
    const history = useHistory();
    const location = useLocation();
    const { selectedKey } = useSelector((state) => state?.menu);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        if (['/', '/dashboard', '/profile'].includes(location.pathname)) {
            dispatch(menuChange(['']));
        } else {
            dispatch(menuChange([location.pathname]));
        }
    }, [dispatch, location]);

    const handleClick = (e) => {
        history.push(e?.key);
    };

    return (
        <CustomMenu data-testid="menus-test" onClick={handleClick} mode="vertical" selectedKeys={selectedKey}>
            <CustomItemGroup title={<Text t="Kullanıcı Yönetimi" />} color="#ffffff" />
            <CustomItem key="/user-management/role-management">
                <MenuItemText>
                    <CustomImage src={menuIcons} />
                    <span>
                        <Text t="Rol Yönetimi" />
                    </span>
                </MenuItemText>
            </CustomItem>
            <CustomItem key="/user-management/operation-claims">
                <MenuItemText>
                    <CustomImage src={menuIcons} />
                    <span>
                        <Text t="Yetki Yönetimi" />
                    </span>
                </MenuItemText>
            </CustomItem>
            <CustomItem key="/user-management/role-operation-connect">
                <MenuItemText>
                    <CustomImage src={menuIcons} />
                    <span>
                        <Text t="Rol-Yetki Yönetimi" />
                    </span>
                </MenuItemText>
            </CustomItem>
            <CustomItem key="/role-authorization-management/list">
                <MenuItemText>
                    <CustomImage src={menuIcons} />
                    <span>
                        <Text t="Rol - Yetki Yönetimi" />
                    </span>
                </MenuItemText>
            </CustomItem>
            <CustomItem key="/user-management/user-list-management/list">
                <MenuItemText>
                    <CustomImage src={menuIcons} />
                    <span>
                        <Text t="Üye Listesi" />
                    </span>
                </MenuItemText>
            </CustomItem>
            <CustomItem key="/admin-users-management/list">
                <MenuItemText>
                    <CustomImage src={menuIcons} />
                    <span>
                        <Text t="Admin Kullanıcı Listesi" />
                    </span>
                </MenuItemText>
            </CustomItem>
            <CustomItem key="/user-management/survey-management">
                <MenuItemText>
                    <CustomImage src={menuIcons} />
                    <span>
                        <Text t="Anket Yönetimi" />
                    </span>
                </MenuItemText>
            </CustomItem>

            <CustomItem key="/user-management/announcement-management">
                <MenuItemText>
                    <CustomImage src={menuIcons} />
                    <span>
                        <Text t="Duyuru Yönetimi" />
                    </span>
                </MenuItemText>
            </CustomItem>
            <CustomItem key="/video-management/list">
                <MenuItemText>
                    <CustomImage src={menuIcons} />
                    <span>
                        <Text t="Video Yönetimi" />
                    </span>
                </MenuItemText>
            </CustomItem>
            <CustomItem key="/event-management/list">
                <MenuItemText>
                    <CustomImage src={menuIcons} />
                    <span>
                        <Text t="Etkinlik Yönetimi" />
                    </span>
                </MenuItemText>
            </CustomItem>
            <CustomItem key="/organisation-management/list">
                <MenuItemText>
                    <CustomImage src={menuIcons} />
                    <span>
                        <Text t="Kurum Yönetimi" />
                    </span>
                </MenuItemText>
            </CustomItem>
            <CustomSubMenu key="SubMenu" title="Tanımlamalar" icon={<CustomImage src={menuIcons} />}>
                <CustomItem key="/user-management/school-management">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Okul Yönetimi" />
                        </span>
                    </MenuItemText>
                </CustomItem>

                <CustomItem key="/user-management/avatar-management">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Avatar Yönetimi" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/user-management/password-management">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Şifre Yönetimi" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/categories">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Kategoriler" />
                        </span>
                    </MenuItemText>
                </CustomItem>

                <CustomItem key="/settings/packages">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Paketler" />
                        </span>
                    </MenuItemText>
                </CustomItem>

                <CustomItem key="/settings/lessons">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Kazanım Ağacı" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/activities">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Etkinlikler" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/classStages">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Sınıf Seviyesi" />
                        </span>
                    </MenuItemText>
                </CustomItem>

                <CustomItem key="/settings/announcementType">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Duyuru Tipi Tanımlama" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/branch">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Şube Bilgileri Tanımları" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/packagesType">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Paket Türü Tanımlama" />
                        </span>
                    </MenuItemText>
                </CustomItem>

                <CustomItem key="/settings/academicYear">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Tercih Dönemi Eğitim Öğretim Yılı" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/targetSentence">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Hedef Cümle" />
                        </span>
                    </MenuItemText>
                </CustomItem>

                <CustomItem key="/settings/preferencePeriod">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Tercih Dönemi Tanımlama" />
                        </span>
                    </MenuItemText>
                </CustomItem>

                <CustomItem key="/settings/targetScreen">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Hedef Ekranları Tanımlama" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/publisherBook">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Eser Tanımlama" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/publisher">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Yayın  Tanımlama" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/trialType">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Deneme Türü  Tanımlama" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/organisation-types">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Kurum Türü  Tanımlama" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/contract-types">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Sözleşme Tipi" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/contract-kinds">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Sözleşme Türleri" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/participantGroups">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Katılımcı Grubu  Tanımlama" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/contracts">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Sözleşme Tanımlama" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/settings/max-net-number">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Max Net Sayıları" />
                        </span>
                    </MenuItemText>
                </CustomItem>
            </CustomSubMenu>

            <CustomSubMenu key="QuestionMenu" title="Soru Yönetimi" icon={<CustomImage src={menuIcons} />}>
                <CustomItem key="/question-management/add-question-file">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Soru Dosyası Ekleme" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/question-management/question-identification">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Soru Kimliklendirme" />
                        </span>
                    </MenuItemText>
                </CustomItem>
            </CustomSubMenu>
            <CustomSubMenu key="AsignMenu" title="Testler" icon={<CustomImage src={menuIcons} />}>
                <CustomItem key="/test-management/assessment-and-evaluation/list">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Ölçme ve Değerlendirme" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/test-management/reinforcement-management">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Pekiştirme" />
                        </span>
                    </MenuItemText>
                </CustomItem>
            </CustomSubMenu>
            <CustomItem key="/work-plan-management/list">
                <MenuItemText>
                    <CustomImage src={menuIcons} />
                    <span>
                        <Text t="Çalışma Planları" />
                    </span>
                </MenuItemText>
            </CustomItem>
            <CustomSubMenu key="ReportsMenu" title="Raporlar" icon={<CustomImage src={menuIcons} />}>
                <CustomItem key="/reports/question-difficulty/list">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Zorluk Seviyelerine Göre Soru Dağılımı Raporu" />
                        </span>
                    </MenuItemText>
                </CustomItem>
                <CustomItem key="/reports/video-reports">
                    <MenuItemText>
                        <CustomImage src={menuIcons} />
                        <span>
                            <Text t="Çalışma Planına Bağlanmamış Videolar Raporu" />
                        </span>
                    </MenuItemText>
                </CustomItem>
            </CustomSubMenu>
        </CustomMenu>
    );
};

export default Menus;
