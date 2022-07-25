import { Menu } from 'antd';
import styled from 'styled-components';
import CustomImage from './CustomImage';
import Text from './Text';
import { useHistory, useLocation } from 'react-router-dom';
import menuIcons from '../assets/icons/icon-menu-icons.svg';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuChange } from '../store/slice/menuSlice';

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

  :hover,
  :active {
    color: #ffffff !important;
  }
`;

const CustomSubMenu = styled(SubMenu)`
  // height: 48px;
  .ant-menu-sub.ant-menu-inline {
    background: #3f4957 !important;
  }

  .ant-menu-submenu-title {
    margin-top: 0 !important;
    padding: 0 !important;

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
    <CustomMenu
      data-testid="menus-test"
      onClick={handleClick}
      mode="inline"
      selectedKeys={selectedKey}
    >
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
      <CustomItem key="/user-management/user-list-management">
        <MenuItemText>
          <CustomImage src={menuIcons} />
          <span>
            <Text t="Kullanıcı Listesi" />
          </span>
        </MenuItemText>
      </CustomItem>
    </CustomMenu>
  );
};

export default Menus;
