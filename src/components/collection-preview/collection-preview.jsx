import React from 'react';

import CollectionItem from '../collection-item/collection-item';

import './collection-preview.scss';


const CollectionPreview = ({title, items}) => {
  return <div className='collection-preview'>
    <h1 className='title'>{title.toUpperCase()}</h1>
    <div className='preview'>
      {
        items.filter((v, i) => i < 4)
             .map(({ id, ...rest }) => {
          return <CollectionItem key={id} {...rest}/>
        })
      }
    </div>
  </div>
}

export default CollectionPreview;