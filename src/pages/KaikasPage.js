import React, { Component } from 'react'
import caver from 'klaytn/caver'

import Nav from 'components/Nav'
import WalletInfo from 'components/WalletInfo'
import Dropdown from 'components/Dropdown'
import ValueTransferLegacy from 'components/ValueTransferLegacy'
import SmartContractExecutionLegacy from 'components/SmartContractExecutionLegacy'
import SmartContractDeployLegacy from 'components/SmartContractDeployLegacy'
import AddToken from 'components/AddToken'
import SignMessage from 'components/SignMessage'
import ValueTransfer from 'components/ValueTransfer'
import ValueTransferFD from 'components/ValueTransferFD'
import ValueTransferFDRatio from 'components/ValueTransferFDRatio'
import ValueTransferMemo from 'components/ValueTransferMemo'
import ValueTransferMemoFD from 'components/ValueTransferMemoFD'
import ValueTransferMemoFDRatio from 'components/ValueTransferMemoFDRatio'
import AccountUpdate from 'components/AccountUpdate'
import AccountUpdateFD from 'components/AccountUpdateFD'
import AccountUpdateFDRatio from 'components/AccountUpdateFDRatio'
import SmartContractDeploy from 'components/SmartContractDeploy'
import SmartContractDeployFD from 'components/SmartContractDeployFD'
import SmartContractDeployFDRatio from 'components/SmartContractDeployFDRatio'
import SmartContractExecution from 'components/SmartContractExecution'
import SmartContractExecutionFD from 'components/SmartContractExecutionFD'
import SmartContractExecutionFDRatio from 'components/SmartContractExecutionFDRatio'

import './KaikasPage.scss'

const txTypeList = [
  'Value Transfer (Legacy)',
  'Smart Contract Deploy (Legacy)',
  'Token Transfer (Legacy)',
  'Add Token',
  'Sign Message',
  'Value Transfer',
  'Value Transfer (Fee Delegation)',
  'Value Transfer (Fee Delegation with Ratio)',
  'Value Transfer with Memo',
  'Value Transfer with Memo (Fee Delegation)',
  'Value Transfer with Memo (Fee Delegation with Ratio)',
  'Account Update',
  'Account Update (Fee Delegation)',
  'Account Update (Fee Delegation with Ratio)',
  'Smart Contract Deploy',
  'Smart Contract Deploy (Fee Delegation)',
  'Smart Contract Deploy (Fee Delegation with Ratio)',
  'Token Transfer',
  'Token Transfer (Fee Delegation)',
  'Token Transfer (Fee Delegation with Ratio)',
]

class KaikasPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      txType: null,
      account: '',
      balance: 0,
      network: null,
    }
  }

  componentDidMount() {
    this.loadAccountInfo()
    this.setNetworkInfo()
  }

  setAccountInfo = async () => {
    const { klaytn } = window
    if (klaytn === undefined) return

    const account = klaytn.selectedAddress
    const balance = await caver.klay.getBalance(account)
    this.setState({
      account,
      balance: caver.utils.fromPeb(balance, 'KLAY'),
    })
    klaytn.on('accountsChanged', () => this.setAccountInfo())
  }

  setNetworkInfo = () => {
    const { klaytn } = window
    if (klaytn === undefined) return

    this.setState({ network: klaytn.networkVersion })
    klaytn.on('networkChanged', () => this.setNetworkInfo(klaytn.networkVersion))
  }

  loadAccountInfo = async () => {
    const { klaytn } = window

    if (klaytn) {
      try {
        await klaytn.enable()
        this.setAccountInfo(klaytn)
      } catch (error) {
        console.log('User denied account access')
      }
    } else {
      console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
    }
  }

  selectTxType = (txType) => this.setState({ txType })

  renderTxExample = (txType, from) => {
    switch (txType) {
      case 'Value Transfer (Legacy)':
        return <ValueTransferLegacy from={from} />
      case 'Smart Contract Deploy (Legacy)':
        return <SmartContractDeployLegacy from={from} />
      case 'Token Transfer (Legacy)':
        return <SmartContractExecutionLegacy from={from} />
      case 'Add Token':
          return <AddToken />
      case 'Sign Message':
          return <SignMessage from={from} />
      case 'Value Transfer':
        return <ValueTransfer from={from} />
      case 'Value Transfer (Fee Delegation)':
        return <ValueTransferFD from={from} />
      case 'Value Transfer (Fee Delegation with Ratio)':
        return <ValueTransferFDRatio from={from} />
      case 'Value Transfer with Memo':
        return <ValueTransferMemo from={from} />
      case 'Value Transfer with Memo (Fee Delegation)':
        return <ValueTransferMemoFD from={from} />
      case 'Value Transfer with Memo (Fee Delegation with Ratio)':
        return <ValueTransferMemoFDRatio from={from} />
      case 'Smart Contract Deploy':
        return <SmartContractDeploy from={from} />
      case 'Smart Contract Deploy (Fee Delegation)':
        return <SmartContractDeployFD from={from} />
      case 'Smart Contract Deploy (Fee Delegation with Ratio)':
        return <SmartContractDeployFDRatio from={from} />
      case 'Token Transfer':
        return <SmartContractExecution from={from} />
      case 'Token Transfer (Fee Delegation)':
        return <SmartContractExecutionFD from={from} />
      case 'Token Transfer (Fee Delegation with Ratio)':
        return <SmartContractExecutionFDRatio from={from} />
      case 'Account Update':
          return <AccountUpdate from={from} />
      case 'Account Update (Fee Delegation)':
          return <AccountUpdateFD from={from} />
      case 'Account Update (Fee Delegation with Ratio)':
          return <AccountUpdateFDRatio from={from} />
      default:
        return (<p className="KaikasPage__guide">Select a Transaction example :D</p>)
    }
  }

  render() {
    const { account, balance, txType, network } = this.state
    return (
      <div className="KaikasPage">
        <Nav network={network} />
        <div className="KaikasPage__main">
          <WalletInfo address={account} balance={balance} />
          <div className="KaikasPage__content">
            <Dropdown
              className="KaikasPage__dropdown"
              placeholder="Transaction Type"
              selectedItem={txType}
              handleSelect={this.selectTxType}
              list={txTypeList}
            />
            <div className="KaikasPage__txExample">
              <h2 className="KaikasPage__txExampleTitle">{txType}</h2>
              {this.renderTxExample(txType, account)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default KaikasPage
