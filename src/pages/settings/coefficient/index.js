import { CustomPageHeader, Text } from '../../../components';
import CoefficientList from './CoefficientList';

const routes = ['Tanımlamalar'];

const Coefficient = () => {
    return (
        <CustomPageHeader
            title={<Text t="Katsayı Tanımlama" />}
            routes={routes}
            showBreadCrumb
        >
           <CoefficientList />
        </CustomPageHeader>
    )
}

export default Coefficient