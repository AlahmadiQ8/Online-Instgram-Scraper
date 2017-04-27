
import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

const parseTime = (epoch) => moment(parseInt(epoch, 10)*1000).fromNow();

const ListItem = (props) => (
  <li className="list-group-item justify-content-between">
    <div><small>{props.info}</small></div>
    <div><small>{props.value}</small></div>
  </li>
)

export const ImageCard = (props) => {
  const selectedStext = props.isSelected ? 'Selected' : 'Select';

  const classes = classNames('btn', 'btn-sm', 'select-image', 'btn-custom', {'display-block': props.isSelected})
  return (
  <div className="card image-card">
    <button onClick={(e) => props.handleSelect(props.id)} className={classes}>{selectedStext}</button>
    <a target='_blank' href={props.link || '#'}><img className="card-img-top" src={props.imgUrl || 'http://placehold.it/200x200'} alt=""/></a>
    <ul className="list-group list-group-flush">
      <ListItem info='Likes' value={props.likesCount} />
      <ListItem info='Comments' value={props.commentsCount} />
      {props.videoViews && <ListItem info='Views' value={props.videoViews} />}
      <ListItem info='Posted' value={parseTime(props.createTime)} />
    </ul>
  </div>
)}

ImageCard.propTypes = {
  imgUrl: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  createTime: React.PropTypes.string.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  handleSelect: React.PropTypes.func.isRequired,
}