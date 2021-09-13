import { Head } from 'next/head';
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from 'react';


const MeetupDetailPage = ({ meetupData }) => {
  return <Fragment>
    <Head>
      <title>{meetupData.title}</title>
    </Head>
    <MeetupDetail
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
    />
  </Fragment>
}

export const getStaticPaths = async () => {
  const client = await MongoClient.connect('mongodb+srv://admin:admin@cluster0.linfz.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
  }
}

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect('mongodb+srv://admin:admin@cluster0.linfz.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description
      }
    }
  }
}

export default MeetupDetailPage;