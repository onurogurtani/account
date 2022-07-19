import { useLang } from '../context';

const Text = ({ t }) => {
  const { dictionary } = useLang();

  return <>{dictionary[t] || t}</>;
};

export const useText = (t) => {
  const { dictionary } = useLang();
  return dictionary[t] || t;
};

export default Text;
