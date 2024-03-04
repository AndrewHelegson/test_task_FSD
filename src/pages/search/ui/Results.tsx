import { Flex } from "antd";
import Empty from "../../../widgets/empty/ui/Empty";
import Loader from "../../../widgets/loader/ui/Loader";
import Pagination from "../../../features/Pagination";
import RepoItem from "../../../widgets/repoItem/ui/RepoItem";
import { useAppSelector } from "../../../app/store/hooks";
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
          currentRepo.map((repo: any) => (
            <RepoItem key={repo.url} repo={repo} />
          ))}
        <Pagination perPage={reposPerPage} total={repos?.length} />
      </Flex>
    );
  }
}
