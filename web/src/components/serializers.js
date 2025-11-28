import React from 'react'
import Figure from './figure'

const serializers = {
  types: {
    figure: ({value}) => <Figure node={value} />,
  },
}

export default serializers
