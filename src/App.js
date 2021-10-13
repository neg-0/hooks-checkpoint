import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// Mandatory Requirements

// Make an API call to get a product list (Products data service, subsection "list")
// Make an API call to get specific details on a given product when its entry is clicked (Products data service - subsection ":productId")
// Display a list of products as cards with text of description
// Make each product clickable so that when clicked, it displays an image from the API for that product (Products data service - subsection "styles")
// Make it so that only one product's photo is visible at a time, and clicking it again closes the photo (NOTE: If a product does not have a viable photo on the API, allow for this eventuality with good conditional rendering).
// Advanced Content

// Add a nav bar and button that will also close the photo and/or display the product list again.
// Add miniature thumbnail photo to each product card
// Add Review score to each product card (Reviews data service)
// Add a display for Question/Answers to each product that is visible only when the photo is enlarged (Questions data service)