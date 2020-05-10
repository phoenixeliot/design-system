import React from 'react';
import { linkTo } from '@storybook/addon-links';

TODO: Display this as a proper MDX file.

# Welcome to the MarkLogic Design System Storybook

This documentation is meant to be used in conjunction with the [Official Ant v3 Docs](https://3x.ant.design/docs/react/introduce). This library is based off of **version 3** of Ant, so make sure to stick to the v3 docs.


## How to customize theme colors

In your webpack.config.js or config-overrides.js, provide the Less loader the `modifyVars` option, defining any `less` variables you want to override. There is an example at `@marklogic/design-system/src/theme-variables.json`.

See [Ant's page on customizing the theme](https://ant.design/docs/react/customize-theme) for more detail and a full list of theme variables provided by Ant.


## How to use these components

Basic component usage:
- This works for all components that are exported in `@marklogic/design-system/src/index.js`
```jsx
import { MLButton } from '@marklogic/design-system'
```

Some components are nested inside others, eg `MLInput.MLGroup`:
- These generally are matched to how Ant organizes their components
- Like Ant, these have displayNames like `MLInputGroup` in Story Source panels, but should be used like so:
```jsx
import { MLInput } from '@marklogic/design-system'
const { MLGroup } = MLInput // or use MLInput.MLGroup directly, in your JSX
```

A few components must be imported directly from their path, or should be if you want tree-shaking (like with {linkTo('MLIcon')}):
```jsx
import { CheckCircleOutlined } from '@marklogic/design-system/src/MLIcon'
```


## Storybook Gotchas

How StoryBook renders Story Source blocks:
- Source blocks show what React components are rendered, and their props (and any other HTML elements in the story). Other source code that goes into a story does not generally display in the Story Source panel.
- When showing you the source code for a story, StoryBook displays function props as `noRefCheck`, rather than showing the function contents. When copying from these stories, you will have to provide actual functions here instead. In most cases, Ant is better reference for what functions are appropriate for these props.
- StoryBook will also "collapse" dynamically determined values into whatever their final concrete value is, as it was passed into the React component props. Eg `{ someProp: someCondition ? true : false }` will render only as `{ someProp: true }` (or false, whichever it ended up being)