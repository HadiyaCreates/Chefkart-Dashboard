import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AboutList from '../../features/leads copy 6'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "About" }))
      }, [])


return(
        <AboutList/>
    )
}

export default InternalPage