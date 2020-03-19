import React, { Component } from 'react'
import caver from 'klaytn/caver'
import Input from 'components/Input'
import Button from 'components/Button'
import Message from 'components/Message'
import FeeDelegation from 'components/FeeDelegation'

class ValueTransferMemoFDRatio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: props.from,
      to: '',
      value: '',
      memo: '',
      ratio: '',
      gas: 3000000,
      senderAddress: '',
      senderRawTransaction: null,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.from !== prevState.from) {
      return { from: nextProps.from }
    }
    return null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSignTransaction = async () => {
    const { from, to, value, memo, gas, ratio } = this.state

    const txData = {
      type: 'FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO',
      from,
      to,
      gas,
      value: caver.utils.toPeb(value, 'KLAY'),
      data: memo,
      feeRatio: ratio,
    }

    const { rawTransaction: senderRawTransaction} = await caver.klay.signTransaction(txData)

    this.setState({
      senderAddress: from,
      senderRawTransaction
    })
  }

  render() {
    const { from, to, value, memo, ratio, gas, senderAddress, senderRawTransaction } = this.state

    return (
      <div className="ValueTransferMemoFDRatio">
        <h3>Sender</h3>
        <Input
          name="from"
          label="From"
          value={senderAddress || from}
          placeholder="From Address"
          onChange={this.handleChange}
        />
        <Input
          name="to"
          label="To"
          value={to}
          onChange={this.handleChange}
          placeholder="To Address"
        />
        <Input
          name="value"
          label="Value"
          value={value}
          onChange={this.handleChange}
          placeholder="Value (KLAY)"
        />
        <Input
          name="memo"
          label="Memo"
          value={memo}
          onChange={this.handleChange}
          placeholder="Memo"
        />
        <Input
          name="ratio"
          label="Fee Ratio"
          value={ratio}
          onChange={this.handleChange}
          placeholder="Fee Ratio (%)"
        />
        <Input
          name="gas"
          label="Gas"
          value={gas}
          onChange={this.handleChange}
          placeholder="Gas (Peb)"
        />
        <Button
          title="Sign Transaction"
          onClick={this.handleSignTransaction}
        />
        {senderRawTransaction && (
          <Message
            type="rawTransaction"
            message={JSON.stringify(senderRawTransaction)}
          />
        )}
        <FeeDelegation
          senderRawTransaction={senderRawTransaction}
          feePayerAddress={from}
        />
      </div>
    )
  }
}

export default ValueTransferMemoFDRatio
