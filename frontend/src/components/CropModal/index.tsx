import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Cropper from 'react-easy-crop';
import { useCallback, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import RoundedButton from 'components/RoundedButton';
import { getCroppedImg } from 'utils/canvasUtils';

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

const CropModal: FC<Props> = ({ onCropEnd, onClose }) => {
  const [image, setImage] = useState<undefined | string>(undefined);
  const [croppedImage, setCroppedImage] = useState(undefined);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleOnDrop = async (file) => {
    const imageDataUrl = await readFile(file[0]);
    setImage(imageDataUrl as string);
  };

  const handleCropEnd = useCallback((_, croppedAreaPixels) => {
    setCroppedImage(croppedAreaPixels);
  }, []);

  const handleClick = async () => {
    const newImage = await getCroppedImg(image, croppedImage, 0);

    onCropEnd(newImage);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        {image && (
          <div className={styles.crop}>
            <div className={styles.cropArena}>
              <Cropper
                image={image}
                crop={crop}
                aspect={1}
                zoom={zoom}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropEnd}
                cropShape="round"
                showGrid={false}
              />
            </div>
            <div className={styles.buttons}>
              <RoundedButton
                outline
                onClick={onClose}
                className={`${styles.button} ${styles.black}`}
              >
                Close
              </RoundedButton>
              <RoundedButton onClick={handleClick} className={styles.button}>
                Save
              </RoundedButton>
            </div>
          </div>
        )}

        {!image && (
          <div className={styles.dragDrop}>
            <div className={styles.drag}>
              <Dropzone onDrop={handleOnDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section className={styles.dragSection}>
                    <div className={styles.dragSection} {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className={styles.buttons}>
              <RoundedButton onClick={onClose} className={styles.button}>
                Close
              </RoundedButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropModal;
