import React from 'react'
import {PortableText} from '@portabletext/react'
import serializers from './serializers'

const BlockContent = ({blocks}) => {
  if (!blocks) {
    return null
  }

  return <PortableText value={blocks} components={serializers} />
}

export default BlockContent
