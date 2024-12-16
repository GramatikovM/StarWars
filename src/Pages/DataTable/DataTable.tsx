import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { useAuth } from "../../context/authContext";
import getData from "../../services/getApiData";
import { checkCacheValidity } from "../../helpers/checkCacheValidity";
import type { Post } from "../../types";
import Pagination from "../../components/Pagination/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Modal from "../../components/Modal/Modal";

import styles from "./DataTable.module.css";

const DataTable = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * postsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - postsPerPage;
  const currentPosts = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / postsPerPage);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          if (checkCacheValidity()) {
            const cachedData = localStorage.getItem("CACHED_POSTS");
            if (cachedData) {
              setData(JSON.parse(cachedData));
              setLoading(false);
              return;
            }
          }

          setLoading(true);
          const response = await getData();
          setData(response.data);
          setError(null);

          localStorage.setItem("CACHED_POSTS", JSON.stringify(response.data));
          localStorage.setItem(
            "CACHE_EXPIRY_KEY",
            (Date.now() + 300000).toString()
          );
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.message === "Network Error") {
            setIsOffline(true);
            setIsModalOpen(true);
          } else {
            setError(err.message || "Something went wrong.");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (isOffline) {
    return (
      <Modal
        isOpen={isModalOpen}
        message={"No Internet connection."}
        imageUrl="/connection_fail.webp"
        onClose={closeModal}
      />
    );
  }

  if (error) {
    return (
      <div className={styles.errorMessage}>
        <p>{error}</p>
      </div>
    );
  }

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.tableWrapper}>
      <h2 className={styles.tableHeader}>Posts Table</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.rowHeader}>User ID</th>
            <th className={styles.rowHeader}>Title</th>
            <th className={styles.rowHeader}>Body</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td
                className={`${styles.userId} ${styles.data}`}
                data-label="User ID"
              >
                {post.userId}
              </td>
              <td className={styles.data} data-label="Title">
                {post.title}
              </td>
              <td className={styles.data} data-label="Body">
                {post.body}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DataTable;
