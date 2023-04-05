import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomButton, CustomSelect } from '../../../components';

const Preview = () => {
    const { trialExamFormData } = useSelector((state) => state?.tiralExam);
    const [selectSection, setSelectSection] = useState(null);
    const [sortData, setSortData] = useState([]);
    useEffect(() => {
        const examLength = trialExamFormData?.sections?.find((q) => q.name === selectSection)?.sectionQuestionOfExams
            .length;
        const newData = [];
        for (let index = 0; index < examLength; index++) {
            newData.push({ value: index + 1, label: index + 1 });
        }
        setSortData(newData);
    }, [selectSection, trialExamFormData?.sections]);
    return (
        <div className="preview-main">
            <div className=" header">
                {trialExamFormData.sections.map((item, index) => (
                    <div>
                        <CustomButton
                            className={item.name === selectSection && 'section-active'}
                            onClick={() => {
                                setSelectSection(item.name);
                            }}
                        >
                            {item.name}
                        </CustomButton>
                    </div>
                ))}
            </div>
            <div className="getQuesiton">
                <div>Soruya Git</div>
                <CustomSelect
                    onChange={(e) => {
                        const element = document.getElementById(selectSection + parseInt(e - 1));
                        console.log(element);
                        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                    }}
                    options={sortData}
                />
            </div>
            <div>
                <div className="view-quesiton-add">
                    {trialExamFormData?.sections
                        ?.find((q) => q.name === selectSection)
                        ?.sectionQuestionOfExams.map((item, index) => (
                            <div id={selectSection + index} className="view-quesiton-add-main ">
                                <div>{index + 1}</div>

                                <div key={index} className="question-image-main">
                                    <img className="question-image" src={item?.file?.base64} />
                                    {item.filePath}
                                </div>
                            </div>
                        ))}
                    {trialExamFormData?.sections?.find((q) => q.name === selectSection)?.sectionQuestionOfExams
                        ?.length === 0 && 'Soru Eklenmedi!'}
                </div>
            </div>
        </div>
    );
};

export default Preview;
