// import bomeLogo from '@images/game/bome-logo.svg';
// import bonkLogo from '@images/game/bonk-logo.svg';
// import brettLogo from '@images/game/brett-logo.svg';
// import dogeCoinLogo from '@images/game/dogecoin-doge-logo.svg';
// import dogsLogo from '@images/game/dogs-logo.svg';
// import pepeLogo from '@images/game/pepe-logo.svg';
// import ponkeLogo from '@images/game/ponke-logo.svg';
// import mangoMarketsMngoLogo from '@images/game/mango-markets-mngo-logo.svg';
// import memeMemeLogo from '@images/game/meme-meme-logo.svg';
// import pancakeSwap from '@images/game/pancakeswap-cake-logo.svg';
// import simonsCat from '@images/game/simonscat-cat-logo.svg';
import './ImagePreloader.scss'
import { useEffect, useState } from 'react';
import { getImages } from '@/utils/api';
import { BACKEND_URL } from '@/utils';

export default function ImagePreloader() {
    const [images, setImages] = useState([]);
    const getImagesList = async () => {
        const res = await getImages()
        setImages(res)
    }
    useEffect(() => {
        getImagesList()
    },[])
    return (
        <div className='image-preloader'>
            {images.map((image, index) => (
                <img key={index} src={'https://fudless.space' + image} alt={`Image ${index}`} />
            ))}
        </div>
    )
}