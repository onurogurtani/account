import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/swiper.scss';
import { CustomButton } from '../../../../components';
import '../../../../styles/temporaryFile/asEvSwiper.scss';
import AsEvQuestionSwiper from './AsEvQuestionSwiper';
import NewQuestionModal from './NewQuestionModal';
import QuestionKnowledgeList from './QuestionKnowledgeList';
import QuestionSideBar from './QuestionSideBar';

SwiperCore.use([Pagination, Navigation]);

const AsEvQuestions = ({ updateAsEv }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const dummyIds = [1490, 1491];
  const dummyIds2 = [1390, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399];
  const [selectnewQuestion, setSelectnewQuestion] = useState(false);
  const { newAsEv, asEvQuestions } = useSelector((state) => state?.asEv);
  const dispatch = useDispatch();
  const completeAsEv = async () => {
    setSelectnewQuestion(false);
  };

  return (
    <>
      <div className="slider-filter-container">
        <AsEvQuestionSwiper setCurrentSlideIndex={setCurrentSlideIndex} data={dummyIds} />
        <QuestionSideBar
          setSelectnewQuestion={setSelectnewQuestion}
          currentSlideIndex={currentSlideIndex}
          data={dummyIds}
        />

        <div
          style={{
            width: '100%',
            // border: '2px solid red',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: '16px',
          }}
        >
          <CustomButton onClick={completeAsEv}>Tamamla</CustomButton>
        </div>
      </div>
      {selectnewQuestion && (
        <NewQuestionModal isVisible={selectnewQuestion} setIsVisible={setSelectnewQuestion}>
          <h3>Soru Değiştir</h3>
          <div className="slider-filter-container">
            <AsEvQuestionSwiper setCurrentSlideIndex={setCurrentSlideIndex} data={dummyIds2} className={'swiper2'} />
            <div
              style={{
                width: '30%',
                height: '800px',
                display: 'flex',
              }}
            >
              <QuestionKnowledgeList
                style={{
                  width: '30% !important',
                }}
                data={[]}
                currentSlideIndex={currentSlideIndex}
              />
            </div>
          </div>
          <div>
            <CustomButton onClick={completeAsEv}>Soruyu Seç</CustomButton>
          </div>
        </NewQuestionModal>
      )}
    </>
  );
};

export default AsEvQuestions;
