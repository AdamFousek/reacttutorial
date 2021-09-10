import Link from 'next/link';
import { Fragment } from "react";

const NewsPage = () => {
  return <Fragment>
    <h1>The news page</h1>
    <ul>
      <li>
        <Link href='news/this-is-new-article'>
          This is new article
        </Link>
      </li>
      <li>
        <Link href='news/new-article-incoming'>
          New article incoming
        </Link>
      </li>
    </ul>
  </Fragment>
}

export default NewsPage;