import { createContext, useContext } from 'react';

const EditableContext = createContext(null);

export const EditableContextProvider = ({ children, form }) => {
  return <EditableContext.Provider value={form}>{children}</EditableContext.Provider>;
};

export const useEditableContext = () => {
  return useContext(EditableContext);
};
