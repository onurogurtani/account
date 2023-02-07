import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getParticipantGroupsList,
  handleParticipantGroupTypeDeSelect,
  resetParticipantGroupsList,
} from '../../../store/slice/eventsSlice';
import { removeFromArray } from '../../../utils/utils';

const useParticipantGroups = (form, selectBoxName) => {
  const dispatch = useDispatch();
  const { participantGroupsList } = useSelector((state) => state?.events);

  useEffect(() => {
    return dispatch(resetParticipantGroupsList());
  }, []);

  const onParticipantGroupTypeSelect = (value) => {
    dispatch(
      getParticipantGroupsList({
        params: {
          'ParticipantGroupDetailSearch.ParticipantType': value,
          // 'ParticipantGroupDetailSearch.PageSize': 0,
        },
      }),
    );
  };

  const onParticipantGroupTypeDeSelect = (value, option) => {
    const arr1 = form.getFieldValue(selectBoxName);
    const arr2 = participantGroupsList.filter((i) => i.participantType === value).map((i) => i.id);

    dispatch(handleParticipantGroupTypeDeSelect(value));
    form.setFieldsValue({
      [selectBoxName]: removeFromArray(arr1, ...arr2),
    });
  };
  return { onParticipantGroupTypeSelect, onParticipantGroupTypeDeSelect, participantGroupsList };
};

export default useParticipantGroups;
