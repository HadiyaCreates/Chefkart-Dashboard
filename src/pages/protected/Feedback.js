import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import FeedbackForm from '../../features/Feedback'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Book Demo" }))
      }, [])


    return(
        <FeedbackForm/>
    )
}

export default InternalPage