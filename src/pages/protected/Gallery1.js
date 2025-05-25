import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Gallery from '../../features/leads copy 6/index copy 3'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Gallery Management" }))
      }, [])


return(
        <Gallery/>
    )
}

export default InternalPage