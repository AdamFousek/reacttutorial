import QuoteList from './../components/quotes/QuoteList';

const DUMMY_DATA = [
  { id: 'q1', author: 'Max', text: 'This is first quote!' },
  { id: 'q2', author: 'Adam', text: 'This is super quote!' }
];

const Quotes = () => {
  return (
    <QuoteList quotes={DUMMY_DATA} />
  );
}

export default Quotes;