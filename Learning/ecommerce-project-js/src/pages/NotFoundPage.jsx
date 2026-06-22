import { Header } from '../components/Header'
import NotFoundGif from '../assets/notfound.webp'
import './NotFoundPage.css'
export function NotFoundPage({ cart }){
  return (
    <>
      <Header cart={cart}/>
      <div className='not-found-container'>
        <img src={NotFoundGif} className='not-found-image'/>
        <p className='text-404-box'>404</p>
        <p>Page not found!</p>
      </div>
    </>
  );
}