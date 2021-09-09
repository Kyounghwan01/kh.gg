import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { userProps } from 'types/usetStore.type';
import { champProps } from 'types/champStore.type';
import MainLayout from 'component/MainLayout';

interface HomeContainerProps {
  userStore: userProps;
  champStore: champProps;
}

const Search = ({ userStore, champStore }: HomeContainerProps) => {
  const history = useHistory();
  const [userName, setUserName] = useState<string>('hide on bush');

  useEffect(() => {
    if (Object.keys(champStore.champs).length) return;

    champStore.getAllChamps();
  }, [champStore]);

  useEffect(() => {
    if (userStore.done) {
      history.push('/user');
    }
  }, [history, userStore.done]);

  const onChangeSummerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const searchUserName = () => {
    userStore.search(userName);
  };

  const SearchEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !(userStore.loading || champStore.champLoading || !userName.length)) {
      searchUserName();
    }
  };

  return (
    <MainLayout>
      <Container>
        <LogoImg src="https://attach.s.op.gg/logo/20201214011237.689bfe043f3bb36db950d9a0043a03c8.png" />
        <AlertMessage>
          {(userStore.loading || champStore.champLoading) && <span className="loading">로딩중!</span>}
          {!userStore.loading && userStore.errorMessage && <span className="error">{userStore.errorMessage}</span>}
        </AlertMessage>
        <div className="search-box">
          <Input
            onKeyPress={SearchEnter}
            type="text"
            value={userName}
            onChange={onChangeSummerName}
            disabled={userStore.loading || champStore.champLoading || !userName.length}
            placeholder="소환사 이름을 입력해주세요!"
          />
          <SearchBtn disabled={userStore.loading || champStore.champLoading || !userName.length} onClick={searchUserName}>
            .GG
          </SearchBtn>
        </div>
      </Container>
    </MainLayout>
  );
};

const Container = styled.div`
  height: 94vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  background: #5383e8;
  /* background: black; */
  .search-box {
    position: relative;
    top: -80px;
    margin: 0 auto;
  }
`;

const LogoImg = styled.img`
  display: block;
  max-height: 200px;
`;

const Input = styled.input`
  width: 600px;
  height: 60px;
  color: grey;
  border-radius: 5px;
  border: 1px solid grey;
  font-size: 20px;
  padding-left: 30px;
  &:focus {
    outline: none;
  }
`;

const SearchBtn = styled.button<{ disabled: boolean }>`
  background: ${props => (props.disabled ? 'grey' : 'dodgerblue')};
  border: none;
  color: white;
  font-weight: bold;
  height: 30px;
  position: absolute;
  top: 15px;
  right: 10px;
  border-radius: 5px;
  width: 60px;
  &:hover {
    cursor: ${props => (props.disabled ? '' : 'pointer')};
  }
`;

const AlertMessage = styled.div`
  span {
    color: white;
    font-size: 20px;
    font-weight: bold;
  }
`;

export default inject('userStore', 'champStore')(observer(Search));
