import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export interface Repo {
  description: string;
  id: string;
  languages: {
    nodes: { name: string }[];
  };
  name: string;
  owner: {
    avatarUrl: string;
    login: string;
    url: string;
  };
  pushedAt: string;
  stargazerCount: number;
  url: string;
}
export type ReposState = {
  repos: Repo[];
  searchedRepos: Repo[];
  status: null | "rejected" | "loading" | "resolved";
  error: null | string;
  value: string;
  currentRepo: Repo | null;
  loading: boolean;
  currentPage: number;
  reposPerPage: number;
};
interface Action {
  payload: any;
  type: string;
}
const GET_MY_REPOS = gql`
  query {
    viewer {
      repositories(first: 100) {
        nodes {
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
export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_SOME_KEY}`,
  },
});

export const fetchRepos = createAsyncThunk(
  "repos/fetchRepos",
  async function () {
    const response = await client.query({
      query: GET_MY_REPOS,
    });
    const data = await response;
    return data;
  }
);
const setError = (state: ReposState, action: Action) => {
  state.status = "rejected";
  state.error = action.payload;
};
/* const repos =
  localStorage.getItem("repos") !== null
    ? JSON.parse(localStorage.getItem("repos") || "")
    : []; */
const repos: Repo[] = [];
/* const page =
  localStorage.getItem("page") !== null
    ? JSON.parse(localStorage.getItem("page") || "")
    : 1; */
const page = 1;

const initialState: ReposState = {
  repos: [],
  searchedRepos: repos,
  status: null,
  error: null,
  value: "",
  currentRepo: null,
  loading: false,
  currentPage: page,
  reposPerPage: 10,
};
const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    setRepos(state, action) {
      state.repos = action.payload;
    },
    setValue(state, action) {
      state.value = action.payload;
    },
    searchRepos(state, action) {
      state.searchedRepos = action.payload;
      localStorage.setItem(
        "repos",
        JSON.stringify(state.searchedRepos.map((r: Repo) => r))
      );
    },
    setCurrentRepo(state, action) {
      state.currentRepo = action.payload;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
      localStorage.setItem("page", JSON.stringify(state.currentPage));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.status = "resolved";
        state.repos = action.payload.data.viewer.repositories.nodes;
      })
      .addCase(fetchRepos.rejected, setError);
  },
});

export const {
  setRepos,
  setValue,
  searchRepos,
  setCurrentRepo,
  setLoading,
  setCurrentPage,
} = reposSlice.actions;

export default reposSlice.reducer;
