import { CustomCheckbox, CustomFormItem, Text } from '../../../components';
import SelectModal from './SelectModal';

const CheckedSelectList = ({
    checkboxName,
    checkboxLabel,
    listName,
    listTitle,
    listOptions,
    formRules = [],
    shouldUpdateWith = [],
}) => {
    return (
        <div className="has-trying-test-wrapper">
            <CustomFormItem label={false} name={checkboxName} valuePropName="checked">
                <CustomCheckbox>
                    <Text t={checkboxLabel} />
                </CustomCheckbox>
            </CustomFormItem>

            <CustomFormItem
                noStyle
                shouldUpdate={(prevValues, curValues) =>
                    prevValues[checkboxName] !== curValues[checkboxName] ||
                    shouldUpdateWith.some((item) => prevValues[checkboxName] !== curValues[checkboxName])
                }
            >
                {({ getFieldValue }) => (
                    <CustomFormItem
                        label={false}
                        name={listName}
                        rules={getFieldValue(checkboxName) && listOptions.length > 0 ? formRules : []}
                    >
                        <span>{listTitle} </span>
                        <SelectModal
                            title={listTitle}
                            name={listName}
                            disabled={!getFieldValue(checkboxName)}
                            informationText={`${listTitle} ${listOptions.length > 0 ? 'Vardır' : 'Yoktur'}`}
                            selectOptionList={listOptions}
                        />
                    </CustomFormItem>
                )}
            </CustomFormItem>
        </div>
    );
};

export default CheckedSelectList;
