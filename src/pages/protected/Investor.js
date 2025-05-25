
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'

import { useEffect } from 'react'

import InvestorList from '../../features/leads copy 7/index copy 3'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Investor" }))
      }, [])


    return(
        <InvestorList />
    )
}

export default InternalPage