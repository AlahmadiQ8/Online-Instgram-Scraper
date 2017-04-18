
import React from 'react';
import moment from 'moment';


const parseTime = (epoch) => moment(parseInt(epoch, 10)*1000).fromNow();

const ListItem = (props) => (
  <li className="list-group-item justify-content-between">
    <div><small>{props.info}</small></div>
    <div><small>{props.value}</small></div>
  </li>
)

export const ImageCard = (props) => {

  return (
  <div className="card image-card">
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
}