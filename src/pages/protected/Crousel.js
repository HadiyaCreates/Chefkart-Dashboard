import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Crousel from '../../features/leads copy 6/index copy 5'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Crousel Management" }))
      }, [])


return(
        <Crousel/>
    )
}

export default InternalPage