Lets use tiff file as reference.

# Tiff to png (all compression levels 0-9)
```
convert 1_ref_tiff.tiff -define png:compression-level=9 1_compress_9.png

convert 1_ref_tiff.tiff -define png:compression-level=0 1_compress_0.png

```

# Resize image to widht with the same aspect ratio

```
convert 1.tiff -compress none -resize 800x 1_w800.tiff

```