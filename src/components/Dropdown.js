import React, { Component } from 'react'
import cx from 'classnames'

import './Dropdown.scss'

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  state = {
    isShow: false,
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleToggle = () => this.setState({ isShow: !this.state.isShow })

  handleClose = () => this.setState({ isShow: false })

  handleSelect = (item) => {
    this.props.handleSelect(item)
    this.handleClose()
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.handleClose()
    }
  }

  render() {
    const { placeholder, list, className, selectedItem } = this.props
    const { isShow } = this.state

    return (
      <div
        ref={this.setWrapperRef}
        className={cx('Dropdown', className, {
          'Dropdown--active': this.state.isShow,
        })}
      >
        <div
          className="Dropdown__title"
          onClick={this.handleToggle}
        >
          {selectedItem || placeholder}
        </div>
        {isShow &&
          <div className="Dropdown__list">
            {list.map((item) => (
              <div
                key={item}
                className="Dropdown__listItem"
                onClick={() => this.handleSelect(item)}
              >
                {item}
              </div>
            ))}
          </div>
        }
      </div>
    )
  }
}

export default Dropdown
