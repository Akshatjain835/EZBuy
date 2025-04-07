import React from 'react'

const CreateSearchParams=(filterParams)=>{

    const queryParams = [];
  
    for (const [key, value] of Object.entries(filterParams)) {

      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
  
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
  
    // console.log(queryParams, "queryParams");
  
    return queryParams.join("&");
  }

export default CreateSearchParams