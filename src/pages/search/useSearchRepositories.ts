import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { client, searchRepos, setLoading } from "../../shared/slice/reposSlice";
import { gql } from "@apollo/client";

const GET_SEARCHED_REPOS = gql`
  query SearhRepos($query: String!) {
    search(query: $query, type: REPOSITORY, first: 100) {
      nodes {
        ... on Repository {
          id
          name
          pushedAt
          stargazerCount
          url
        }
      }
    }
  }
`;

const useSearchRepositories = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.repos.loading);
  const [searchResults] = useState(null);
  const [error, setError] = useState(null);
  const searchRepositories = async (searchQuery: string) => {
    dispatch(setLoading());
    setError(null);
    try {
      await client
        .query({
          query: GET_SEARCHED_REPOS,
          variables: {
            query: searchQuery,
          },
        })
        .then((response) => dispatch(searchRepos(response.data.search.nodes)));
    } catch (error) {
      if (error instanceof Error) setError((error) => error);
    }
    dispatch(setLoading());
  };
  return { searchResults, loading, error, searchRepositories };
};

export default useSearchRepositories;
