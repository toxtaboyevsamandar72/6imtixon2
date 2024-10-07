import "./index.css";
import http from "../../axio";
import { useEffect, useState } from "react";
import Card from "../../components/Card";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    http
      .get("/books")
      .then((res) => res.data)
      .then((data) => {
        setBooks(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }, []);

  return (
    <div className="cards-container">
      {books.length > 0 ? (
        books.map((book) => (
          <Card
            key={book.id}
            title={book.title}
            thumbnailUrl={book.thumbnailUrl}
          />
        ))
      ) : (
        <p>Loading books...</p>
      )}
    </div>
  );
}

export default Home;
