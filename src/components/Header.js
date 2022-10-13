import Button from './Button'
import React from 'react'



const Header = ({title, onAdd, showTask}) => { //arrow function
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button 
      color={showTask ?'red' : 'green'} 
      text={showTask ? 'Close' : 'Add'}
      onClick={onAdd}/>
    </header>
  )
}

Header.defaultProps ={
    title: 'Task Tracker'
}

/*Header.propTypes ={
    title: PropTypes.string.isRequired,
}*/

export default Header
