import styled from "styled-components";
import { Link } from "react-router-dom";
import {useQuery} from "@tanstack/react-query"
import { fetchCoins } from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon,faSun } from '@fortawesome/free-solid-svg-icons'
import { useSetRecoilState } from "recoil";
import { isDark } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  position:relative;
`

//다크모드,차트

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
`;

const Title = styled.h1`
  font-size: 52px;
  font-weight: 900;
  color: ${(props) => props.theme.titleColor};
  @media screen and (max-width: 650px) {
    font-size:46px;
  }
  @media screen and (max-width: 520px) {
    font-size:36px;
  }
  @media screen and (max-width: 440px) {
    font-size:24px;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Coin = styled.li`
  background-color: ${(props)=>props.theme.ItemBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  /* padding: 20px; */
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: all 0.2s ease-in;
  }
  &:hover {
    a {
      font-size:20px;
    }
  }
`;

export const NavigationContainer = styled.div`
  position:fixed;
  top:20px;
  left:20px;
  z-index: 99;
`

export const NavigationBorder = styled.div`
  width:1.8em;
  height:1.8em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background-color: ${(props)=>props.theme.ItemBgColor};
  color: ${(props)=>props.theme.IconColor};
  /* &:hover{
    font-size:24px;
    transition: all 0.1s;
  } */
  @media screen and (max-width:550px) {
    font-size: 1.5rem;
    width:1.8em;
    height: 1.8em;
  }
  @media screen and (max-width:360px) {
    font-size: 1rem;
    width:1.8em;
    height: 1.8em;
  }
  cursor: pointer;
`

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

// 특정한 시기에만 코드를 실행하기 위해선 useEffect를 사용한다.

/* . 
async랑 await이랑 다른 많은 것들을 사용하고 싶으니
여기에 function 하나를 더 만들기는 싫고 모두 다 useEffect안에서 할 것이다.

멋진 트릭 : 그 자리에서 function을 excute(실행)할 수 있다.
*/

function Coins() {
  const {isLoading,data} = useQuery<ICoin[]>(["allCoins"],fetchCoins);
  
  const iconChange = useSetRecoilState(isDark)

  const toggeleDarkAtom = ()=>{
    iconChange((prev)=>!prev)
  }

  return (
    <>
    <Container>
      <NavigationContainer onClick={toggeleDarkAtom}>
          <NavigationBorder>
            {
            isDark ? <FontAwesomeIcon icon={faMoon}/> : <FontAwesomeIcon icon={faSun}></FontAwesomeIcon> 
            }
          </NavigationBorder>
        </NavigationContainer>
      <Header>
        <Title>
          <Link to="/">World Coin List</Link>
        </Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                {/* state를 보낸다. */}
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
    </>
  );
}
export default Coins;
