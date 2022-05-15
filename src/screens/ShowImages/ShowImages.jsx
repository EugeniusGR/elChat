import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { useRecoilState } from 'recoil';
import { imagesData, savePath } from '../../state';
import styles from './ShowImages.module.scss';
import { Link } from 'react-router-dom';

const ShowImages = () => {
  const [images, setImages] = useRecoilState(imagesData);
  const [path, setPath] = useRecoilState(savePath);

  const downloadImage = (url) => {
    ipcRenderer.send('downloadImage', {url, path});
  }

  return (
    <div className={styles.container}>
      <Link to={'/'}>
        <div className={styles.backContainer}>
          <span>back</span>
        </div>
      </Link>
      <div className={styles.imageContainer}>
        {images.length ? images.map((el) => <img onClick={() => downloadImage(el)} className={styles.image} src={el} />) : <div className={styles.noImages}>No Images</div>}
        
      </div>
    </div>
  );
};

export default ShowImages;
