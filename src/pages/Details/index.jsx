import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../axio";
import "./index.css";

function Details() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    http
      .get(`/books/search?query=${id}`)
      .then((res) => {
        console.log("Full API response:", res); 
        return res.data;
      })
      .then((data) => {
        if (data && data.length > 0) {
          setBook(data[0]); 
        }
      })
      .catch((err) => {
        console.error("Error fetching book details:", err);
      });
  }, [id]);

  return (
    <div className="details-container">
      {book ? (
        <>
          <div className="card">
            <div className="card-image">
              <img src={book.thumbnailUrl} alt={book.title} />
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h1>{book.title}</h1>
              
              <p>Authors: {book.authors.join(", ")}</p>
              <p>Categories: {book.categories.join(", ")}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Details;