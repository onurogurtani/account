import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { forwardRef } from 'react';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ParentChart = forwardRef(({ data, labels, backgroundColor }, ref) => {
  return (
    <Bar
      ref={ref}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      data={{
        labels,
        datasets: [
          {
            data: [
              data?.difficulty1QuestionOfExamCount,
              data?.difficulty2QuestionOfExamCount,
              data?.difficulty3QuestionOfExamCount,
              data?.difficulty4QuestionOfExamCount,
              data?.difficulty5QuestionOfExamCount,
            ],
            backgroundColor,
          },
        ],
      }}
    />
  );
});

export default ParentChart;
