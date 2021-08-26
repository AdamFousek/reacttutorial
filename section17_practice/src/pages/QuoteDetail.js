import Comments from './../components/comments/Comments';
import { Fragment } from 'react';
import { Route, useParams, Link } from 'react-router-dom';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import NoQuoteFound from '../components/quotes/NoQuotesFound';

const DUMMY_DATA = [
  { id: 'q1', author: 'Max', text: 'This is first quote!' },
  { id: 'q2', author: 'Adam', text: 'This is super quote!' }
];

const QuoteDetail = () => {
  const params = useParams();
  const quote = DUMMY_DATA.find(item => item.id === params.quoteId)
  if (!quote) {
    return (
      <NoQuoteFound />
    );
  }
  return (
    <Fragment>
      <HighlightedQuote author={quote.author} text={quote.text} />
      <Route path={`/quotes/${quote.id}`} exact>
        <div className='centered'>
          <Link to={`/quotes/${quote.id}/comments`} className='btn--flat'>Load comments</Link>
        </div>
      </Route>
      <Route path={`/quotes/${quote.id}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
}

export default QuoteDetail;