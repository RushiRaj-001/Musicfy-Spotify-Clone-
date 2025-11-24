import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";
import { Clock } from "lucide-react";

const DisplayAlbum = ({ album }) => {
  const { id } = useParams();
  const { albumsData, songsData } = useContext(PlayerContext);

  
  if (!albumsData || albumsData.length === 0) {
    return (
      <div className="mt-10 text-white">
        <h2 className="text-xl">Loading album...</h2>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="mt-10 text-white">
        <h2 className="text-xl">Album not found</h2>
        <p className="text-gray-400">ID: {id}</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img src={album.imageUrl} alt="" className="w-48 rounded " />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{album.name}</h2>
          <h4>{album.desc}</h4>
          <p className="mt-1">
            <img
              src={assets.logo}
              alt="logo"
              className="inline-block w-5 mr-1"
            />
            <b>Musify</b> • 12,345 • <b>6 Songs</b> • about 1 hr 23 min
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4"># Title</b>
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <Clock className="m-auto w-4" />
      </div>
      <hr />
      {songsData
        .filter((song) => song.album === album.name)
        .map((item, index) => (
          <div
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            key={index}
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img src={item.image} alt="" className="inline w-10 mr-5" />
              {item.name}
            </p>
            <p className="text-[15px]">{album.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))}
    </>
  );
};

export default DisplayAlbum;
