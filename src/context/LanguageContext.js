import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { dictionaryList, languageOptions } from '../assets/language';
import { languageStorageKey } from '../utils/keys';

const initialContext = {
  language: languageOptions.turkey,
  dictionary: dictionaryList.tr,
};

const LanguageContext = createContext(initialContext);

export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState(languageOptions.turkey);

  useEffect(() => {
    if (window.localStorage.getItem(languageStorageKey)) {
      setLanguage(JSON.parse(window.localStorage.getItem(languageStorageKey)));
    }
  }, []);

  const languageChange = useCallback(
    (values) => {
      setLanguage(values);
      window.localStorage.setItem(languageStorageKey, JSON.stringify(values));
    },
    [setLanguage],
  );

  const value = React.useMemo(
    () => ({
      language,
      languageChange,
      dictionary: dictionaryList[language],
    }),
    [language, languageChange],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (context?.dictionary === undefined) {
    return { ...context, dictionary: {}, language: languageOptions.turkey };
  }
  return context;
};
