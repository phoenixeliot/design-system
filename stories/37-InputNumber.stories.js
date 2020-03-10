import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { MLInputNumber } from '../src'
import { removeDefaultProps, boolean, number, select } from './default-aware-knobs'

export default {
  title: 'Data Entry/MLInputNumber',
  decorators: [withKnobs],
  parameters: {
    info: {
      text: 'Component description goes here'
    }
  }
}

const noopParser = (s) => s
const percentParser = (s) => (s).replace('%', '')

const noopFormatter = (s) => s
const percentFormatter = (s) => `${s}%`

export const basic = () => {
  const props = {
    defaultValue: number('defaultValue', undefined),
    disabled: boolean('disabled', true),
    parser: select('parser', {
      None: noopParser,
      "(s) => (s).replace('%', '')": percentParser
    }, noopParser),
    formatter: select('formatter', {
      None: noopFormatter,
      // eslint-disable-next-line no-template-curly-in-string
      '(s) => `${s}%`': percentFormatter
    }, noopFormatter),
    size: select('size', {
      small: 'small',
      middle: 'middle',
      large: 'large'
    }, 'small'),
    min: number('min', -Infinity),
    max: number('max', Infinity),
    step: number('step', 1),
    precision: number('precision', 0),
    onChange: action('onChange'),
    onPressEnter: action('onPressEnter')
  }
  removeDefaultProps(props)
  return (<MLInputNumber {...props} />)
}

export const disabled = () => {
  const props = {
    defaultValue: number('defaultValue', undefined),
    disabled: boolean('disabled', true),
    parser: select('parser', {
      None: noopParser,
      "(s) => (s).replace('%', '')": percentParser
    }, noopParser),
    formatter: select('formatter', {
      None: noopFormatter,
      // eslint-disable-next-line no-template-curly-in-string
      '(s) => `${s}%`': percentFormatter
    }, noopFormatter),
    size: select('size', {
      small: 'small',
      middle: 'middle',
      large: 'large'
    }, 'small'),
    min: number('min', 0),
    max: number('max', 100),
    step: number('step', 1),
    precision: number('precision', 0),
    onChange: action('onChange'),
    onPressEnter: action('onPressEnter')
  }
  return (<MLInputNumber {...props} />)
}
export const formatter = () => {
  const props = {
    defaultValue: number('defaultValue', undefined),
    disabled: boolean('disabled', true),
    parser: select('parser', {
      None: noopParser,
      "(s) => (s).replace('%', '')": percentParser
    }, (s) => (s).replace('%', '')),
    formatter: select('formatter', {
      None: noopFormatter,
      // eslint-disable-next-line no-template-curly-in-string
      '(s) => `${s}%`': percentFormatter
    }, percentFormatter),
    size: select('size', {
      small: 'small',
      middle: 'middle',
      large: 'large'
    }, 'small'),
    min: number('min', 0),
    max: number('max', 100),
    step: number('step', 1),
    precision: number('precision', 0),
    onChange: action('onChange'),
    onPressEnter: action('onPressEnter')
  }
  return (<MLInputNumber {...props} />)
}
export const sizes = () => {
  const props = {
    defaultValue: number('defaultValue', undefined),
    disabled: boolean('disabled', true),
    parser: select('parser', {
      None: noopParser,
      "(s) => (s).replace('%', '')": percentParser
    }, (s) => (s).replace('%', '')),
    formatter: select('formatter', {
      None: noopFormatter,
      // eslint-disable-next-line no-template-curly-in-string
      '(s) => `${s}%`': percentFormatter
    }, percentFormatter),
    min: number('min', 0),
    max: number('max', 100),
    step: number('step', 1),
    precision: number('precision', 0),
    onChange: action('onChange'),
    onPressEnter: action('onPressEnter')
  }
  return (
    <div>
      <MLInputNumber {...props} size='small' />
      <MLInputNumber {...props} size='middle' />
      <MLInputNumber {...props} size='large' />
    </div>
  )
}
export const decimals = () => {
  const props = {
    defaultValue: number('defaultValue', undefined),
    disabled: boolean('disabled', false),
    parser: select('parser', {
      None: noopParser,
      "(s) => (s).replace('%', '')": percentParser
    }, noopParser),
    formatter: select('formatter', {
      None: noopFormatter,
      // eslint-disable-next-line no-template-curly-in-string
      '(s) => `${s}%`': percentFormatter
    }, noopFormatter),
    size: select('size', {
      small: 'small',
      middle: 'middle',
      large: 'large'
    }, 'small'),
    min: number('min', 0),
    max: number('max', 100),
    step: number('step', 0.1),
    precision: number('precision', 1),
    onChange: action('onChange'),
    onPressEnter: action('onPressEnter')
  }
  return (<MLInputNumber {...props} />)
}
