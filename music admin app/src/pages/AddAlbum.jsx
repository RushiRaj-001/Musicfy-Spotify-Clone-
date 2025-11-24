import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Image } from "lucide-react";
import toast from "react-hot-toast";
import { albumsAPI } from "../services/apiService";

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      const request = {
        name,
        desc,
        bgColor: color,
      };

      formData.append("request", JSON.stringify(request));
      formData.append("file", image);

      const response = await albumsAPI.add(formData);
      if (response.status === 201) {
        toast.success("Album added successfully");
        setImage(false);
        setName("");
        setDesc("");
      } else {
        toast.error("album not added");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while adding album");
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardLayout activeMenu="Add Album">
      {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-start gap-8 text-gray-600 mt-5"
        >
          <div className="flex flex-col gap-4">
            <p>Upload Image</p>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              name="image/*"
              id="image"
              hidden
            />
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-400 transition-colors overflow-hidden"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Image className="w-8 h-8 text-gray-500" />
              )}
            </label>
          </div>

          {/* Album name  */}
          <div className="flex flex-col gap-2.5">
            <p>ALbum Name</p>
            <input
              type="text"
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)] "
              placeholder="Type here..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Album description  */}
          <div className="flex flex-col gap-2.5">
            <p>ALbum description</p>
            <input
              type="text"
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)] "
              placeholder="Type here..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          {/* Album colour  */}
          <div className="flex flex-col gap-2.5">
            <p>ALbum Colour</p>
            <input
              type="color"
              // className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)] "
              // placeholder="Type here..."
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          {/* submit button  */}
          <button
            type="submit"
            className="text-base bg-[#3be477] text-white py-2.5 px-14 cursor-pointer"
          >
            ADD
          </button>
        </form>
      )}
    </DashboardLayout>
  );
};

export default AddAlbum;
