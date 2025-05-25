import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Homepage from '../../features/leads copy 6/index copy 8'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "HomePage Management" }))
      }, [])


return(
        <Homepage/>
    )
}

export default InternalPage