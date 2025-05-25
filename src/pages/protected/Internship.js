import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
// import AboutList from '../../features/leads copy 6'


import InternshipForm from '../../features/leads copy 6/index copy 2'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Gallery" }))
      }, [])


return(
        <InternshipForm/>
    )
}

export default InternalPage