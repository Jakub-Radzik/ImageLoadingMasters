import { FC, ImgHTMLAttributes } from 'react';
import { Helmet } from 'react-helmet';

interface PreloadedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  imageUrl: string;
  alt?: string;
}

const PreloadedImage: FC<PreloadedImageProps> = ({ imageUrl, alt = 'Image', ...props }) => {
  return (
    <>
      <Helmet>
        <link rel="preload" href={imageUrl} as="image" />
      </Helmet>
      <img src={imageUrl} alt={alt} {...props} />
    </>
  );
};

export default PreloadedImage;
