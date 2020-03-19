import React, { Component } from 'react'
import caver from 'klaytn/caver'
import Input from 'components/Input'
import Button from 'components/Button'
import Message from 'components/Message'
import FeeDelegation from './FeeDelegation';

import './AccountUpdate.scss'

class AccountUpdateFD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: props.from,
      publicKey: '',
      walletKey: '',
      gas: 3000000,
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

  handleGenerateKeypair = () => {
    const { privateKey } = caver.klay.accounts.create()
    const publicKey = caver.klay.accounts.privateKeyToPublicKey(privateKey)
    const walletKey = `${privateKey}0x00${this.state.from}`
    this.setState({ publicKey, walletKey })
  }

  signTransaction = async () => {
    const { from, publicKey, gas } = this.state

    const txData = {
      type: 'FEE_DELEGATED_ACCOUNT_UPDATE',
      from,
      publicKey,
      gas,
    }

    const { rawTransaction: senderRawTransaction } = await caver.klay.signTransaction(txData)

    this.setState({
      senderAddress: from,
      senderRawTransaction,
    })
  }

  render() {
    const { from, publicKey, walletKey, ratio, gas, senderRawTransaction } = this.state

    return (
      <div className="AccountUpdateFD">
        <div className="AccountUpdate__generateKeypair">
          <Button
            className="AccountUpdate__generateButton"
            title="Generate New Keypair"
            onClick={this.handleGenerateKeypair}
          />
          <Input
            name="walletKey"
            label="New Wallet Key"
            value={walletKey}
            placeholder="Generate new Wallet Key for Account update"
            readOnly
          />
        </div>
        <div className="AccountUpdate__transaction">
          <Input
            name="from"
            label="From"
            value={from}
            placeholder="Login with Kaikas :)"
            onChange={this.handleChange}
          />
          <Input
            name="publicKey"
            label="New Public Key"
            value={publicKey}
            onChange={this.handleChange}
            placeholder="New Public Key"
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
        </div>
        <FeeDelegation
          senderRawTransaction={senderRawTransaction}
          feePayerAddress={from}
        />
      </div>
    )
  }
}

export default AccountUpdateFD
