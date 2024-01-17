import React, { useEffect, useState } from 'react'
import { getClicks } from '../helpers/saveLocaldtorage'

export const Data = () => {

    const [clicks, setClicks] = useState(0)
    useEffect(() => {
        const clicks = getClicks()
        setClicks(clicks)
    }, [])

    return (
        <div>  
        <h1>Numero de Usuarios que usaron el Totem : {clicks}</h1>      
        </div>
    )
}
