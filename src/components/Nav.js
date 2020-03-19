import React from 'react'
import cx from 'classnames'
import { isNull } from 'lodash'
import networks from 'constants/networks'
import './Nav.scss'

const Nav = ({ network }) => (
  <header className="Nav">
    <div className="Nav__inner">
      <h1 className="Nav__logo">
        <a href="/">
          <img
            src="images/logo-kaikas-tutorial.png"
            alt="Kaikas Tutorial"
          />
        </a>
      </h1>
      <div className={cx('Nav__network', {
        'Nav__network--error': isNull(network),
        'Nav__network--loading': network === 'loading',
      })}>
        <span>&#9679;</span>
        {isNull(network) ? 'No connection' : networks[network]}
      </div>
    </div>
  </header>
)

export default Nav
