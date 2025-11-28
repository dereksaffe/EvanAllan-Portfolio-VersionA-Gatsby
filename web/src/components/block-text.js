import React from 'react'
import {PortableText} from '@portabletext/react'
import serializers from './serializers'

const BlockText = ({blocks}) => {
  if (!blocks) {
    return null
  }

  return <PortableText value={blocks} components={serializers} />
}

export default BlockText
