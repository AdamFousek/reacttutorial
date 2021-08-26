import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAsc = queryParams.get('sort') === 'asc';

  const sortedQuotes = sortQuotes(props.quotes, isSortingAsc);

  const changeSortingHandler = () => {
    if (isSortingAsc) {
      history.push('/quotes?sort=desc');
    } else {
      history.push('/quotes?sort=asc');
    }
  }
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {isSortingAsc ? 'Desc' : 'Asc'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;