import React from 'react'
import styled from 'styled-components';
import TotalActivity__month from './TotalActivity__month';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const BodyContainer = styled.div`
  width: 80%;
  height: 323px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 50px;
  justify-content: space-between;
`;

const GetEarnDashboardRes = {
  monthlyTotalDashboard: {
    earned: 9.5,
    claimed: 0,
    productNum: 10,
    walletConnectNum: 2414,
    transactionNum: 95,
    conversion: 3.93,
  },
  totalDashboard: {
    earned: 30.3,
    claimed: 20,
    productNum: 33,
    walletConnectNum: 9201,
    transactionNum: 303,
    conversion: 3.29,
  },
  products: [],
}

export default function TotalActivity({ monthly, total }) {
  var totalActivities = [
    { title: "In This Month", data: monthly ?? {} },
    { title: "Entire Period", data: total ?? {} },
  ];

  return (
    <MainContainer>
      <BodyContainer>
        {totalActivities.map((activity, index) => {
          return <TotalActivity__month key={index} myValue={activity.data} title={activity.title} />
        })}
      </BodyContainer>
    </MainContainer>
  );
}

