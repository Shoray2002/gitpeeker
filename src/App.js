import { useState } from "react";
function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});
  // console.log(search)

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    // console.log(json);
    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
    console.log(results);
  };

  return (
    <main>
      <div className="App">
        <header>
          <h1>wiki peeker</h1>
          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Type to look for Wikis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          {searchInfo.totalhits ? (
            <p>Search results:{searchInfo.totalhits}</p>
          ) : (
            ""
          )}
        </header>
        <div className="results">
          {results.map((result, i) => {
            const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

            return (
              <div className="result" key={i}>
                <h3>{result.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: result.snippet }} />

                <a href={url} target="_black" rel="noreferrer">Read More</a>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
