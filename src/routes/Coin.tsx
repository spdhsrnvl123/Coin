import { useQuery } from "@tanstack/react-query";
import {
  Routes,
  Route,
  useLocation,
  useParams,
  useMatch,
  Link
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
// import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faMoon,faSun } from '@fortawesome/free-solid-svg-icons'
import {NavigationContainer} from "./Coins";
import { NavigationBorder } from "./Coins";
import { isDark } from "../atoms";
import { useSetRecoilState } from "recoil";


const Title = styled.h1`
  font-size: 48px;
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

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  position:relative;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props)=>props.theme.ItemBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props)=>props.theme.ItemBgColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.textColor : props.theme.textColor};
  a {
    display: block;
  }
`;
const NavigationContainerHome = styled.div`
  position:fixed;
  top:20px;
  right:20px;
  z-index: 99;
`

const NavigationBorderHome = styled.div`
  width:2.3em;
  height:2.3em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background-color: ${(props)=>props.theme.ItemBgColor};
  color: ${(props)=>props.theme.IconColor};
  /* &:hover{
    font-size:24px;
    transition: all 0.1s;
  } */
  @media screen and (max-width:550px) {
    font-size: 1.1rem;
    width:2.2em;
    height: 2.3em;
  }
  @media screen and (max-width:360px) {
    font-size: 0.7rem;
    width:2.3em;
    height: 2.3em;
  }
  cursor: pointer;
`

interface LocationParams {
  state: {
    name: string;
  };
}

// interface ITag {
//   coin_counter: number;
//   ico_counter: number;
//   id: string;
//   name: string;
// }
interface RouteParams {
  coinId: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  //   tags: ITag[];
  //   team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  //   links: object;
  //   links_extended: object;
  //   whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<keyof RouteParams>() as RouteParams;
  const { state } = useLocation() as LocationParams;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId) //argument가 필요하기 때문에
  );

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      // refetchInterval: 5000,
    }
  );

  const iconChange = useSetRecoilState(isDark)

  const toggeleDarkAtom = ()=>{
    iconChange((prev)=>!prev)
  }

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Header>
        <Link to="/">
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
        </Link>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <NavigationContainer onClick={toggeleDarkAtom} >
          <NavigationBorder>
            {
            isDark ? <FontAwesomeIcon icon={faMoon}/> : <FontAwesomeIcon icon={faSun}></FontAwesomeIcon> 
            }
          </NavigationBorder>
        </NavigationContainer>
        <Link to="/">
        <NavigationContainerHome>
          <NavigationBorderHome>
            <FontAwesomeIcon icon={faHouse} size ="lg"></FontAwesomeIcon>
          </NavigationBorderHome>
        </NavigationContainerHome>
        </Link>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply: </span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path="chart" element={<Chart coinId={coinId} />} />
            <Route
              path="price"
              element={<Price tickersData={tickersData!} />}
              /*
                '!'연산자는 컴파일에게 "tickersData는 무조건 값이 할당되어
                걱정 말고 사용하면 된다."라고 주장한다.
                https://developer-talk.tistory.com/191
              */
            />
          </Routes>
        </>
      )}
    </Container>
  );
}
export default Coin;
  