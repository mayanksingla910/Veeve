"use client";

import exampleImages from "../../public/assets/example_images";
import MasonryGrid from "./masonary";
import Card from "./card"; 

export default function Feed() {
  return (
    <MasonryGrid >
      {exampleImages.map((image, index) => (
        <Card 
            key={`${image.url}-${index}`} 
            url={image.url} 
            width={image.width} 
            height={image.height} 
        />
      ))}
    </MasonryGrid>
  );
}