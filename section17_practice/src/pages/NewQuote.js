import { useHistory } from 'react-router-dom';

import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {
  const history = useHistory();
  const onAddDataHandler = (data) => {
    console.log(data);

    history.replace('/quotes');
  };
  return (
    <QuoteForm onAddQuote={onAddDataHandler} />
  );
}

export default NewQuote;