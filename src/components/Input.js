import React from 'react'
import cx from 'classnames'

import './Input.scss'

const Input = ({
  className,
  type,
  name,
  label,
  value,
  onChange,
  placeholder,
  err,
  readOnly,
}) => (
  <div className={cx('Input', className)}>
    {
      label &&
      <label className="Input__label" htmlFor={name}>
        {label}
      </label>
    }
    <input
      id={name}
      type={type || 'text'}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={cx(
        'Input__input', {
          'Input__input--err': err,
          'Input__input--readOnly': readOnly,
        },
      )}
      autoComplete="off"
    />
    {
      err &&
      <p className="Input__err">{err}</p>
    }
  </div>
)

export default Input
