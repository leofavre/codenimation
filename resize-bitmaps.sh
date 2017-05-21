#!/bin/bash

# Batch resize images proportionally
# to an array of widths, only if they
# are larger, using ImageMagick.

# Images folder. It should have only images.
path="./bitmap";

# Resized images folder.
output="./bitmap/resized";

# Desired images widths, in pixels.
sizes=(400 700 900 1100 1400 1700 2000 2300 2700);

mkdir -p $path &&
mkdir -p $output &&

for img in $path/*.*;
	do for size in ${sizes[@]};
		do width=`magick identify -ping -format "%w" $img`;

		name=${img##*/};
		ext=${name#*.};

		if [ $width -ge $size ];
			then magick convert "$img" -resize "${size}" "$output/$name-$size.$ext";
		fi;
	done;
done;
