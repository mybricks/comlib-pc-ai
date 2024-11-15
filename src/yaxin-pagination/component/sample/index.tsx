import React, { useEffect, useState } from "react";
import { LeftOutlined , RightOutlined } from "@ant-design/icons";
import styled from 'styled-components';
import { NextArrowPage, Direction } from "../index"

const PageContainer = styled.ul`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-left: 8px;
  background-color: #fff;
  height:30px;
  border-radius:4px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  z-index: 99999;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  font-size: 12px;
  // padding: 6px 10px;
  width: 30px;
  height: 30px;
  justify-content: center;
  border: 1px solid #D8DADF;
  margin:0 4px;
  color: #666666;
  cursor: pointer;
  background-color: #fff;
  border-radius:4px;
`;

const PrevArrowPage = styled(Li)<{
  disabled?: boolean;
}>`
  // border-left: transparent;
  margin-left:0;
  cursor: ${({ disabled }: { disabled?: boolean }) =>
    disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ disabled }: { disabled?: boolean }) =>
    disabled ? '0.3' : '1'};
`;

export const GotoPageInput = styled.input`
  text-align: center;
  &:focus {
    outline: none;
  }
  border: 1px solid #D8DADF;
  width: 36px;
  color: #666666;
  height: 30px;
  padding: 6px 0;
  border-radius: 3px;
  box-sizing: border-box;
  margin-left: 8px;
`;

export const DividerSpan  = styled.span`
  width: 16.5px;
  text-align: center;
  color: #666666;
  height: 30px;
  line-height: 30px;
`;

export const TipsSpan  = styled.span`
  padding: 0 6px;
  text-align: center;
  color: #666666;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
`;

export interface SamplePageinProps {
  currentPager: number;
  total: number;
  onArrowClicked?: (currentPager: number, direction: Direction) => void | undefined;
}

const Index = (props:SamplePageinProps) => {
  const { total = 0, currentPager = 1,} = props;
  const [inputPager, setInputPager] = useState<number>(currentPager);
  const [totalPageCount, setTotalPageCount] = useState<number>(total);


  useEffect(() => {
    const newInputNum = Number(inputPager);
    if(newInputNum > 1) {

    }
  }, [inputPager])
  const handleClickPreviousPager = () => {
    const nextPage = Number(inputPager)
    if(nextPage > 1) {
      let newPrePage = nextPage - 1;
      setInputPager(newPrePage)
      props?.onArrowClicked && props.onArrowClicked(newPrePage, Direction.left)
    }
  }

  const handleInputPagerChanged = (e:any) => {
    let newInput = e.match(/\d+/);
    newInput = !!newInput ? Number(newInput) : 0;
    if(newInput > total) {
      newInput = total;
    }
    setInputPager(newInput);
  }

  const handleClickEnterKey = (e:any) => {
    if (e.key === 'Enter') {
      let pager = inputPager;
      if (inputPager > totalPageCount) {
        pager = totalPageCount;
      }
      if(inputPager === 0) {
        pager = 1;
      }
      setInputPager(pager);
      props?.onArrowClicked && props.onArrowClicked(pager, Direction.center)
    }
  }

  const handleClickNextPager = () => {
    const nextPage = Number(inputPager)
    if(nextPage < totalPageCount) {
      let newNextPage = nextPage + 1;
      props?.onArrowClicked && props.onArrowClicked(newNextPage, Direction.right)
      setInputPager(newNextPage);
    }
  }

  return (
    <div className="">
      <PageContainer>
        {
          <PrevArrowPage
            key="Left"
            disabled={inputPager <= 1}
            onClick={handleClickPreviousPager}
            // className={classes?.['prev-arrow-page']}
          >
            < LeftOutlined />
          </PrevArrowPage>
        }
          <GotoPageInput
            type="text"
            // disabled = { inputPager <= 1 }
            value={ inputPager >= 0 ? `${inputPager}` : ''}
            // onKeyPress={e => handleClickEnterKey(e)}
            onKeyDown={e => handleClickEnterKey(e) }
            
            // onKeyDown={e => handleClickEnterKey(e)}
            onChange={e => handleInputPagerChanged(e.target.value)}
          />
        <DividerSpan>
          /
        </DividerSpan>
        <TipsSpan>
          {total}
        </TipsSpan>
        <NextArrowPage
          key="right"
          disabled={inputPager >= total}
          onClick={handleClickNextPager}
        >
          < RightOutlined />
        </NextArrowPage>
      </PageContainer>
  </div>
  )
}

export default Index;