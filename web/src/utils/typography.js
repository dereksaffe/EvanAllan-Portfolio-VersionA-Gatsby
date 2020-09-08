import Typography from 'typography'

import deYoungTheme from 'typography-theme-de-young'

const typography = new Typography({
  ...deYoungTheme,
  overrideThemeStyles: () => ({
    'a:hover,a:active': {
      boxShadow: 'null'
    }
  })
})

export default typography
