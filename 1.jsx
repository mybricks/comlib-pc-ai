import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Container } from 'mybricks';
import { Input } from 'antd';
import css from 'style.less';

export default forwardRef(function (props, ref) {
  const { payeeInfo: initialPayee, approvalList: initialList, onPayeeSelect, onAddPayee, onLinkClick } = props;
  
  const [payee, setPayee] = useState(initialPayee || {});
  const [list, setList] = useState(initialList || []);

  useImperativeHandle(ref, () => ({
    setPayeeInfo: (val) => setPayee(val || {}),
    setApprovalList: (val) => setList(val || []),
    getPayeeInfo: () => payee
  }), [payee, list]);

  const handlePayeeChange = (key, val) => {
    setPayee({ ...payee, [key]: val });
  };

  return (
    <Container className={css.container}>
      {/* 收款方信息板块 */}
      <div className={css.sectionHeader}>
        <div className={css.titleBar}></div>
        <div className={css.titleText}>收款方信息</div>
      </div>

      

    </Container>
  );
});