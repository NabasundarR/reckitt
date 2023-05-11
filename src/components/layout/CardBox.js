import React from 'react'
import { FaBriefcase } from 'react-icons/fa'

const CardBox = (props) => {
  return (
    <div className='card-items'>
        <div className='card-box'>
            <div className='iconsDiv'>
                <FaBriefcase color='#0000a0'/>
            </div>
            <div className='ContentDiv'>
                  <span className='ContentDivText'>{props.clientName}</span>
            </div>

        </div>
    </div>
  )
}

export default CardBox
