import styled from "styled-components";
import { PriceData } from "./Coin";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: ${(props)=>props.theme.ItemBgColor};
`;
const Content = styled.div`
  padding: 10px 0px;
`;
const Price = ({ tickersData }: { tickersData: PriceData }) => {
  // {}:{} 알아보기
  const t_q_USD = tickersData.quotes.USD;

  return (
    <Container>
      <Content>highest price : {t_q_USD.ath_price}</Content>
      <Content>fluctuation rate : {t_q_USD.percent_from_price_ath}</Content>
      <Content>price : {t_q_USD.price}</Content>
    </Container>
  );
};

export default Price;
