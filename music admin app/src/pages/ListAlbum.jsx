import toast from "react-hot-toast";
import DashboardLayout from "../layout/DashboardLayout";
import { albumsAPI } from "../services/apiService";
import {
  AlbumIcon,
  FileText,
  Image,
  Palette,
  Settings2,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
const ListAlbum = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const response = await albumsAPI.list();
      setData(response.data.albums);
    } catch (error) {
      toast.error("Error while fetching albums");
    } finally {
      setLoading(false);
    }
  };

  const removeAlbum = async (albumId) => {
    try {
      const response = await albumsAPI.remove(albumId);
      if (response.status === 204) {
        toast.success("Album removed successfully");
        await fetchAlbums();
      } else {
        toast.error("Album not removed");
      }
    } catch (error) {
      toast.error("Error while removing album");
    }
  };
  useEffect(() => {
    fetchAlbums();
  }, []);
  return (
    <DashboardLayout activeMenu="List Album">
      {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="p-6">
          {/* header section  */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Albums library
            </h1>
            <p className="text-gray-600"> Manage your album collection</p>
          </div>

          {/* Table container  */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* table header  */}
            <div className="bg-gradient-to-r from-[#3be477] to-[#2dd865] px-6 py-4">
              <div className="grid grid-cols-12 gap-4 items-center text-white font-semibold">
                <div className="col-span-2 flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  <span>Cover</span>
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <AlbumIcon className="w-4 h-4" />
                  <span>Album Name</span>
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Description</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span>Theme</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Settings2 className="w-4 h-4 " />
                  <span>Actions</span>
                </div>
              </div>
            </div>
            {/* Table body */}
            <div className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Image className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 text-lg">No Albums found</p>
                  <p className="text-gray-400 text-sm">
                    Add some albums to get started
                  </p>
                </div>
              ) : (
                data.map((album, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* Album image */}
                    <div className="col-span-2">
                      <div className="w-12 h-12 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden ">
                        <img
                          src={album.imageUrl}
                          alt={album.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Album name */}
                    <div className="col-span-3">
                      <p className="text-gray-900 font-medium truncate">
                        {album.name}
                      </p>
                    </div>
                    {/* album description */}
                    <div className="col-span-3">
                      <p className="text-gray-600 truncate">
                        {album.desc || "No description"}
                      </p>
                    </div>

                    {/*album color theme  */}
                    <div className="flex items-center gap-2">
                      <div
                        style={{ backgroundColor: album.bgColour }}
                        title={`theme color: ${album.bgColour}`}
                        className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                      ></div>
                      <span className="text-xs text-gray-500 font-mono">
                        {album.bgColour}
                      </span>
                    </div>

                    {/* action button */}
                    <div className="col-span-2 flex justify-center">
                      <button
                        onClick={() => removeAlbum(album._id)}
                        title="Delete Album"
                        className="inline-flex items-center justify-center cursor-pointer w-8 h-8 rounded-full bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 transition-colors duration-200 group:"
                      >
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* footer stats */}
          {data.length > 0 && (
            <div className="mt-6 text-gray-50 rounded-lg px-6 py-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Total Album :
                  <span className="font-semibold text-gray-900">
                    {data.length}
                  </span>
                </span>
                <span>
                  Last updated :
                  <span className="font-semibold text-gray-900">Just Now</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ListAlbum;
