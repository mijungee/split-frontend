import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ClaimService from '../common/claimService';

const MainContainer = styled.div`
  width: 230px;
  height: 350px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  border: 1px solid black;
  
`;

const CardImage = styled.img`
  width: 200px;
  height: 164px;
  margin-top: 15px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-left: 25px;
`;

const CardButton = styled.button`
  background-color: #0a83e8;
  color: white;
  font-family: Inter;
  font-size: 8px;
  padding: 5px 8px 5px 8px;
  border-radius: 5px;
  text-align: center;
  margin-top: 10px;
  margin-right: 80px;
`;

const ProductInfo = styled.div`
  width: 200px;
  height: 77px;
  margin-top: 0.625rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
  
`;

const ProductNameContainer = styled.div`
  display: flex;
  width: 12.5rem;
  justify-content: space-between;
  align-items: center;
`;

const ProductName = styled.span`
  color: #323232;
  text-align: center;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ProductValue = styled.span`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ProductDetailContainer = styled.div`
  width: 71px;
  height: 0.625rem;

  align-self: flex-end;
  text-align: center;
`;

const ProductDetailText = styled.span`
  
  color: #323232;
  text-align: center;
  font-family: Inter;
  font-size: 0.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ClaimButton = styled.button`
  display: flex;
  padding: 0.4375rem 0rem;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.3125rem;
  background: #032746;
  color: white;
  margin-top: 0.625rem;

  &:disabled {
    cursor: not-allowed;
  }
`;

const ProductValueWithLogo = styled.span`
  color: #000;
  text-align: center;
  font-family: var(--font-googleInterRegular);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default function Product__Card(props) {
  const { claimed, earned, productName, eligibility, claimable } =
    props.data["cardData"];
  // const { earned, productName, eligibility } =
  //   props.data["cardData"];
  const productType = props.type;

  // const claimed = 0;
  // const claimable = 2;

  const [claim, setClaim] = useState(claimed);
  const [claimabled, setClaimabled] = useState(claimable);
  const [isAllClaimed, setIsAllClaimed] = useState(false);
  const [isRewardClaimed, setIsRewardClaimed] = useState(false);

  useEffect(() => {
    if (earned - claimed === 0) {
      setIsAllClaimed(true);
    } else {
      setIsAllClaimed(false);
    }

    if (claimable === 0) { 
      setIsRewardClaimed(true);
    } else {
      setIsRewardClaimed(false); 
    }

  }, [claimed, earned, claimable]);

  const formatValue = (value) => (value === 0 ? "-" : value * (10 ** (-18)));
  const formatEligibility = (value) => (value === true ? "Available" : "Unavailable");

  const handleAffiliateClaimButtonClick = () => { 
    ClaimService('affiliate');
    setIsAllClaimed(true);
    setClaim(earned);
    alert("Claimed!");
  }

  const handleUserClaimButtonClick = () => {
    ClaimService("user");
    setIsRewardClaimed(true);
    setClaimabled(0);
    alert("Claimed!");
  };

  return (
    <MainContainer>
      <CardImage src="logo-black.png" alt="logo" />
      <ButtonContainer>
        {productType === "affiliate" && (
          <CardButton>Working for Affiliate</CardButton>
        )}
        {productType === "user" && (
          <CardButton
            style={{
              backgroundColor:
                productType === "user" && "#FFF68C",
              color: productType === "user" && "#000",
            }}
          >
            Made a Transaction
          </CardButton>
        )}
      </ButtonContainer>
      {productType === "affiliate" && (
        <ProductInfo>
          <ProductNameContainer>
            <ProductName>Product</ProductName>
            <ProductValue>{productName}</ProductValue>
          </ProductNameContainer>
          <ProductNameContainer>
            <ProductName>Total Earned</ProductName>
            <ProductValueWithLogo>
              {formatValue(earned)}
              {/* <img src="usdc.png" width="10px" height="10px"
                  style={{
                    marginLeft: '5px',
                  }} /> */}
              {formatValue(earned) !== '-' && (
                <img src="usdc.png" width="10px" height="10px"
                  style={{
                    marginLeft: '5px',
                    marginBottom: '1px'
                  }}
                />
              )}
            </ProductValueWithLogo>
          </ProductNameContainer>
          <ProductNameContainer>
            <ProductName>Total Claimed</ProductName>
            <ProductValueWithLogo>
              {formatValue(claim)}
              {formatValue(claim) !== '-' && (
                <img src="usdc.png" width="10px" height="10px"
                  style={{
                    marginLeft: '5px',
                    marginBottom: '1px'
                  }}
                />
              )}
            </ProductValueWithLogo>
          </ProductNameContainer>
          <ProductDetailContainer>
            <ProductDetailText lText>Show Details</ProductDetailText>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
            >
              <path
                d="M2.66275 1.1665C2.61914 1.21115 2.59473 1.27109 2.59473 1.3335C2.59473 1.39591 2.61914 1.45585 2.66275 1.5005L5.09925 4L2.66275 6.499C2.61914 6.54365 2.59473 6.60359 2.59473 6.666C2.59473 6.72841 2.61914 6.78835 2.66275 6.833C2.68395 6.85477 2.7093 6.87208 2.73729 6.88389C2.76529 6.89571 2.79537 6.9018 2.82575 6.9018C2.85614 6.9018 2.88622 6.89571 2.91421 6.88389C2.94221 6.87208 2.96756 6.85477 2.98875 6.833L5.57975 4.1745C5.62526 4.12781 5.65073 4.0652 5.65073 4C5.65073 3.9348 5.62526 3.87219 5.57975 3.8255L2.98875 1.167C2.96756 1.14523 2.94221 1.12792 2.91421 1.11611C2.88622 1.10429 2.85614 1.09821 2.82575 1.09821C2.79537 1.09821 2.76529 1.10429 2.73729 1.11611C2.7093 1.12792 2.68395 1.14523 2.66275 1.167V1.1665Z"
                fill="#323232"
              />
            </svg>
          </ProductDetailContainer>
          <ClaimButton
            onClick={handleAffiliateClaimButtonClick}
            style={{
              backgroundColor: isAllClaimed === true ? "#989898" : "#032746",
              color: isAllClaimed === true ? "#FFF" : "white",
            }}
            disabled={isAllClaimed}
          >
            Claim Reward
          </ClaimButton>
        </ProductInfo>
      )}
      {productType === "user" && (
        <ProductInfo>
          <ProductNameContainer>
            <ProductName>Product</ProductName>
            <ProductValue>{productName}</ProductValue>
          </ProductNameContainer>
          <ProductNameContainer>
            <ProductName>Eligibility</ProductName>
            <ProductValue>{formatEligibility(eligibility)}</ProductValue>
          </ProductNameContainer>
          <ProductNameContainer>
            <ProductName>Claimable Reward</ProductName>
      
            <ProductValueWithLogo>
              {formatValue(claimabled)}
              {formatValue(claimabled) !== '-' && (
                <img src="usdc.png" width="10px" height="10px"
                  style={{
                    marginLeft: '5px',
                    marginBottom: '1px'
                  }}
                />
              )}
            </ProductValueWithLogo>

          </ProductNameContainer>
          <ProductDetailContainer>
            <ProductDetailText>Show Details</ProductDetailText>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
            >
              <path
                d="M2.66275 1.1665C2.61914 1.21115 2.59473 1.27109 2.59473 1.3335C2.59473 1.39591 2.61914 1.45585 2.66275 1.5005L5.09925 4L2.66275 6.499C2.61914 6.54365 2.59473 6.60359 2.59473 6.666C2.59473 6.72841 2.61914 6.78835 2.66275 6.833C2.68395 6.85477 2.7093 6.87208 2.73729 6.88389C2.76529 6.89571 2.79537 6.9018 2.82575 6.9018C2.85614 6.9018 2.88622 6.89571 2.91421 6.88389C2.94221 6.87208 2.96756 6.85477 2.98875 6.833L5.57975 4.1745C5.62526 4.12781 5.65073 4.0652 5.65073 4C5.65073 3.9348 5.62526 3.87219 5.57975 3.8255L2.98875 1.167C2.96756 1.14523 2.94221 1.12792 2.91421 1.11611C2.88622 1.10429 2.85614 1.09821 2.82575 1.09821C2.79537 1.09821 2.76529 1.10429 2.73729 1.11611C2.7093 1.12792 2.68395 1.14523 2.66275 1.167V1.1665Z"
                fill="#323232"
              />
            </svg>
          </ProductDetailContainer>
          <ClaimButton
            onClick={handleUserClaimButtonClick}
            style={{
              backgroundColor: isRewardClaimed === true ? "#989898" : "#032746",
              color: isRewardClaimed === true ? "#FFF" : "white",
            }}
            disabled={isRewardClaimed}
          >
            Claim Reward
          </ClaimButton>

        </ProductInfo>
      )}
    </MainContainer>
  );
}

