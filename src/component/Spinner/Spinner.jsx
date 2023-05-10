import React from 'react'
import SpinnerTag from '../../assets/img/loading.gif'

const Spinner = () => {
  return (
    <div>
      <img src={SpinnerTag} className="d-block m-auto" style={{width:'330px'}}/>
    </div>
  )
}

export default Spinner
