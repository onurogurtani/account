import React, { forwardRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ChildCharts = forwardRef(({ data, labels, backgroundColor }, ref) => {
  const borderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
  ];
  return (
    <>
      {data?.map((item, index) => (
        <div key={Math.random() * 10} style={{ width: '500px', height: '500px', margin: '0 auto' }}>
          <Pie
            ref={(el) => (ref.current[index] = el)}
            key={Math.random() * 10}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    font: {
                      size: 14,
                    },
                  },
                },
                title: {
                  display: true,
                  font: {
                    size: 22,
                  },
                  text: item.name + ' için Soru Zorluk Derecelerine Göre Soru Dağılımları',
                },
              },
            }}
            data={{
              labels,
              datasets: [
                {
                  data: [
                    item.difficulty1QuestionOfExamCount,
                    item.difficulty2QuestionOfExamCount,
                    item.difficulty3QuestionOfExamCount,
                    item.difficulty4QuestionOfExamCount,
                    item.difficulty5QuestionOfExamCount,
                  ],
                  backgroundColor,
                  borderColor,
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      ))}
    </>
  );
});

export default ChildCharts;
