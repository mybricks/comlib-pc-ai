import React, { useEffect } from 'react';
import Runtime from './runtime'
import context from "./context";

export default (props) => {
  useEffect(() => {
    context.setAiComParams(props.id, props);
  }, [])
  return <Runtime {...props}/>
}
