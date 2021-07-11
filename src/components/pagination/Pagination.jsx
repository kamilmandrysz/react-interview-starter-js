import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Page from "components/pagination/components/page";
import Dots from "components/pagination/components/dots";
import FirstLastPage from "components/pagination/components/firstLastPage/FirstLastPage";

const Pagination = ({ totalPages, onChange }) => {
  const { currentPage } = useSelector((state) => state.products);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPagination = () => {
    if (totalPages <= 6) {
      return pageNumbers.map((e) => {
        if (e === totalPages) {
          return (
            <Page key={e} currentPage={currentPage} onChange={onChange} isLast>
              {e}
            </Page>
          );
        }
        return (
          <Page key={e} currentPage={currentPage} onChange={onChange}>
            {e}
          </Page>
        );
      });
    } else if (currentPage === 1) {
      return pageNumbers.map((e) => {
        if (
          e === currentPage ||
          e === currentPage + 1 ||
          e === currentPage + 2 ||
          e === totalPages - 2 ||
          e === totalPages - 1 ||
          e === totalPages
        ) {
          if (e === currentPage + 2) {
            return (
              <>
                <Page key={e} currentPage={currentPage} onChange={onChange}>
                  {e}
                </Page>
                <Dots key="dots" />
              </>
            );
          } else if (e === totalPages) {
            return (
              <Page
                key={e}
                currentPage={currentPage}
                onChange={onChange}
                isLast
              >
                {e}
              </Page>
            );
          }

          return (
            <Page key={e} currentPage={currentPage} onChange={onChange}>
              {e}
            </Page>
          );
        } else return null;
      });
    } else if (currentPage === totalPages) {
      return pageNumbers.map((e) => {
        if (
          e === 1 ||
          e === 2 ||
          e === 3 ||
          e === currentPage - 2 ||
          e === currentPage - 1 ||
          e === currentPage
        ) {
          if (e === 3) {
            return (
              <>
                <Page key={e} currentPage={currentPage} onChange={onChange}>
                  {e}
                </Page>
                <Dots key="dots" />
              </>
            );
          } else if (e === currentPage) {
            return (
              <Page
                key={e}
                currentPage={currentPage}
                onChange={onChange}
                isLast
              >
                {e}
              </Page>
            );
          }

          return (
            <Page key={e} currentPage={currentPage} onChange={onChange}>
              {e}
            </Page>
          );
        } else return null;
      });
    } else if (currentPage >= totalPages - 4) {
      return pageNumbers.map((e) => {
        if (
          e === 1 ||
          e === 2 ||
          e === 3 ||
          e === currentPage - 1 ||
          e === currentPage ||
          e === currentPage + 1
        ) {
          if (e === 3) {
            return (
              <>
                <Page key={e} currentPage={currentPage} onChange={onChange}>
                  {e}
                </Page>
                <Dots key="dots" />
              </>
            );
          } else if (e === currentPage + 1) {
            return (
              <Page
                key={e}
                currentPage={currentPage}
                onChange={onChange}
                isLast
              >
                {e}
              </Page>
            );
          }

          return (
            <Page key={e} currentPage={currentPage} onChange={onChange}>
              {e}
            </Page>
          );
        } else return null;
      });
    } else {
      return pageNumbers.map((e) => {
        if (
          e === currentPage - 1 ||
          e === currentPage ||
          e === currentPage + 1 ||
          e === totalPages - 2 ||
          e === totalPages - 1 ||
          e === totalPages
        ) {
          if (e === currentPage + 1) {
            return (
              <>
                <Page key={e} currentPage={currentPage} onChange={onChange}>
                  {e}
                </Page>
                <Dots key="dots" />
              </>
            );
          } else if (e === totalPages) {
            return (
              <Page
                key={e}
                currentPage={currentPage}
                onChange={onChange}
                isLast
              >
                {e}
              </Page>
            );
          }

          return (
            <Page key={e} currentPage={currentPage} onChange={onChange}>
              {e}
            </Page>
          );
        } else return null;
      });
    }
  };

  return (
    <div className="d-flex justify-content-center w-100 mt-3 mt-md-4">
      <FirstLastPage
        isFirst
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={onChange}
      />
      {renderPagination()}
      <FirstLastPage
        isLast
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={onChange}
      />
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;
