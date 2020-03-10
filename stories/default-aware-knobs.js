import {
  array as _array,
  boolean as _boolean,
  button as _button,
  color as _color,
  date as _date,
  files as _files,
  number as _number,
  object as _object,
  optionsKnob as _optionsKnob,
  radios as _radios,
  select as _select,
  text as _text
} from '@storybook/addon-knobs'

// TODO: Check if we really want this hanging around between story pages.
//  Probably fine since its values get overwritten any time a new knob is made?
const defaultKnobValues = {}

const removeDefaultProps = (props) => {
  Object.keys(props).forEach((key) => {
    if (defaultKnobValues[key] === props[key] ||
      _.isNull(props[key]) ||
      _.isUndefined(props[key]) ||
      (_.isFunction(defaultKnobValues[key]) && defaultKnobValues[key].name === props[key].name)) {
      delete props[key]
    }
  })
}

function wrapKnob(knobType) {
  let defaultArgIndex = 1
  if (knobType === _select ||
      knobType === _radios ||
      knobType === _optionsKnob) {
    defaultArgIndex = 2
  }
  return function() {
    const knobName = arguments[0]
    defaultKnobValues[knobName] = arguments[defaultArgIndex]
    return knobType.apply(null, arguments)
  }
}

const text = wrapKnob(_text)
const boolean = wrapKnob(_boolean)
const number = wrapKnob(_number)
const color = wrapKnob(_color)
const object = wrapKnob(_object)
const select = wrapKnob(_select)
const radios = wrapKnob(_radios)
const array = wrapKnob(_array)
const date = wrapKnob(_date)
const button = wrapKnob(_button)
const files = wrapKnob(_files)
const optionsKnob = wrapKnob(_optionsKnob)

export {
  removeDefaultProps,
  defaultKnobValues,
  text,
  boolean,
  number,
  color,
  object,
  select,
  radios,
  array,
  date,
  button,
  files,
  optionsKnob
}
