import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import BookDemo from '../../features/BookDemo'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Book Demo" }))
      }, [])


    return(
        <BookDemo/>
    )
}

export default InternalPage