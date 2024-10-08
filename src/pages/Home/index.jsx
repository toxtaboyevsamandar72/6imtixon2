import "./index.css";
import http from "../../axio";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPages, setMinPages] = useState("");
  const [maxPages, setMaxPages] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); 
      try {
        const res = await http.get("/books");
        setBooks(res.data);
        setFilteredBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [searchQuery, books]);

  const handleFilter = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await http.get(`/books/filter?minPages=${minPages}&maxPages=${maxPages}`);
      setFilteredBooks(res.data);
      setMinPages("");
      setMaxPages("");
    } catch (err) {
      console.error("Error filtering books:", err);
    } finally {
      setLoading(false);
    }
  };

  function handleRedirect(id) {
    navigate(`/products/${id}`);
  }

  return (
    <>
      <div className="inputlar mt-24">
        <form className="form" onSubmit={handleFilter}>
          <div className="search">
            <input 
              className="inp mx-auto p-3" 
              type="text" 
              placeholder="Search..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter">
            <input 
              className="inp" 
              type="number" 
              placeholder="Min pages" 
              value={minPages}
              onChange={(e) => setMinPages(e.target.value)} 
            />
            <input 
              className="inp" 
              type="number" 
              placeholder="Max pages" 
              value={maxPages}
              onChange={(e) => setMaxPages(e.target.value)} 
            />
            <button type="submit" className="p-2">Filter</button>
          </div>
        </form>
      </div>

      <div className="cards-container mt-20">
        {loading ? (
          <Loader />
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} onClick={() => handleRedirect(book.id)} className="cursor-pointer">
              <Card 
                title={book.title} 
                thumbnailUrl={book.thumbnailUrl} 
                authors={book.authors} 
                categories={book.categories} 
              />
            </div>
          ))
        ) : (
          <p className="kitob">bunday kitob mavjud emas</p>
        )}
      </div>
    </>
  );
}

export default Home;
