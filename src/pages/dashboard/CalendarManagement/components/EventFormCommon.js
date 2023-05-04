import { CustomDatePicker, CustomFormItem } from "../../../../components";

const EventFormCommon = ({ startDate, endDate }) => {


    return <>
        <CustomFormItem label={"Başlangıç Tarihi"}>
            <CustomDatePicker value={startDate} />
        </CustomFormItem>
        <CustomFormItem label={"Bitiş Tarihi"}>
            <CustomDatePicker value={endDate} />
        </CustomFormItem>
    </>
}
export default EventFormCommon;