import './App.css';
import { useEffect, useState, createContext } from 'react';
import ProductList from './components/ProductList';
import ProductPhotoModal from './components/ProductPhotoModal';

const url = "http://52.26.193.201:3000"

export const ProductClickContext = createContext()
export const FetchAPIContext = createContext()

function App() {

  const [products, setProducts] = useState([])
  const [productPhotoModal, setProductPhotoModal] = useState()

  const FetchAPI = {
    fetchProducts,
    fetchProductDetails,
    fetchProductStyles
  }

  useEffect(() => {
    async function fetchData() {
      let pro = await fetchProducts()
      setProducts(pro)
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log(products)
  }, [products])

  async function fetchProducts() {
    let res = await fetch(`${url}/products/list`)
    let json = await res.json()
    return json
  }

  async function fetchProductDetails(productId) {
    let res = await fetch(`${url}/products/${productId}`)
    let json = await res.json()
    return json
  }

  async function fetchProductStyles(productId) {
    let res = await fetch(`${url}/products/${productId}/styles`)
    let json = await res.json()
    return json
  }

  async function onProductClick(productId, event) {
    let styles = fetchProductStyles()
    let modal = <ProductPhotoModal styles={styles} />
    setProductPhotoModal(modal)
  }

  console.log("products:", products)

  if (Array.isArray(products) && products.length > 0) {
    return (
      <ProductClickContext.Provider value={onProductClick}>
        <FetchAPIContext.Provider value={FetchAPI}>
          <div>
            <ProductList products={products} />
            {productPhotoModal}
          </div>
        </FetchAPIContext.Provider>
      </ProductClickContext.Provider>
    )
  } else { return <div>Loading Products</div> }
}

export default App;

// Mandatory Requirements

// Make an API call to get a product list (Products data service, subsection "list") - DONE
// Make an API call to get specific details on a given product when its entry is clicked (Products data service - subsection ":productId") - DONE
// Display a list of products as cards with text of description - DONE
// Make each product clickable so that when clicked, it displays an image from the API for that product (Products data service - subsection "styles")
// Make it so that only one product's photo is visible at a time, and clicking it again closes the photo (NOTE: If a product does not have a viable photo on the API, allow for this eventuality with good conditional rendering).
// Advanced Content

// Add a nav bar and button that will also close the photo and/or display the product list again.
// Add miniature thumbnail photo to each product card
// Add Review score to each product card (Reviews data service)
// Add a display for Question/Answers to each product that is visible only when the photo is enlarged (Questions data service)