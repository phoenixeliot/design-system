import React from 'react'
import { action } from '@storybook/addon-actions'
import MLUpload from '../src/ml-upload'
import { withKnobs } from '@storybook/addon-knobs'
import _ from 'lodash'

export default {
  title: 'Data Entry/MLUpload',
  decorators: [withKnobs],
  parameters: {
    info: {
      text: 'Component description goes here',
    },
  },
}

export const basic = () => {
  const props = {
  }
  return (<MLUpload {...props} />)
}