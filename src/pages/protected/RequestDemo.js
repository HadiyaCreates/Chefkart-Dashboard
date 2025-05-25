import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import RequestDemo from '../../features/Demo'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "RequestDemo" }))
      }, [])


    return(
        <RequestDemo/>
    )
}

export default InternalPage