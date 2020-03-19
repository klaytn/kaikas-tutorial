import React from 'react'
import cx from 'classnames'
import Message from 'components/Message'

import './TxResult.scss'

const TxResult = ({ className, txHash, receipt, error }) => (
  <div className={cx('TxResult', className)}>
    <h3>Transaction Result</h3>
    {txHash && (
      <Message
        message={txHash}
        type="txHash"
      />
    )}
    {receipt && (
      <Message
        message={receipt}
        type="receipt"
      />
    )}
    {error && (
      <Message
        message={error}
        type="error"
      />
    )}
  </div>
)

export default TxResult
