import { CustomCollapseCard, CustomPageHeader, Text } from '../components';

export const CustomPageWrapper = ({ title, routes, cardTitle, children }) => {
    return (
        <CustomPageHeader title={<Text t={title} />} showBreadCrumb showHelpButton routes={routes}>
            <CustomCollapseCard
                cardTitle={<Text t={cardTitle} />}
                style={{
                    width: '100%',
                }}
            >
                {children}
            </CustomCollapseCard>
        </CustomPageHeader>
    );
};

export default CustomPageWrapper;
