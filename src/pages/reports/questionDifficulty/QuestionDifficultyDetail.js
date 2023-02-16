import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ChildCharts from './components/ChildCharts';
import ParentChart from './components/ParentChart';
import { Typography } from 'antd';
import QuestionDifficultyStatistic from './components/QuestionDifficultyStatistic';
import { CustomButton } from '../../../components';
import { jsPDF } from 'jspdf';
import * as htmlToImage from 'html-to-image';
import dayjs from 'dayjs';

const { Title } = Typography;
const QuestionDifficultyDetail = () => {
  const ref = useRef([]);
  const refTitle = useRef();
  const refSubTitle = useRef();
  const refParentChart = useRef();
  const location = useLocation();
  const reportData = location?.state;
  const { data, filterLevel } = reportData;
  const labels = [
    'Zorluk Seviyesi 1',
    'Zorluk Seviyesi 2',
    'Zorluk Seviyesi 3',
    'Zorluk Seviyesi 4',
    'Zorluk Seviyesi 5',
  ];
  const backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
  ];

  const createTitle = () => {
    let title = 'Sınıf seviyesi ' + data?.classroomName;

    if (data?.lessonName) {
      title += ' - ' + data?.lessonName;
    }

    if (data?.unitName) {
      title += ' - ' + data?.unitName;
    }

    if (data?.subjectName) {
      title += ' - ' + data?.subjectName;
    }
    if (data?.subSubjectName) {
      title += ' - ' + data?.subSubjectName;
    }

    return title;
  };

  const createSubTitle = () => {
    if (data?.subSubjectName) {
      return '';
    }
    if (data?.subjectName) {
      return 'Konuya Ait Kazanımlar';
    }
    if (data?.unitName) {
      return 'Üniteye Ait Konular';
    }
    if (data?.lessonName) {
      return 'Derse Ait Üniteler';
    }
    if (data?.classroomName) {
      return 'Sınıf Seviyesine Ait Dersler';
    }
  };

  const downloadPdf = async () => {
    const doc = new jsPDF();
    const titleData = await htmlToImage.toPng(refTitle.current);
    const subTitleData = await htmlToImage.toPng(refSubTitle.current);
    doc.addImage(titleData, 'PNG', 15, 5, 180, 65, undefined, 'FAST');
    doc.addImage(refParentChart.current.toBase64Image(), 'JPEG', 25, 75, 160, 90, undefined, 'FAST');
    doc.addImage(subTitleData, 'PNG', 15, 167, 180, 8, undefined, 'FAST');

    const padding = 45;
    const marginTop = 15;
    let top = marginTop + 160;

    for (let i = 0; i < ref.current.length; i++) {
      let elHeight = 120;
      let elWidth = 120;

      const pageWidth = doc.internal.pageSize.getWidth();
      console.log(pageWidth);
      if (elWidth > pageWidth) {
        const ratio = pageWidth / elWidth;
        elHeight = elHeight * ratio - padding * 2;
        elWidth = elWidth * ratio - padding * 2;
      }

      const pageHeight = doc.internal.pageSize.getHeight();

      if (top + elHeight > pageHeight) {
        doc.addPage();
        top = marginTop;
      }

      doc.addImage(ref.current[i].toBase64Image(), 'JPEG', padding, top, elWidth, elHeight, `image${i}`, 'FAST');
      top += elHeight + marginTop;
    }

    doc.save(dayjs()?.format('DD.MM.YYYY HH.mm') + ' Zorluk Seviyelerine Göre Soru Dağılımı Raporu.pdf');
  };

  return (
    <>
      <div className="chart-container" style={{ width: '700px', margin: '0 auto' }}>
        <CustomButton type="primary" onClick={downloadPdf} style={{ position: 'absolute', right: '20px' }}>
          PDF olarak indir
        </CustomButton>
        <div ref={refTitle} style={{ textAlign: 'center', marginBottom: '10px' }}>
          <Title level={2}>Zorluk Seviyelerine Göre Soru Dağılımı Raporu</Title>
          {filterLevel?.key && <Title level={5}>{filterLevel?.text}</Title>}
          <Title level={3}>{createTitle()}</Title>
          <QuestionDifficultyStatistic data={data} />
        </div>
        <ParentChart data={data} labels={labels} backgroundColor={backgroundColor} ref={refParentChart} />
        <div style={{ marginTop: '20px' }}></div>
        <div ref={refSubTitle} style={{ textAlign: 'center' }}>
          <Title level={3}>{createSubTitle()}</Title>
        </div>
        {data?.childs && <ChildCharts data={data.childs} labels={labels} backgroundColor={backgroundColor} ref={ref} />}
      </div>
    </>
  );
};

export default QuestionDifficultyDetail;
