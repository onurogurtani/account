import { Col, Row, Statistic } from 'antd';
import '../../../../styles/reports/questionDifficulty/questionDifficultyStatistic.scss';

const QuestionDifficultyStatistic = ({ data }) => {
  return (
    <div className="question-difficulty-statistic">
      <Row gutter={16}>
        <Col span={4}>
          <Statistic title="Toplam Soru Sayısı" value={data?.totoalQuestionOfExamCount} />
        </Col>
        <Col span={4}>
          <Statistic title="Zorluk 1 için soru sayısı" value={data?.difficulty1QuestionOfExamCount} />
        </Col>
        <Col span={4}>
          <Statistic title="Zorluk 2 için soru sayısı" value={data?.difficulty2QuestionOfExamCount} />
        </Col>
        <Col span={4}>
          <Statistic title="Zorluk 3 için soru sayısı" value={data?.difficulty3QuestionOfExamCount} />
        </Col>
        <Col span={4}>
          <Statistic title="Zorluk 4 için soru sayısı" value={data?.difficulty4QuestionOfExamCount} />
        </Col>
        <Col span={4}>
          <Statistic title="Zorluk 5 için soru sayısı" value={data?.difficulty5QuestionOfExamCount} />
        </Col>
      </Row>
    </div>
  );
};

export default QuestionDifficultyStatistic;
