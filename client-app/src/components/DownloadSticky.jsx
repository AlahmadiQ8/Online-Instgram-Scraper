import React from 'react';
import classNames from 'classnames';

export default (props) => {

  const classes = classNames('DownloadSticky', 'btn', 'btn-primary', {'display-block': props.downloadLength})
  return (
    <button className={classes}>Download {props.downloadLength}</button>
  );
}