import React, { Component } from 'react'
import caver from 'klaytn/caver'
import Input from 'components/Input'
import Button from 'components/Button'
import TxResult from 'components/TxResult'

class SmartContractExecutionLegacy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: props.from,
      to: '',
      amount: '',
      contractAddress: '',
      gas: '3000000',
      txHash: null,
      receipt: null,
      error: null,
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

  signTransaction = () => {
    const { from, contractAddress, to, amount, gas } = this.state
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

    caver.klay.sendTransaction({
      from,
      to: contractAddress,
      data,
      gas,
    })
      .on('transactionHash', (transactionHash) => {
        console.log('txHash', transactionHash)
        this.setState({ txHash: transactionHash })
      })
      .on('receipt', (receipt) => {
        console.log('receipt', receipt)
        this.setState({ receipt: JSON.stringify(receipt) })
      })
      .on('error', (error) => {
        console.log('error', error)
        this.setState({ error: error.message })
      })
  }

  render() {
    const { from, to, amount, contractAddress, gas, txHash, receipt, error } = this.state

    return (
      <div className="SmartContractExecution">
        <Input
          name="from"
          label="From"
          value={from}
          onChange={this.handleChange}
          placeholder="Account you logged in metamask"
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
        <TxResult
          txHash={txHash}
          receipt={receipt}
          error={error}
        />
      </div>
    )
  }
}

export default SmartContractExecutionLegacy
