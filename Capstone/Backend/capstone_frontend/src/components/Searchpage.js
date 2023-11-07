import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "./search.css";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
// I Import react and link. I then import my react-bootstrap styling components and my css page

// I then create a class component search page
export default class Searchpage extends Component {
  // I then use the constructor and super method to create my states
  constructor(props) {
    super(props);
    this.state = {
      tunes: [],
      favorites: [],
      type: "",
      search: "",
      results: "",
      loading: true,
    };
  }
  // I then create the async function handle search to call the Itunes api

  handleSearch = async (e) => {
    // I set e as the parameter and use preventDefault and use a try catch block
    e.preventDefault();
    try {
      // I then use await fetch to retrieve data from the api
      const res = await fetch(
        `https://itunes.apple.com/search?term=${this.state.search}&media=${this.state.type}&limit=10`
      );
      // I then create the the variable data and use await json()
      const data = await res.json();
      // I then set my state results to the data that was fetched
      this.setState({ results: data });

      // I then use await fetch to create a post request
      await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ results: data.results }),
      });

      // I use setTimeout to give the api results a 2 second interval to load up
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  // I create the function handleInput to make the input box functional

  handleInput = (e) => {
    // I use setState to set my search state to target the value thats been input
    this.setState({ search: e.target.value });
  };
  // I then do the same with my function handleType this function will be used for my radio buttons
  handleType = (e) => {
    this.setState({ type: e.target.value });
  };

  // Next I create the function handleData this will handle the data from the back end server
  handleData = async () => {
    // First create a async function followed by and try/catch block
    try {
      // I create 3 vars url which is the backend path , res which is the response using await and fetch and data which takes the res and
      // uses await .json()
      const url = "/api";
      const res = await fetch(url);
      const data = await res.json();
      // I then use set state to set the states with the retrieved data
      // tunes: data[0].results is the data that is retrieved from the user input
      // loading will change from true to false as when the data is fetched the loading stops
      this.setState({ tunes: data[0].results, loading: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  // I create the function handleFav this function will add the selected tracks to the favorites list
  handleFav = (e) => {
    // I use target.value
    const fav = e.target.value;
    // I then use set state and prevState
    this.setState((prevState) => ({
      favorites: [...prevState.favorites, fav],
    }));
  };

  // I create handleUnfav which will deselect the item from the favorites list
  handleUnfav = (e) => {
    // I use current target .value and create the var updatedFav
    const unFav = e.currentTarget.value;
    // I then use this.state.favorites.filter this will filter through the array and find the specific item and when selected it will be removed
    const updatedFav = this.state.favorites.filter(
      (selected) => selected !== unFav
    );
    // I then set the state with setState to the updatedFav var
    this.setState({ favorites: updatedFav });
  };

  // I then use componentDidMount() and call back m handleData function
  componentDidMount() {
    this.handleData();
  }

  // I then render all my bootstrap components and fill them with content
  // I also use .map to map through the data from the fetched api
  // I also add my function handleType to the radio buttons,handleSearch to the input box and handleFav & unFav to radio buttons
  render() {
    return (
      <div data-testid="componentTest">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#">🍎 Tunes</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />

            <Form onSubmit={this.handleSearch} className="d-flex">
              <Form.Control
                onChange={this.handleInput}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <div>
                <label>Movie</label>
                <input
                  onClick={this.handleType}
                  value="movie"
                  type="radio"
                ></input>
              </div>
              <div>
                <label>Podcast</label>
                <input
                  onClick={this.handleType}
                  value="podcast"
                  type="radio"
                ></input>
              </div>
              <div>
                <label>Music</label>
                <input
                  onClick={this.handleType}
                  value="music"
                  type="radio"
                ></input>
              </div>
              <div>
                <label>Music video</label>
                <input
                  onClick={this.handleType}
                  value="musicVideo"
                  type="radio"
                ></input>
              </div>
              <div>
                <label>Audio Book</label>
                <input
                  onClick={this.handleType}
                  value="audiobook"
                  type="radio"
                ></input>
              </div>
              <div>
                <label>Short Film</label>
                <input
                  onClick={this.handleType}
                  value="shortFilm"
                  type="radio"
                ></input>
              </div>
              <div>
                <label>Tv Show</label>
                <input
                  onClick={this.handleType}
                  value="tvShow"
                  type="radio"
                ></input>
              </div>
              <div>
                <label>Ebook</label>
                <input
                  onClick={this.handleType}
                  value="ebook"
                  type="radio"
                ></input>
              </div>
              <div>
                <label>Software</label>
                <input
                  onClick={this.handleType}
                  value="software"
                  type="radio"
                ></input>
              </div>
              <Button type="submit" variant="outline-success">
                Search
              </Button>
            </Form>
          </Container>
        </Navbar>
        <div className="button-div">
          <Link to={"/"}>
            <Button variant="secondary" size="lg" active>
              Return to Home
            </Button>
          </Link>
        </div>
        <h1>Search Results</h1>
        {this.state.loading || this.state.tunes.length === 0 ? (
          <div>Waiting for search results...</div>
        ) : (
          <div>
            <ul>
              {this.state.tunes.map((tune, index) => (
                <li key={index}>
                  <h2>Track/Resource:{tune.trackName}</h2>
                  <h4>Artist/Creator:{tune.artistName}</h4>
                  <label>Add to favorites list</label>

                  <input
                    value={tune.trackName}
                    onClick={this.handleFav}
                    type="radio"
                  ></input>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h3 className="fav-header">Favorites</h3>
          {!this.state.favorites.length ? (
            <p className="fav-para">No favorites added</p>
          ) : (
            <ul>
              {this.state.favorites.map((fav, index) => (
                <li key={index}>
                  <p>
                    {fav}{" "}
                    <button
                      className="fav-button"
                      onClick={this.handleUnfav}
                      value={fav}
                    >
                      unFavorite
                    </button>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
