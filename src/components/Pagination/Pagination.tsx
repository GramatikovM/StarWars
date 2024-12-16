import { useState } from "react";
import Button from "../Button/Button";
import styles from "./Pagination.module.css";

type PaginationProps = {
  nPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<number>;
};

const Pagination: React.FC<PaginationProps> = ({
  nPages,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  const [activePage, setActivePage] = useState(1);
  const goToNextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
      setActivePage(currentPage + 1);
    }
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setActivePage(currentPage - 1);
    }
  };

  return (
    <div className={styles.paginationContainer}>
      <Button text="Previous" onClick={goToPrevPage} />

      {pageNumbers.map((pageNum) => (
        <Button
          key={pageNum}
          text={`${pageNum}`}
          onClick={() => {
            setCurrentPage(pageNum);
            setActivePage(pageNum);
          }}
          className={pageNum === activePage ? styles.activePage : ""}
        />
      ))}

      <Button text="Next" onClick={goToNextPage} />
    </div>
  );
};

export default Pagination;
