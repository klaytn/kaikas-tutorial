import React, { Component } from 'react'
import caver from 'klaytn/caver'
import Input from 'components/Input'
import Button from 'components/Button'
import Message from 'components/Message'
import FeeDelegation from 'components/FeeDelegation'

class ValueTransferFD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: props.from,
      to: '',
      value: '',
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

  signTransaction = async () => {
    const { from, to, value, gas, ratio } = this.state

    const txData = {
      type: 'FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO',
      from,
      to,
      value: caver.utils.toPeb(value, 'KLAY'),
      feeRatio: ratio,
      gas,
    }

    const { rawTransaction: senderRawTransaction} = await caver.klay.signTransaction(txData)

    this.setState({
      senderAddress: from,
      senderRawTransaction
    })
  }

  render() {
    const { from, to, value, ratio, gas, senderAddress, senderRawTransaction } = this.state

    return (
      <div className="ValueTransferFDRatio">
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
          onClick={this.signTransaction}
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

export default ValueTransferFD
