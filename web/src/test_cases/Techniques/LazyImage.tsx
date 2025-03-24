type Props = {
  imageUrl: string,
  alt: string
}

const LazyImage = ({ imageUrl, alt = 'Lazy loaded image'}: Props) => {
  return (
    <img
      src={imageUrl}
      alt={alt}
      loading="lazy"
    />
  );
};

export default LazyImage;
