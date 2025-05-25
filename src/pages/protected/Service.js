import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'

import Services from '../../features/leads copy/index copy'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Service" }))
      }, [])


return(
        <Services/>
    )
}

export default InternalPage