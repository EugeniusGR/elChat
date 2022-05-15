import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { imagesData, savePath } from '../../state';
import { RoutesPath } from '../../constants';
import styles from './WelcomeScreen.module.scss';
import { ipcRenderer } from 'electron';
import { useEffect } from 'react/cjs/react.production.min';

const WelcomeScreen = () => {
  const [url, setUrl] = useState('');
  const [isWorking, setIsWorking] = useState(false);
  const navigate = useNavigate();
  const [images, setImages] = useRecoilState(imagesData);
  const [path, setPath] = useRecoilState(savePath);

  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    ipcRenderer.send('show-context-menu')
  })

  ipcRenderer.on('sendImages', (event, imagesUrl) => {
    console.log(imagesUrl);
    setImages(() => imagesUrl.filter((img) => img.includes('http')));
    setIsWorking(false);
    navigate(RoutesPath.SHOW_IMAGES);
  })

  ipcRenderer.on('savePath', (event, path) => {
    console.log(path);
    setPath(() => path);
  })

  const getAction = () => {
    if(!url.includes('http')){
      setUrl('')
      return;
    }
    setIsWorking(true);
    ipcRenderer.send('getImages', url);
  }

  const folderAction = () => {
    ipcRenderer.send('getPath');
  }

  const clearFolderAction = () => {
    setPath(() => '');
  }

  return (
    <div className={styles.wrapper}>
      <h2>Welcome to ImageSaver</h2>
      <input value={url} onChange={(e) => setUrl(e.target.value)} className={styles.inputUrl} type={'url'} placeholder="webpage url" />
      <button onClick={getAction} className={styles.continueButton}>{isWorking ? 'Parsing...' :'Get Images'}</button>
      <button onClick={folderAction} className={styles.setButton}>Set Path</button>
      <button onClick={clearFolderAction} className={styles.setButton}>Clear Path</button>
    </div>
  );
};

export default WelcomeScreen;
