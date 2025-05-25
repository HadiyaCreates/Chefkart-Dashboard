import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import PrivacyPolicy from '../features/settings/PrivacyPolicy'

function ExternalPage(){


    return(
        <div className="">
            <PrivacyPolicy />
        </div>
    )
}

export default ExternalPage