import React, { Component } from 'react'
import Input from 'components/Input'
import Button from 'components/Button'
import Message from 'components/Message'

class SignMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: props.from,
      message: '',
      signedMessage: null,
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

  signMessage = async () => {
    const { from, message } = this.state
    const signedMessage = await caver.klay.sign(message, from)
    this.setState({ signedMessage })
  }

  render() {
    const {
      from,
      message,
      signedMessage,
    } = this.state

    return (
      <div className="SignMessage">
        <div className="SignMessage__sender">
          <Input
            name="from"
            label="From"
            value={from}
            placeholder="From Address"
            onChange={this.handleChange}
          />
          <Input
            name="message"
            label="Message"
            value={message}
            onChange={this.handleChange}
            placeholder="Message"
          />
          <Button
            className="SignMessage__button"
            title="Sign Message"
            onClick={this.signMessage}
          />
          {signedMessage && (
            <Message
              type="signedMessage"
              message={JSON.stringify(signedMessage)}
            />
          )}
        </div>
      </div>
    )
  }
}

export default SignMessage
