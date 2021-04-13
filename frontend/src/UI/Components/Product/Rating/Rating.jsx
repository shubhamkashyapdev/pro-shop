import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      {new Array(5).fill(1).map((item, i) => {
        const val = i + 1
        return (
          <span key={val}>
            <i
              style={{ color: color }}
              className={
                value >= val
                  ? 'fas fa-star'
                  : value >= val - 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
        )
      })}
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}
Rating.prototype = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Rating
