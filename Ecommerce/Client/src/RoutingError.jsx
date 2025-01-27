import {useRouteError} from 'react-router-dom'
function RoutingError() {
    let err=useRouteError()
    console.log(err)
  return (
    <h1>{err.data}-{err.status}</h1>
    
  )
}

export default RoutingError