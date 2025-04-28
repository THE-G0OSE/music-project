import { musicMock } from '../../../shared/mocks/musicMock'
import { MusicWideCard } from '../../../entities/music/ui/MusicWideCard'

export const LikesLibrary = () => {
  return (
    <div className='flex flex-col gap-2 mt-2 ml-2'>
        {musicMock.map((music, id) => <MusicWideCard key={id} {...music} />)}
        <div className='h-60 md:h-30' />
    </div>
  )
}
