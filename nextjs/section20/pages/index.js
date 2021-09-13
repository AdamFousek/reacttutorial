import { MongoClient } from "mongodb";

import Head from 'next/head'
import { Fragment } from 'react';
import MeetupList from "../components/meetups/MeetupList";

const HomePage = ({ meetups }) => {
  return (<Fragment>
    <Head>
      <title>React meetups</title>
      <meta name="description" content="My react app for meetups" />
    </Head>
    <MeetupList meetups={meetups} />
  </Fragment>);
}

export const getStaticProps = async () => {
  const client = await MongoClient.connect('mongodb+srv://admin:admin@cluster0.linfz.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 60
  };
};

export default HomePage;