import React, { useEffect, useState } from 'react';

import nft from './assets/nft-icon.png'

const DocUpload = ({ title, subtitle, label, onChange, note }) => {
    
    const [url,setUrl] = useState('')
    
    useEffect(()=>{
        setUrl(note)
    },[note])

    return (
        <div className="doc__container">
            {/* <p className="doc__text"> DOCUMENT UPLOAD</p> */}
            <div className='doc'>
                <img src={nft} className='doc__icon' />
                <div className="doc__content">
                    <p className="doc__title">
                        {note ? 'Document Successfully Uploaded' : title}
                    </p>
                    {url ? <a href={url} target="_blank">View File</a> :
                        <p className="doc__subtitle">
                            {subtitle}
                        </p>}
                </div>
                <label className='doc__upload' onChange={onChange}>
                    {url ? 'Reupload' : label}
                    <input type="file" id="myFile" name="filename" />
                </label>

            </div>
        </div>
    )
}

export default DocUpload