import { currentMusicSlice } from "../../../app/store/currentMusicSlice";

export const Player = () => {
  const musicSlice = currentMusicSlice();
  const music = musicSlice.music;

  if (music) {
    return (
      <div className="fixed md:bottom-4 md:left-[3%] bottom-20 left-0 flex justify-center w-full h-20">
        <div className="h-full relative pl-7 md:pl-14 gap-2 text-black w-[90%] relative bg-white border-green-500 border-2 rounded-full shadow-md shadow-black flex ">
          <div className="h-20 w-20 stretch-0 -translate-y-6 rounded-xl overflow-hidden rounded-xl border-2 border-green-500 bottom-6">
            <img
              className="object-cover size-full"
              src={"http://localhost:3200/" + music.cover_image}
            />
          </div>
          <div className="flex w-[calc(100%-100px)] md:flex-row flex-col">
            <div className="flex md:flex-col w-50 md:gap-0 gap-3">
              <p className="text-[1.4rem] -mb-2 font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                {music.title}
              </p>
              <p className="text-slate-400 md:translate-y-0 text-[1.2rem] whitespace-nowrap overflow-hidden overflow-ellipsis">
                {music.author}
              </p>
            </div>
            <div className="md:w-[calc(100%-200px)] md:scale-[1] scale-[.8] w-full -translate-x-7 md:translate-x-0 -translate-y-1 md:translate-y-3">
              <audio
                id="player"
                className="w-full"
                src={"http://localhost:3200/" + music.path}
                controls
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <span />;
  }
};
