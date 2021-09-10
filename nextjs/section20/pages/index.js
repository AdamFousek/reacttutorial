import MeetupList from "../components/meetups/MeetupList";

const DUMMY_DATA = [
  { id: '1', title: 'First meetup', address: 'Some street 1', image: 'https://picsum.photos/750/300', description: 'This is meetup description' },
  { id: '2', title: 'Second meetup', address: 'Some street 1', image: 'https://picsum.photos/750/300', description: 'This is second meetup description' },
];

const HomePage = () => {
  return <MeetupList meetups={DUMMY_DATA}></MeetupList>
}

export default HomePage;