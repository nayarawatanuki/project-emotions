import React, { useContext, useState } from 'react'

export const KidContext = React.createContext()

const KidProvider = ({ children }) => {
    const [kid_id, setKid_id] = useState();
    const [kid_name, setKid_name] = useState();

    console.log("kid ", kid_id)
    return (
        <KidContext.Provider
            value={{
                kid_id,
                setKid_id,

                kid_name,
                setKid_name
            }}
        >
            {children}
        </KidContext.Provider>
    )
}

export default KidProvider

export function useKidContext() {
    const context = useContext(KidContext)

    if (!context) {
        throw new Error('useKidContext must be used within a KidContext.Provider.')
    }

    return context
}