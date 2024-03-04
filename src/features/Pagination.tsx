import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { setCurrentPage } from "../shared/slice/reposSlice";

export interface PaginationProps {
  perPage: number;
  total: number;
}

export default function Pagination({ perPage, total }: PaginationProps) {
  const pageNumbers = [];
  const dispatch = useAppDispatch();
  const paginate = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }
  const currentPage = useAppSelector((state) => state.repos.currentPage);
  return (
    <div>
      <ul className="flex">
        {pageNumbers.map((number) => (
          <a key={number} onClick={() => paginate(number)}>
            <li
              className={
                currentPage === number
                  ? "text-stone-950 list-none ml-2 text-xl cursor-not-allowed"
                  : "list-none ml-2 text-xl"
              }
            >
              {number}
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
}
