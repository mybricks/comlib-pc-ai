import React, { useState, ReactElement, useEffect } from 'react';
// import { LeftArrow, RightArrow } from '@wisers/react-icons';
import { LeftOutlined , RightOutlined } from "@ant-design/icons";
import styled from 'styled-components';
import { getRootClassName } from './modules/className';
import SimplePagination from "./sample";


export type PaginationClassKeys =
  | 'root'
  | 'ul'
  | 'li'
  | 'goto-page'
  | 'goto-page-input'
  | 'page-text'
  | 'total-page-text'
  | 'prev-dot-page'
  | 'next-dot-page'
  | 'prev-arrow-page'
  | 'next-arrow-page'
  | 'active-page';

const PaginationContainer = styled.div`
  text-align: right;
  margin: 0px 8px;
  position: relative;
  z-index: 1;
`;

const GotoPage = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  margin-left: 8px;
  background-color: #fff;
  height:30px;
  border-radius:4px;
`;

const SelectSize = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  margin-left: 8px;
  background-color: #fff;
  border-radius: 4px;
  height:30px;
`;

const Ul = styled.ul`
  border-radius: 4px;
  background-clip: padding-box;
  z-index: 9999;
  display: inline-flex;
  padding-left: 0;
  list-style: none;
  // border: 1px solid red;
  position: relative;
  vertical-align: middle;
  margin-left: 4px;
  background-color: #fff;
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

const ActivePage = styled(Li)`
  font-weight: bold;
  color: #0270C9;
  border:1px solid #0270C9;
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

export const NextArrowPage = styled(Li)<{
  disabled?: boolean;
}>`
  margin-right:0;
  cursor: ${({ disabled }: { disabled?: boolean }) =>
    disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ disabled }: { disabled?: boolean }) =>
    disabled ? '0.3' : '1'};
`;

const PrevDotPage = styled(Li)`
  border:none;
  margin:0;
  &::after {
    content: '•••';
  }
  &:hover {
    &::after {
      content: '<<';
      color: 'red';
    }
  }
`;

const NextDotPage = styled(Li)`
  border:none;
  margin:0;
  &::after {
    content: '•••';
  }
  &:hover {
    &::after {
      content: '>>';
      color: 'red';
    }
  }
`;

const PageText = styled.span`
  line-height: 30px;
  padding: 0 5px;
  font-size: 12px;
  color: #666;
`;

const TotalPageText = styled.span`
  line-height: 30px;
  padding: 0 5px;
  font-size: 12px;
  color: #666;
`;

const SelectPageSize = styled.select`
  text-align: center;
  &:focus {
    outline: none;
  }
  border: 1px solid #D8DADF;
  color: #666666;
  padding: 6px 0;
  border-radius: 4px;
  font-size:12px;
`;

const GotoPageInput = styled.input`
  text-align: center;
  &:focus {
    outline: none;
  }
  border: 1px solid #D8DADF;
  width: 36px;
  color: #666666;
  padding: 6px 0;
  border-radius: 3px;
`;

const SelectPageOption=styled.option`
  margin-top:6px !important;
`;

const FIRST_PAGER = 1;

export type Classes = {
  root?: string;
  ul?: string;
  ['prev-dot-page']?: string;
  ['next-dot-page']?: string;
  li?: string;
  ['goto-page']?: string;
  ['page-text']?: string;
  ['goto-page-input']?: string;
  ['total-page-text']?: string;
  ['prev-arrow-page']?: string;
  ['next-arrow-page']?: string;
  ['active-page']?: string;
};

export enum Direction {
  left = "left",
  right = "right",
  center = "center"
}

export interface PaginationProps {
  pageSize?: number;//每页条数
  limitOptions?: number[];//指定每页可以显示多少条
  current?: number;//当前页数
  total: number;//数据总数
  maxPagerCount?: number;//最大页数
  totalPageCount?: number;//总页数
  currentPager?: number;//默认当前页数
  inputPager?: number;//跳转页数
  showGotoPager?: boolean;//是否展示可以快速跳转到某页
  showSelectSize?: boolean;//是否显示每页条数更改
  onChangePager?: (current: number, pageSize: number) => void | undefined;
  onShowSizeChange?: (currentPager: number, pageSize: number) => void | undefined;
  onArrowClicked?: (currentPager: number, direction: string) => void | undefined;
  classes?: Classes;
  className?: string;
  leftArrayColor?: string;
  rightArrayColor?: string;
  simple?: boolean;
}

export const Pagination = (props: PaginationProps): ReactElement => {
  const {
    pageSize = 10,
    limitOptions = [10, 20, 50, 100],
    current,
    total,
    showGotoPager,
    showSelectSize,
    onChangePager,
    onShowSizeChange,
    maxPagerCount,
    classes,
    className,
    simple
    // leftArrayColor = '#000000',
    // rightArrayColor = '#000000',
  } = props;
  console.log(props)
  const [pageNumber, setPageSize] = useState(pageSize);
  const [currentPager, setCurrentPager] = useState(
    current > 1 ? Math.ceil(current / pageNumber + 1) : FIRST_PAGER,
    // Math.ceil向上取整函数
  );
  const [inputPager, setInputPager] = useState(0);
  const [totalPageCount,setTotalPageCount] = useState(Math.ceil(total / pageNumber));
  useEffect(() => {
    setTotalPageCount(Math.ceil(total / pageNumber));
    setCurrentPager(current > 1 ? Math.ceil(current / pageNumber + 1) : FIRST_PAGER);
  },[onShowSizeChange] );

  // 向左翻页函数
  const handleClickPreviousPager = () => {
    if (currentPager > FIRST_PAGER) {
      setCurrentPager(currentPager - 1);
      handleUpdatePagerState(currentPager - 1);
    }
  };

  const handleClickNextPager = () => {
    console.log(123)
    if (currentPager < totalPageCount) {
      setCurrentPager(currentPager + 1);
      handleUpdatePagerState(currentPager + 1);
    }
  };
  // 得到当前页数
  const handleClickPager = (pager: number) => {
    console.log(123)
    handleUpdatePagerState(pager);
  };

  const handleUpdatePagerState = (pager: number) => {
    if (onChangePager) {
      const start = (pager - 1) * pageSize;
      onChangePager(pager, pageSize);
    }
    setCurrentPager(pager);
  };
  // 向前翻页<< 或者向后翻页>> 改变页数
  const handleClickDotPagerEnum = (type: 'prev' | 'next') => {
    let pager = FIRST_PAGER;

    if (type === 'prev') {
      pager = currentPager - maxPagerCount;
      if (pager <= FIRST_PAGER) {
        pager = FIRST_PAGER;
      }
    } else {
      pager = totalPageCount;
    }
    handleUpdatePagerState(pager);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickEnterKey = (e: any) => {
    if (e.charCode === 13) {
      let pager = inputPager;

      if (inputPager > totalPageCount) {
        pager = totalPageCount;
      }
      setInputPager(0);
      handleUpdatePagerState(pager);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputPagerChanged = (e: any) => {
    const pager = e.target.value;

    if (/^\d*$/.test(pager)) {
      setInputPager(+pager);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageSizeChanged = (e: any) => {
    const pager = e.target.value;

    // console.log(parseInt(pager), pager, pageNumber, "kkkkkkkk");
    if (parseInt(pager)) {
      setPageSize(parseInt(pager));
      handleUpdatePagerState(currentPager);
      onShowSizeChange && onShowSizeChange(currentPager, +pager);
    }
  };

  function renderDotPager(type: 'prev' | 'next') {
    if (type === 'prev') {
      return (
        <PrevDotPage
          key={type}
          onClick={() => handleClickDotPagerEnum(type)}
          className={classes?.['prev-dot-page']}
        >
          <span />
        </PrevDotPage>
      );
    }

    return (
      <NextDotPage
        key={type}
        onClick={() => handleClickDotPagerEnum(type)}
        className={classes?.['next-dot-page']}
      >
        <span />
      </NextDotPage>
    );
  }

  function renderPagers() {
    const pagerEles = [];
    const middlePage = Math.floor(maxPagerCount / 2);
    let startPager = FIRST_PAGER;
    // console.log(middlePage,maxPagerCount,currentPager,totalPageCount,startPager,"yiduiyeshuhhh------")
    if (currentPager + middlePage >= totalPageCount) {
      startPager = totalPageCount - maxPagerCount;
      startPager += 1;
    } else if (currentPager - middlePage > 0) {
      startPager = currentPager - middlePage;
    }
    startPager = startPager > 0 ? startPager : FIRST_PAGER;
    let endPager = startPager + maxPagerCount;

    endPager = endPager > totalPageCount ? totalPageCount : endPager;
    // 循环出中间连贯的页数
    for (let page = startPager; page < endPager; page += 1) {
      if (page === currentPager) {
        pagerEles.push(
          <ActivePage
            onClick={() => handleClickPager(page)}
            className={classes?.['active-page']}
          >
            {page}
          </ActivePage>,
        );
      } else {
        pagerEles.push(
          <Li onClick={() => handleClickPager(page)} className={classes?.li}>
            {page}
          </Li>,
        );
      }
    }
    // 增加向前翻页功能... <<
    if (startPager > 2) {
      pagerEles.unshift(renderDotPager('prev'));
    }
    if (startPager >= 2) {
      pagerEles.unshift(
        <Li onClick={() => handleClickPager(1)} className={classes?.li}>
          {1}
        </Li>,
      );
    }
    // 增加向后翻页功能... >>
    if (endPager < totalPageCount) {
      pagerEles.push(renderDotPager('next'));
    }
    if (endPager <= totalPageCount) {
      if (totalPageCount === currentPager) {
        pagerEles.push(
          <ActivePage
            onClick={() => handleClickPager(totalPageCount)}
            className={classes?.['active-page']}
          >
            {totalPageCount}
          </ActivePage>,
        );
      } else {
        pagerEles.push(
          <Li
            onClick={() => handleClickPager(totalPageCount)}
            className={classes?.li}
          >
            {totalPageCount}
          </Li>,
        );
      }
    }

    return pagerEles;
  }

  const rootClassName = getRootClassName(classes, className);

  return (
    <>
    {
      !!simple === false && <SimplePagination 
          currentPager = { currentPager } 
          total={ total } 
          onArrowClicked = { (current, direct) => {
            props?.onArrowClicked && props?.onArrowClicked(current, direct)
          }}
        />
    }
    {
      !!simple === true && <PaginationContainer className={rootClassName}>
        <Ul className={classes?.ul}>
          {/* 当页数大于1的时候出现向左翻页的按钮 */}
          {totalPageCount > 1 && (
            <PrevArrowPage
              key="Left"
              disabled={currentPager === FIRST_PAGER}
              onClick={handleClickPreviousPager}
              className={classes?.['prev-arrow-page']}
            >
              < LeftOutlined />
            </PrevArrowPage>
          )}
          {renderPagers()}
          {totalPageCount > 1 && (
            <NextArrowPage
              key="right"
              disabled={totalPageCount === currentPager}
              onClick={handleClickNextPager}
              className={classes?.['next-arrow-page']}
            >
              < RightOutlined />
            </NextArrowPage>
          )}
        </Ul>
        {showSelectSize && totalPageCount > 1 && (
          <SelectSize className={classes?.['goto-page']}>
            <SelectPageSize
              value={pageNumber}
              onChange={e => handlePageSizeChanged(e)}
              className={classes?.['goto-page-input']}
            >
              {limitOptions.map((opt, i) => {
                return (
                  <SelectPageOption key={i} value={opt}>
                    {`${opt}条/页`}
                  </SelectPageOption>
                );
              })}
            </SelectPageSize>
          </SelectSize>
        )}
        {showGotoPager && totalPageCount > 1 && (
          <GotoPage className={classes?.['goto-page']}>
            <PageText className={classes?.['page-text']}>跳至&nbsp;</PageText>
            <GotoPageInput
              type="text"
              value={inputPager && inputPager > 0 ? inputPager : ''}
              onKeyPress={e => handleClickEnterKey(e)}
              onChange={e => handleInputPagerChanged(e)}
              className={classes?.['goto-page-input']}
            />
            <TotalPageText>{/* of {totalPageCount} */}页</TotalPageText>
          </GotoPage>
        )}
        </PaginationContainer>
    }
    </>
  );
};