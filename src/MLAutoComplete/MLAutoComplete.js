import React from 'react'
import PropTypes from 'prop-types'
import { AutoComplete } from 'antd'
import MLSizeContext from '../MLConfigProvider/MLSizeContext'
import classNames from 'classnames'

const MLAutoComplete = React.forwardRef((props, ref) => {
  return (
    <MLSizeContext.Consumer>
      {(contextSize) => {
        const size = contextSize || props.size
        return (
          <AutoComplete
            ref={ref}
            {...props}
            size={size}
            className={classNames('ml-auto-complete', props.className)}
          >
            {props.children}
          </AutoComplete>
        )
      }}
    </MLSizeContext.Consumer>
  )
})

MLAutoComplete.displayName = 'MLAutoComplete'

export default MLAutoComplete
