import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import axios from "axios"

function App() {
  const [photos, setPhotos] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [albumId, setAlbumId] = useState(1);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=1`);
        console.log(res.data);
        setPhotos(res.data)
      } catch (err) {
        console.error(err);
      }
    };
    getPhotos();
  }, []);

  const getMorePhotos = async () => {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
      console.log(res.data);
      return (res.data)
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    const morePhotosFromServer = await getMorePhotos();

    setPhotos([...photos, ...morePhotosFromServer]);

    if (morePhotosFromServer.length === 0 || morePhotosFromServer.length < 50) {
      sethasMore(false)
    }
    setAlbumId(albumId + 1)
  };

  const handleRemove = (id) => {
    const filterPhotos = photos.filter(photo => photo.id !== id)
    setPhotos(filterPhotos)
  }
  return (
    <InfiniteScroll
      dataLength={photos.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h1 style={{ textAlign: 'center' }}>Loading...</h1>}
      endMessage={<h1 style={{ textAlign: 'center' }}>No hay más fotos</h1>}
    >
      <div className="container">

        {photos.map((item) =>
          <div key={item.id} id={item.id} onClick={() => handleRemove(item.id)}>
            <img
              src={item.thumbnailUrl}
              alt={"placerholder"}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
}



export default App;
