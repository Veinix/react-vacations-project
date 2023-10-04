import React from 'react'

interface LoadingProps {
    message: string;
}

function Loading(props: LoadingProps): JSX.Element {
  return (
    <div>
        <p>Hold on! We're loading</p>
        <p> {props.message} </p>
    </div>
  )
}

export default Loading