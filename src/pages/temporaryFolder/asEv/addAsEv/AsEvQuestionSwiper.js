import React from 'react';
import { useDispatch } from 'react-redux';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import iconLeftNotify from '../../../../assets/icons/icon-left-notify.svg';
import iconRightNotify from '../../../../assets/icons/icon-right-notify.svg';
import {
  CustomImage
} from '../../../../components';
import SingleQuestion from './SingleQuestion';
// import 'swiper/swiper.css';
import '../../../../styles/temporaryFile/asEvSwiper.scss';

SwiperCore.use([Pagination, Navigation]);

const AsEvQuestionSwiper = ({ data, className, setCurrentSlideIndex }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="notification-box-content">
        <Swiper
          className={className ? 'notification-slider slider2' : `notification-slider slider1`}
          slidesPerView={1}
          navigation={{
            prevEl: className ? '.prev-notify2' : '.prev-notify',
            nextEl: className ? '.next-notify2' : '.next-notify',
          }}
          slideToClickedSlide={false}
          pagination={{
            el: className ? '.swiper-pagination2' : '.swiper-pagination1',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
              return (
                '<span class="' +
                currentClass +
                '"></span>' +
                '<span>/</span>' +
                '<span class="' +
                totalClass +
                '"></span>'
              );
            },
          }}
          spaceBetween={18}
          onSlideChange={(activeIndex) => {
            setCurrentSlideIndex(activeIndex);
          }}
        >
          {data?.map((id, i) => (
            <SwiperSlide virtualIndex={i} className="notification-body">
              <SingleQuestion id={id} index={i} key={id} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={
            className ? 'notification-header notification-header2' : 'notification-header notification-header1'
          }
        >
          <div className="pagination-btns">
            <CustomImage className={className ? 'prev-notify2' : 'prev-notify'} src={iconLeftNotify} />
            <div
              className={className ? 'swiper-paginations swiper-pagination2' : 'swiper-paginations swiper-pagination1'}
            />
            <CustomImage className={className ? 'next-notify2' : 'next-notify'} src={iconRightNotify} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AsEvQuestionSwiper;
