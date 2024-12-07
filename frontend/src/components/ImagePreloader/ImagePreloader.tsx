import bomeLogo from '@images/game/bome-logo.svg';
import bonkLogo from '@images/game/bonk-logo.svg';
import brettLogo from '@images/game/brett-logo.svg';
import dogeCoinLogo from '@images/game/dogecoin-doge-logo.svg';
import dogsLogo from '@images/game/dogs-logo.svg';
import pepeLogo from '@images/game/pepe-logo.svg';
import ponkeLogo from '@images/game/ponke-logo.svg';
import mangoMarketsMngoLogo from '@images/game/mango-markets-mngo-logo.svg';
import memeMemeLogo from '@images/game/meme-meme-logo.svg';
import pancakeSwap from '@images/game/pancakeswap-cake-logo.svg';
import simonsCat from '@images/game/simonscat-cat-logo.svg';
import './ImagePreloader.scss'

export default function ImagePreloader() {
    return (
        <div className='image-preloader'>
            <img src={bomeLogo} alt="Bome Logo" />
            <img src={bonkLogo} alt="Bonk Logo" />
            <img src={brettLogo} alt="Brett Logo" />
            <img src={dogeCoinLogo} alt="Dogecoin Logo" />
            <img src={dogsLogo} alt="Dogs Logo" />
            <img src={pepeLogo} alt="Pepe Logo" />
            <img src={ponkeLogo} alt="Ponke Logo" />
            <img src={mangoMarketsMngoLogo} alt="Mango Markets Logo" />
            <img src={memeMemeLogo} alt="Meme Logo" />
            <img src={pancakeSwap} alt="Pancake Swap Logo" />
            <img src={simonsCat} alt="Simon's Cat Logo" />
        </div>
    )
}