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
  const [userName, setUserName] = useState<string>('');

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
    setUserName('');
  };

  const SearchEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !(userStore.loading || !userName.length)) {
      searchUserName();
    }
  };

  return (
    <MainLayout>
      <Container>
        <LogoImg src="https://attach.s.op.gg/logo/20201214011237.689bfe043f3bb36db950d9a0043a03c8.png" />
        <Input onKeyPress={SearchEnter} type="text" value={userName} onChange={onChangeSummerName} placeholder="소환사 이름을 입력해주세요!" />
        <SearchBtn disable={userStore.loading || !userName.length} disabled={userStore.loading || !userName.length} onClick={searchUserName}>
          .GG
        </SearchBtn>

        <AlertMessage>
          {userStore.loading && <span className="loading">로딩중!</span>}
          {!userStore.loading && userStore.errorMessage && <span className="error">{userStore.errorMessage}</span>}
        </AlertMessage>
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
`;

const LogoImg = styled.img`
  display: block;
  max-height: 200px;
`;

const Input = styled.input`
  width: 800px;
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

const SearchBtn = styled.button<{ disable: boolean }>`
  background: ${props => (props.disable ? 'grey' : 'dodgerblue')};
  border: none;
  color: white;
  font-weight: bold;
  height: 30px;
  position: relative;
  bottom: 160px;
  left: 350px;
  border-radius: 5px;
  width: 60px;
  &:hover {
    cursor: ${props => (props.disable ? '' : 'pointer')};
  }
`;

const AlertMessage = styled.div`
  position: absolute;
  span {
    color: white;
    font-size: 20px;
    font-weight: bold;
  }
`;

export default inject('userStore', 'champStore')(observer(Search));
