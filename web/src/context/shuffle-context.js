import React, {createContext, useContext, useState, useCallback} from 'react'

const defaultValue = {
  shuffleKey: 0,
  triggerShuffle: () => {},
}

const ShuffleContext = createContext(defaultValue)

export const ShuffleProvider = ({children}) => {
  const [shuffleKey, setShuffleKey] = useState(0)

  const triggerShuffle = useCallback(() => {
    setShuffleKey(prev => prev + 1)
  }, [])

  return (
    <ShuffleContext.Provider value={{shuffleKey, triggerShuffle}}>
      {children}
    </ShuffleContext.Provider>
  )
}

export const useShuffle = () => {
  const context = useContext(ShuffleContext)
  // Return default values if used outside provider
  return context || defaultValue
}

export default ShuffleContext
