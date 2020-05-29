import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

function DogPhoto({ breed }) {
    const { loading, error, data, refetch, networkStatus } = useQuery(
      GET_DOG_PHOTO,
      {
        variables: { breed },
        skip: !breed,
        notifyOnNetworkStatusChange: true,
      },
    );
  
    if (networkStatus === 4) return 'Refetching!';
    if (loading) return null;
    if (error) return `Error! ${error}`;
  
    return (
      <div>
        <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
        <button onClick={() => refetch()}>Refetch!</button>
      </div>
    );
  }