import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { fetchRepos } from "../../../shared/slice/reposSlice";
import Pagination from "../../../features/Pagination";
import RepoItem from "../../../widgets/repoItem/ui/RepoItem";
import { Flex } from "antd";
import Loader from "../../../widgets/loader/ui/Loader";

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

export default function HomePage() {
  const repos = useAppSelector((state) => state.repos.repos);
  const currentPage = useAppSelector((state) => state.repos.currentPage);
  const reposPerPage = useAppSelector((state) => state.repos.reposPerPage);

  const lastRepoIndex = currentPage * reposPerPage;
  const firstRepoIndex = lastRepoIndex - reposPerPage;
  const currentRepo = repos.slice(firstRepoIndex, lastRepoIndex);

  const loading = useAppSelector((state) => state.repos.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRepos());
  }, [dispatch]);
  if (loading === "loading") return <Loader />;
  if (repos)
    return (
      <Flex className="mb-4" justify="center" align="center" vertical>
        {currentRepo.map((repo: Repo) => {
          return <RepoItem repo={repo} key={repo.id} />;
        })}
        <Pagination perPage={reposPerPage} total={repos?.length} />
      </Flex>
    );
}
