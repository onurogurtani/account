import React from 'react';
import '../../../../styles/temporaryFile/asEv.scss';

const QuestionKnowledgeList = ({ data, currentSlideIndex }) => {
  return (
    <div className="newQuestion-knowledge">
      <h4>Soru Bilgileri</h4>
      <ul className="question-knowledge-list">
        <li>
          Ders: <span>Matematik</span>
          {/* {Item.lesson.name}  gelen verideki değer bu mu kontrol etm lazım*/}
        </li>
        <li>
          Ünite: <span>Sayılar</span>
          {/* {Item.lessonUnits.name} gelen verideki değer bu mu kontrol etm lazım */}
        </li>
        <li>
          Konu: <span>Bölme</span>
          {/* {Item.lessonSubjects.name}  gelen verideki değer bu mu kontrol etm lazım */}
        </li>
        <li>
          Alt Başlık: <span>Tam dayılarda bölme</span>
          {/* {Item.lessonSubSubjects.name}  gelen verideki değer bu mu kontrol etm lazım */}
        </li>
        <li>
          Zorluk: <span>5</span>
          {/* {Item.lessonSubSubjects.name}  gelen verideki değer bu mu kontrol etm lazım */}
        </li>
        <li>
          Kalite: <span>4</span>
          {/* {Item.lessonSubSubjects.name}  gelen verideki değer bu mu kontrol etm lazım */}
        </li>
        <li>
          Soru şekli: <span>Klasik</span>
          {/* {Item.lessonSubSubjects.name}  gelen verideki değer bu mu kontrol etm lazım */}
        </li>
        <li>
          Cevap: <span>B</span>
          {/* {Item.lessonSubSubjects.name}  gelen verideki değer bu mu kontrol etm lazım */}
        </li>
      </ul>
    </div>
  );
};

export default QuestionKnowledgeList;
