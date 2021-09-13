import { useRouter } from "next/router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (data) => {
    const response = await fetch('/api/new-meetup',
      {
        method: 'POST',
        body: JSON.stringify({
          title: data.title,
          image: data.image,
          address: data.address,
          description: data.description
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

    const responsData = await response.json();

    console.log(responsData);

    router.replace('/');
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetupPage;