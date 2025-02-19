import "./Paginate.css";
import { Pagination } from "../../Interfaces";
import { Link } from "react-router-dom";

const Paginate = ({
  Pagination,
  onPageChange,
}: {
  Pagination: Pagination | null;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation example mx-auto">
        <ul className="pagination">
          {Pagination?.prev_page_url && (
            <li className="page-item">
              <Link
                to={""}
                onClick={() => onPageChange(Pagination.current_page - 1)}
                className="page-link text-danger fw-bold bg-warning"
              >
                Previous
              </Link>
            </li>
          )}

          {Array.from({ length: Pagination?.last_page || 1 }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                Pagination?.current_page === index + 1 ? "active" : ""
              }`}
            >
              <Link
                to={""}
                onClick={() => onPageChange(index + 1)}
                className="page-link text-danger fw-bold bg-warning"
              >
                {index + 1}
              </Link>
            </li>
          ))}

          {Pagination?.next_page_url && (
            <li className="page-item">
              <Link
                to={""}
                onClick={() => onPageChange(Pagination.current_page + 1)}
                className="page-link text-danger fw-bold bg-warning"
              >
                Next
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Paginate;
