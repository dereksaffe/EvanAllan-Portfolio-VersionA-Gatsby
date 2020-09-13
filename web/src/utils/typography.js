import Typography from 'typography'

import deYoungTheme from 'typography-theme-de-young'

const typography = new Typography({
  ...deYoungTheme,
  overrideThemeStyles: () => ({
    'a:hover,a:active': {
      boxShadow: 'null'
    },
    'a': {
      color: 'black'
    },
    'img': {
      marginLeft: 'null',
      marginRight: 'null',
      marginTop: 'null',
      margin: 'null',
      paddingBottom: 'null',
      paddingLeft: 'null',
      paddingRight: 'null',
      paddingTop: 'null',
      marginBottom: 'null'
    }
  })
})

export default typography
