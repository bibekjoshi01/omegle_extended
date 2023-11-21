import React from 'react'
import setCookie from './setCookie';

function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
  }

export default deleteCookie