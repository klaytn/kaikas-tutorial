import React, { Component } from 'react'
import caver from 'klaytn/caver'

import Nav from 'components/Nav'
import WalletInfo from 'components/WalletInfo'
import Dropdown from 'components/Dropdown'
import GithubLink from 'components/GithubLink'
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

const txTypeList = {
  'Value Transfer (Legacy)': 'ValueTransferLegacy',
  'Smart Contract Deploy (Legacy)': 'SmartContractDeployLegacy',
  'Token Transfer (Legacy)': 'SmartContractExecutionLegacy',
  'Add Token': 'AddToken',
  'Sign Message': 'SignMessage',
  'Value Transfer': 'ValueTransfer',
  'Value Transfer (Fee Delegation)': 'ValueTransferFD',
  'Value Transfer (Fee Delegation with Ratio)': 'ValueTransferFDRatio',
  'Value Transfer with Memo': 'ValueTransferMemo',
  'Value Transfer with Memo (Fee Delegation)': 'ValueTransferMemoFD',
  'Value Transfer with Memo (Fee Delegation with Ratio)': 'ValueTransferMemoFDRatio',
  'Account Update': 'AccountUpdate',
  'Account Update (Fee Delegation)': 'AccountUpdateFD',
  'Account Update (Fee Delegation with Ratio)': 'AccountUpdateFDRatio',
  'Smart Contract Deploy': 'SmartContractDeploy',
  'Smart Contract Deploy (Fee Delegation)': 'SmartContractDeployFD',
  'Smart Contract Deploy (Fee Delegation with Ratio)': 'SmartContractDeployFDRatio',
  'Token Transfer': 'SmartContractExecution',
  'Token Transfer (Fee Delegation)': 'SmartContractExecutionFD',
  'Token Transfer (Fee Delegation with Ratio)': 'SmartContractExecutionFDRatio',
}

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

  loadAccountInfo = async () => {
    const { klaytn } = window

    if (klaytn) {
      try {
        await klaytn.enable()
        this.setAccountInfo(klaytn)
        klaytn.on('accountsChanged', () => this.setAccountInfo(klaytn))
      } catch (error) {
        console.log('User denied account access')
      }
    } else {
      console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
    }
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
  }

  setNetworkInfo = () => {
    const { klaytn } = window
    if (klaytn === undefined) return

    this.setState({ network: klaytn.networkVersion })
    klaytn.on('networkChanged', () => this.setNetworkInfo(klaytn.networkVersion))
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
    const txTypeTitles = Object.keys(txTypeList)

    return (
      <div className="KaikasPage">
        <Nav network={network} />
        <a className="KaikasPage__githubLink" href="https://github.com/klaytn/kaikas-tutorial" title="Link to Kaikas tutorial github repository">
          <img src="images/icon-github.svg" alt="Kaikas Tutorial Github" />
        </a>
        <div className="KaikasPage__main">
          <WalletInfo address={account} balance={balance} />
          <div className="KaikasPage__content">
            <Dropdown
              className="KaikasPage__dropdown"
              placeholder="Transaction Type"
              selectedItem={txType}
              handleSelect={this.selectTxType}
              list={txTypeTitles}
            />
            <div className="KaikasPage__txExample">
              <header className="KaikasPage__txExampleHeader">
                <h2 className="KaikasPage__txExampleTitle">{txType}</h2>
                {txType && <GithubLink component={txTypeList[txType]} />}
              </header>
              {this.renderTxExample(txType, account)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default KaikasPage
