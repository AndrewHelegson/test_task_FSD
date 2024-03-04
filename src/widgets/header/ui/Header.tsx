import { Input, Layout } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import useSearchRepositories from "../../../pages/search/useSearchRepositories";
import { setCurrentPage, setValue } from "../../../shared/slice/reposSlice";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export default function Header() {
  const navigate = useNavigate();

  const value = useAppSelector((state) => state.repos.value);
  const dispatch = useAppDispatch();
  const { searchRepositories } = useSearchRepositories();
  const handleClick = () => {
    navigate(`results/${value}`);
    dispatch(setCurrentPage(1));
    if (value.trim() === "") navigate("/");
    searchRepositories(value);
    dispatch(setValue(""));
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`results/${value}`);
      dispatch(setCurrentPage(1));
      if (value === "") navigate("/");
      searchRepositories(value);
      dispatch(setValue(""));
    }
  };
  return (
    <Layout.Header className="bg-slate-600 flex  items-center ">
      <Search
        value={value}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          dispatch(setValue(e.target.value));
        }}
        className="w-3/5 mx-auto"
        placeholder="поиск по репозиториям"
        enterButton="Искать"
        size="large"
        loading={false}
        onClick={() => handleClick()}
      />
    </Layout.Header>
  );
}
