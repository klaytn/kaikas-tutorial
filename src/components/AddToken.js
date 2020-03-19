import React, { Component } from 'react'
import Input from 'components/Input'
import Button from 'components/Button'

import './AddToken.scss'

const BongToken = {
  tokenAddress: '0xEa51fb63dD8cfc8574BB158054D86CA786e00F87',
  tokenSymbol: 'BONG',
  tokenDecimals: 18,
  tokenImage: 'https://avatars3.githubusercontent.com/u/32095134?s=460&v=4',
}
class AddToken extends Component {
  state = {
    tokenAddress: '',
    tokenSymbol: '',
    tokenDecimals: '',
    tokenImage: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleAddToken = () => {
    const { tokenAddress, tokenSymbol, tokenDecimals, tokenImage } = this.state
    klaytn.sendAsync({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
      id: Math.round(Math.random() * 100000),
    }, (err, result) => console.log(err, result))
  }

  addExampleToken = () => {
    const { tokenAddress, tokenSymbol, tokenDecimals, tokenImage } = BongToken
    this.setState({
      tokenAddress,
      tokenSymbol,
      tokenDecimals,
      tokenImage,
    }, () => this.handleAddToken())
  }

  render() {
    const { tokenAddress, tokenSymbol, tokenDecimals, tokenImage } = this.state
    return (
      <div className="AddToken">
        <section className="AddToken__section">
          <h3 className="AddToken__title"># Sample Token</h3>
          <div className="AddToken__sample">
            <img
              className="AddToken__sampleImage"
              alt="BongToken image"
              src={BongToken.tokenImage}
            />
            <div className="AddToken__sampleContent">
              <p className="AddToken__sampleName">{`BongToken (${BongToken.tokenSymbol})`}</p>
              <p className="AddToken__sampleAddress">{BongToken.tokenAddress}</p>
              <p className="AddToken__sampleDecimals">{`Decimals: ${BongToken.tokenDecimals}`}</p>
              <Button
                title="Add to Kaikas"
                onClick={this.addExampleToken}
              />
            </div>
          </div>
        </section>
        <section className="AddToken__section">
          <h3 className="AddToken__title"># Custom Token</h3>
          <Input
            name="tokenAddress"
            label="Token Contract Address"
            value={tokenAddress}
            onChange={this.handleChange}
            placeholder="Token Address"
          />
          <Input
            name="tokenSymbol"
            label="Token Symbol"
            value={tokenSymbol}
            onChange={this.handleChange}
            placeholder="Token Symbol"
          />
          <Input
            name="tokenDecimals"
            label="Token Decimals"
            value={tokenDecimals}
            onChange={this.handleChange}
            placeholder="Token Decimals"
          />
          <Input
            name="tokenImage"
            label="Token Image (url)"
            value={tokenImage}
            onChange={this.handleChange}
            placeholder="Type url of Image"
          />
          <Button
            title="Add to metamask"
            onClick={this.handleAddToken}
          />
        </section>
      </div>
    )
  }
}

export default AddToken
