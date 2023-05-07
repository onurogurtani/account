import { Tooltip } from 'antd';
import classNames from 'classnames';
import Style from './style.module.scss';

const CustomTooltip = ({ className = '', ...rest }) => {
    const classes = classNames(Style.tooltip, className);
    return <Tooltip {...rest} className={classes} />
}

export default CustomTooltip