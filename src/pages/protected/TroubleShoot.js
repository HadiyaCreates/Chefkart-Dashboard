import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'

import TroubleShoot from '../../features/leads copy 2'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Campaigns" }))
      }, [])


    return(
        <TroubleShoot />
    )
}

export default InternalPage