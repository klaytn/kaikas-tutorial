import React from 'react'
import './GithubLink.scss'

const GithubLink = ({ className, component }) => (
  <a
    className={`GithubLink ${className}`}
    href={`https://github.com/klaytn/kaikas-tutorial/blob/master/src/components/${component}.js`}
    title={`View ${component} component source code`}
    target="_blank"
  >
    View source code
  </a>
)

export default GithubLink
