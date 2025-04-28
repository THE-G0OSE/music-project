import { MusicList } from '../../../widgets/music-list/ui/MusicList'

export const Home = () => {
  return (
    <div>
      <h1 className='ml-8 text-green-500 text-[2rem] font-bold'>Исследуйте</h1>
      <h2 className='ml-8 font-bold text-[1.3rem] mt-5 mb-2'>Популярное сейчас</h2>
      <MusicList/>
      <h2 className='ml-8 font-bold text-[1.3rem] mt-5 mb-2'>Для вас</h2>
      <MusicList/>
      <h2 className='ml-8 font-bold text-[1.3rem] mt-5 mb-2'>Новинки</h2>
      <MusicList/>
      <div className='h-40 md:h-24' />
    </div>
  )
}
