import { Flex } from "antd";
import { useAppSelector } from "../../../app/store/hooks";
import Pagination from "../../../features/pagination/Pagination";
import Empty from "../../../widgets/empty/ui/Empty";
import Loader from "../../../widgets/loader/ui/Loader";
import RepoItem from "../../../widgets/repoItem/ui/RepoItem";

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

export default function Results() {
  const repos = useAppSelector((state) => state.repos.searchedRepos);
  const currentPage = useAppSelector((state) => state.repos.currentPage);
  const reposPerPage = useAppSelector((state) => state.repos.reposPerPage);
  const lastRepoIndex = currentPage * reposPerPage;
  const firstRepoIndex = lastRepoIndex - reposPerPage;
  const currentRepo = repos.slice(firstRepoIndex, lastRepoIndex);

  const loading = useAppSelector((state) => state.repos.loading);
  if (loading) {
    return <Loader />;
  }
  if (repos.length === 0) {
    return <Empty />;
  }

  if (repos) {
    return (
      <Flex className="mb-4" justify="center" align="center" vertical>
        {repos.length > 0 &&
          currentRepo.map((repo: Repo) => (
            <RepoItem key={repo.url} repo={repo} />
          ))}
        <Pagination perPage={reposPerPage} total={repos?.length} />
      </Flex>
    );
  }
}
