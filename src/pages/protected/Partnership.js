
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'

import { useEffect } from 'react'
import PartnershipList from '../../features/leads copy 7/index copy 2'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Partnership" }))
      }, [])


    return(
        <PartnershipList />
    )
}

export default InternalPage