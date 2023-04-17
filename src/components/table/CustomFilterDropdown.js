import { Space, Button, Input } from "antd";
import Style from './style.module.scss';
const CustomFilterDropdown = ({ selectedKeys, setSelectedKeys, clearFilters, confirm, }) => {

    const onChangeFilter = (e) => {
        setSelectedKeys(e.target.value ? [e.target.value] : [])
    }
    const onApplyFilter = () => {
        confirm({ closeDropdown: true });
    }
    const onClearFilters = () => {
        clearFilters?.();
        onApplyFilter();
    }

    return <Space className={Style.customFilter}>
        <span>Filtre Değeri</span>
        <Input
            size="small"
            value={selectedKeys?.[0]}
            onChange={onChangeFilter}
            onPressEnter={onApplyFilter} >
        </Input>
        <footer>
            <Button size="small" onClick={onApplyFilter} >Uygula</Button>
            <Button size="small" onClick={onClearFilters} >Temizle</Button>
        </footer>
    </Space>
}

export default CustomFilterDropdown;