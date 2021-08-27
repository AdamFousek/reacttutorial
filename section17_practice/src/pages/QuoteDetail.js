import Comments from './../components/comments/Comments';
import { Fragment, useEffect } from 'react';
import { Route, useParams, Link, useRouteMatch } from 'react-router-dom';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import NoQuoteFound from '../components/quotes/NoQuotesFound';

import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const QuoteDetail = () => {
  const { sendRequest, status, data: quote, error } = useHttp(getSingleQuote, true);
  const match = useRouteMatch();
  const params = useParams();

  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  if (status === 'pending') {
    return <LoadingSpinner className='centered' />
  }

  if (error) {
    return <div className='centered'>
      <p className='focused'>{error}</p>
    </div>
  }

  if (!quote.text) {
    return (
      <NoQuoteFound />
    );
  }
  return (
    <Fragment>
      <HighlightedQuote author={quote.author} text={quote.text} />
      <Route path={match.path} exact>
        <div className='centered'>
          <Link to={`${match.url}/comments`} className='btn--flat'>Load comments</Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
}

export default QuoteDetail;