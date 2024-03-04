import { useState } from "react";
import { useAppDispatch } from "../../app/store/hooks";
import { client, setCurrentRepo } from "../../shared/slice/reposSlice";
import { gql } from "@apollo/client";

const GET_REPO = gql`
  query repository($id: ID!) {
    node(id: $id) {
      ... on Repository {
        id
        name
        pushedAt
        url
        languages(first: 10) {
          nodes {
            name
          }
        }
        stargazerCount
        owner {
          avatarUrl
          login
          url
        }
        description
      }
    }
  }
`;

const useGetRepo = () => {
  const [repository /* , setRepository */] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const searchRepository = async (id: string | number | undefined) => {
    setLoading(true);
    setError(null);

    try {
      await client
        .query({
          query: GET_REPO,
          variables: {
            id: id,
          },
        })
        .then((response) => dispatch(setCurrentRepo(response.data.node)));
    } catch (error) {
      if (error instanceof Error) setError((error) => error);
    }

    setLoading(false);
  };
  return { repository, loading, error, searchRepository };
};

export default useGetRepo;
