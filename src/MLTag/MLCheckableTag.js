import React from 'react'
import { Tag } from 'antd'
import classNames from 'classnames'
const { CheckableTag } = Tag

const MLCheckableTag = React.forwardRef((props, ref) => {
  return (
    <CheckableTag
      ref={ref}
      {...props}
      className={classNames('ml-tag-checkable-tag', props.className)}
    >
      {props.children}
    </CheckableTag>
  )
})

MLCheckableTag.displayName = 'MLTag.MLCheckableTag'

export default MLCheckableTag
