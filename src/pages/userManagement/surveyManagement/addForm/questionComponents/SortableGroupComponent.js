import React, { useState, useEffect } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import SingleQuestion from './SingleQuestion';
import { updateQuestionsOrder } from '../../../../../store/slice/formsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestionsOfForm } from '../../../../../store/slice/formsSlice';

const SortableGroupComponent = ({ preview, setPreview, groupKnowledge, questionsOfForm }) => {
  const dispatch = useDispatch();

  const [listData, setListData] = useState(groupKnowledge.questions);

  useEffect(() => {
    setListData(groupKnowledge.questions);
  }, [groupKnowledge]);

  useEffect(() => {}, [listData]);

  const SortableItem = SortableElement(
    ({ value, index, groupKnowledge, preview, setPreview, questionsOfForm }) => (
      <SingleQuestion
        preview={preview}
        setPreview={setPreview}
        index={index}
        questionKnowledge={value}
        groupKnowledge={groupKnowledge}
        questionsOfForm={questionsOfForm}
      />
    ),
  );
  const SortableList = SortableContainer(
    ({ items, groupKnowledge, preview, setPreview, questionsOfForm }) => {
      return (
        <div className="list">
          {items.map((value, index) => (
            <SortableItem
            pressThreshold={20}
              disableAutoscroll
              preview={preview}
              setPreview={setPreview}
              value={value}
              index={index}
              key={value.id}
              groupKnowledge={groupKnowledge}
              questionsOfForm={questionsOfForm}
            />
          ))}
        </div>
      );
    },
  );
  const onSortEnd = async ({ oldIndex, newIndex }) => {
    let oldData = [];
    for (let i = 0; i < listData.length; i++) {
      oldData.push(listData[i].id);
    }
    let arr = arrayMoveImmutable(listData, oldIndex, newIndex);
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      data.push(arr[i].id);
    }
    let newOb = {
      formId: groupKnowledge.formId,
      questionIds: data,
    };
    setListData(arr);
    if (JSON.stringify(oldData) === JSON.stringify(data)) {
      return false;
    }
    await dispatch(updateQuestionsOrder(newOb));
    await dispatch(getAllQuestionsOfForm({ formId: groupKnowledge.formId }));
  };
  return (
    <>
      <SortableList
        preview={preview}
        setPreview={setPreview}
        items={listData}
        onSortEnd={onSortEnd}
        groupKnowledge={groupKnowledge}
        axis="xy"
        questionsOfForm={questionsOfForm}
      />
    </>
  );
};

export default SortableGroupComponent;
