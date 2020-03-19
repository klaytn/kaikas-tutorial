import React from 'react'
import cx from 'classnames'

import './Button.scss'

const Button = ({
  className,
  title,
  onClick,
  icon,
  disabled,
}) => {
  const iconStyle = {
    paddingLeft: '18px',
    background: `left / 12px no-repeat url('/images/${icon}')`,
  }

  return (
    <button
      className={cx('Button', className)}
      onClick={onClick}
      disabled={disabled}
    >
      <span style={icon && iconStyle}>
        {title}
      </span>
    </button>
  )
}

export default Button
