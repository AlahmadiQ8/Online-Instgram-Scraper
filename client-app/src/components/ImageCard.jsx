
import React from 'react';


const ListItem = (props) => (
  <li className="list-group-item justify-content-between">
    <div><small>{props.info}</small></div>
    <div><small>{props.value}</small></div>
  </li>
)

export default (props) => (
  <div className="card image-card">
    <a href={props.link || '#'}><img className="card-img-top" src={props.img_url || 'http://placehold.it/200x200'} alt="Card image cap"/></a>
    <ul className="list-group list-group-flush">
      <ListItem info='Likes' value='123' />
      <ListItem info='Comments' value='123' />
      <ListItem info='Views' value='123' />
      <ListItem info='Posted' value='123' />
    </ul>
  </div>
)