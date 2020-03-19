import React, { Component } from 'react'
import caver from 'klaytn/caver'
import Input from 'components/Input'
import Button from 'components/Button'
import Message from 'components/Message'
import FeeDelegation from 'components/FeeDelegation'


class SmartContractExecutionFD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: props.from,
      to: '',
      amount: '',
      contractAddress: '',
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
    const { from, to, amount, contractAddress, gas } = this.state

    const data = caver.klay.abi.encodeFunctionCall({
      name: 'transfer',
      type: 'function',
      inputs: [{
        type: 'address',
        name: 'recipient',
      }, {
        type: 'uint256',
        name: 'amount',
      }],
    }, [to, caver.utils.toPeb(amount, 'KLAY')])

    const txData = {
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from,
      to: contractAddress,
      gas,
      data,
    }

    const { rawTransaction: senderRawTransaction } = await caver.klay.signTransaction(txData)

    this.setState({
      senderAddress: from,
      senderRawTransaction
    })
  }

  render() {
    const { from, to, amount, contractAddress, gas, senderRawTransaction } = this.state

    return (
      <div className="SmartContractExecutionFD">
        <Input
          name="from"
          label="From (Sender Address)"
          value={from}
          placeholder="From Address"
          onChange={this.handleChange}
        />
        <Input
          name="to"
          label="To"
          value={to}
          onChange={this.handleChange}
          placeholder="Address you want to send Token"
        />
        <Input
          name="contractAddress"
          label="Contract Address (Token Address)"
          value={contractAddress}
          onChange={this.handleChange}
          placeholder="The address of the deployed smart contract"
        />
        <Input
          name="amount"
          label="Amount"
          value={amount}
          onChange={this.handleChange}
          placeholder="Amount of Eth you want to send"
        />
        <Input
          name="gas"
          label="Gas"
          value={gas}
          onChange={this.handleChange}
          placeholder="Gas"
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

export default SmartContractExecutionFD
