import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";

import {
  setProductsCurrentPageAction,
  fetchProductsWithFilters,
  setProductsAction,
} from "store/products/actions";

import { INLINE_PAGINATION, LINKS_DISPLAY } from "constants/pagination";
import { ITEMS_PER_PAGE } from "constants/products";

import Link from "components/pagination/components/link";
import Dots from "components/pagination/components/dots";

const Pagination = () => {
  const dispatch = useDispatch();
  const [paginationLinks, setPaginationLinks] = useState([]);
  const {
    meta: { totalPages },
    currentPage,
    filters,
  } = useSelector((state) => state.products);

  const handleLinkClick = (page) => {
    const params = { limit: ITEMS_PER_PAGE, page };
    const paramsString = queryString.stringify(params, {
      arrayFormat: "comma",
    });

    fetchProductsWithFilters(paramsString).then((res) => {
      const { items, meta, links } = res.data;

      dispatch(setProductsAction(items, meta, links));
      dispatch(setProductsCurrentPageAction(meta.currentPage));
    });
  };

  const renderPagination = () => {
    const links = [];
    if (totalPages === 0) {
      setPaginationLinks(links);
      return;
    }

    links.push(
      <Link
        className="mr-4"
        isInactive={currentPage === 1}
        label="First"
        onClick={() => handleLinkClick(1)}
      />
    );

    if (totalPages <= INLINE_PAGINATION) {
      for (let i = 1; i <= totalPages; i++) {
        links.push(
          <Link
            className={i !== totalPages && "mr-3"}
            isActive={i === currentPage}
            label={i}
            onClick={() => handleLinkClick(i)}
          />
        );
      }
    } else if (currentPage === 1) {
      for (let i = 0; i <= LINKS_DISPLAY; i++) {
        links.push(
          <Link
            className="mr-3"
            isActive={i + 1 === currentPage}
            label={i + 1}
            onClick={() => handleLinkClick(i + 1)}
          />
        );
      }
      links.push(<Dots />);
      for (let i = LINKS_DISPLAY; i >= 0; i--) {
        links.push(
          <Link
            className={i !== 0 && "mr-3"}
            label={totalPages - i}
            onClick={() => handleLinkClick(totalPages - i)}
          />
        );
      }
    } else {
      for (let i = currentPage - 1; i <= LINKS_DISPLAY + currentPage - 1; i++) {
        links.push(
          <Link
            className="mr-3"
            isActive={i === currentPage}
            label={i}
            onClick={() => handleLinkClick(i)}
          />
        );
      }
      links.push(<Dots />);
      for (let i = LINKS_DISPLAY; i >= 0; i--) {
        links.push(
          <Link
            className={i !== 0 && "mr-3"}
            label={totalPages - i}
            onClick={() => handleLinkClick(totalPages - i)}
          />
        );
      }
    }

    links.push(
      <Link
        className="ml-4"
        isInactive={currentPage === totalPages}
        label="Last"
        onClick={() => handleLinkClick(totalPages)}
      />
    );

    setPaginationLinks(links);
  };

  useEffect(() => {
    if (totalPages) {
      renderPagination();
    }
  }, [currentPage, totalPages]);

  useEffect(() => {}, [filters]);

  return (
    <div className="d-flex justify-content-center mt-4 mt-lg-5">
      <div className="d-flex">{paginationLinks}</div>
    </div>
  );
};

export default Pagination;
