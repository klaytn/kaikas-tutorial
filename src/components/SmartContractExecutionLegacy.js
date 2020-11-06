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
      decimal: 18
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.from !== prevState.from) {
      return { from: nextProps.from }
    }
    return null
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  signTransaction = () => {
    const { from, contractAddress, to, amount, gas, decimal } = this.state
    if (decimal > 20) {
      return alert('decimal should be less than 21')
    }

    const data = caver.klay.abi.encodeFunctionCall(
      {
        name: 'transfer',
        type: 'function',
        inputs: [
          {
            type: 'address',
            name: 'recipient'
          },
          {
            type: 'uint256',
            name: 'amount'
          }
        ]
      },
      [
        to,
        caver.utils
          .toBN(amount)
          .mul(caver.utils.toBN(Number(`1e${decimal}`)))
          .toString()
      ]
    )

    caver.klay
      .sendTransaction({
        from,
        to: contractAddress,
        data,
        gas
      })
      .on('transactionHash', transactionHash => {
        console.log('txHash', transactionHash)
        this.setState({ txHash: transactionHash })
      })
      .on('receipt', receipt => {
        console.log('receipt', receipt)
        this.setState({ receipt: JSON.stringify(receipt) })
      })
      .on('error', error => {
        console.log('error', error)
        this.setState({ error: error.message })
      })
  }

  render() {
    const {
      from,
      to,
      amount,
      contractAddress,
      gas,
      txHash,
      receipt,
      error,
      decimal
    } = this.state

    return (
      <div className="SmartContractExecution">
        <Input
          name="from"
          label="From"
          value={from}
          onChange={this.handleChange}
          placeholder="Kaikas account"
        />
        <Input
          name="to"
          label="To"
          value={to}
          onChange={this.handleChange}
          placeholder="Address you want to send token to"
        />
        <Input
          name="contractAddress"
          label="Token Contract Address"
          value={contractAddress}
          onChange={this.handleChange}
          placeholder="The address of the deployed smart contract"
        />
        <Input
          name="decimal"
          label="Token Decimal"
          value={decimal}
          onChange={this.handleChange}
          placeholder="Token's number of decimal"
        />
        <Input
          name="amount"
          label="Amount"
          value={amount}
          onChange={this.handleChange}
          placeholder="Amount of token you want to send"
        />
        <Input
          name="gas"
          label="Gas"
          value={gas}
          onChange={this.handleChange}
          placeholder="Transaction gas limit"
        />
        <Button title="Sign Transaction" onClick={this.signTransaction} />
        <TxResult txHash={txHash} receipt={receipt} error={error} />
      </div>
    )
  }
}

export default SmartContractExecutionLegacy
