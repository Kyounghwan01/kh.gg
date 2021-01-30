import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { userProps } from 'types/usetStore.type';
import useStores from 'lib/useStores';
import styled from 'styled-components';

const Pagenation = () => {
  const { userStore }: { userStore: userProps } = useStores();
  const [pageLength, setPageLength] = useState<number[]>([]);

  useEffect(() => {
    const pageNumber = [];
    for (let i = 1; i <= userStore.pageParams.lastPage; i++) {
      pageNumber.push(i);
    }
    setPageLength(pageNumber);
  }, [userStore.pageParams.lastPage]);

  const goPage = (pageNumber: number) => {
    if (!userStore.loading && userStore.pageParams.currentPage !== pageNumber) {
      userStore.searchPage(pageNumber);
    }
  };

  return (
    <PageStyle $pageParam={userStore.pageParams} $loading={userStore.loading}>
      {userStore.loading && <span>로딩중!</span>}
      <span className="before-icon" onClick={() => (userStore.pageParams.currentPage > 1 ? goPage(userStore.pageParams.currentPage - 1) : null)}>
        {'<'}
      </span>
      {pageLength.map(pageNum => (
        <PageNumber
          key={pageNum}
          $currentPage={userStore.pageParams.currentPage}
          $index={pageNum}
          $loading={userStore.loading}
          onClick={() => goPage(pageNum)}>
          {pageNum}
        </PageNumber>
      ))}
      <span
        className="next-icon"
        onClick={() => (userStore.pageParams.currentPage !== userStore.pageParams.lastPage ? goPage(userStore.pageParams.currentPage + 1) : null)}>
        {'>'}
      </span>
    </PageStyle>
  );
};

const PageStyle = styled.div<{ $pageParam: { lastPage: number; currentPage: number }; $loading: boolean }>`
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  margin: 0 auto;
  padding: 30px;
  .before-icon {
    color: ${props => (props.$pageParam.currentPage === 1 ? '#cccccc' : '#555')};
    &:hover {
      cursor: ${props => (props.$pageParam.currentPage === 1 || props.$loading ? 'not-allowed' : 'pointer')};
    }
  }
  .next-icon {
    color: ${props => (props.$pageParam.currentPage === props.$pageParam.lastPage ? '#cccccc' : '#555')};
    &:hover {
      cursor: ${props => (props.$pageParam.currentPage === props.$pageParam.lastPage || props.$loading ? 'not-allowed' : 'pointer')};
    }
  }
`;

const PageNumber = styled.span<{ $index: number; $currentPage: number; $loading: boolean }>`
  color: ${props => (props.$index === props.$currentPage ? 'dodgerblue' : 'black')};
  &:hover {
    cursor: ${props => (props.$loading ? 'not-allowed' : 'pointer')};
  }
`;

export default observer(Pagenation);
