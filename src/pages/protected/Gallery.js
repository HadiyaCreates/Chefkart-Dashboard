import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
// import AboutList from '../../features/leads copy 6'
import Gallery from '../../features/leads copy 6/index copy'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Gallery -Management" }))
      }, [])


return(
        <Gallery/>
    )
}

export default InternalPage