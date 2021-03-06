import './App.css';
import { useEffect, useState, createContext } from 'react';
import ProductList from './components/ProductList';
import ProductPhotoModal from './components/ProductPhotoModal';
import { fetchProducts, fetchProductImage, fetchProductDetails } from "./components/FetchAPI"

export const ActionAPIContext = createContext()

function App() {

  const [products, setProducts] = useState([])
  const [modalImage, setModalPhoto] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalProductDetails, setModalProductDetails] = useState()

  const ActionAPI = {
    displayModal,
    hideModal
  }

  useEffect(() => {
    async function fetchData() {
      let pro = await fetchProducts(50)
      setProducts(pro)
    }
    fetchData()
  }, [])

  function displayModal(productId, event) {
    fetchProductImage(productId).then(image => {
      if (!image) {
        return
      }

      fetchProductDetails(productId).then(setModalProductDetails)

      setModalPhoto(image)
      setModalOpen(true)
    })
  }

  function hideModal(event) {
    setModalOpen(false)
  }

  if (Array.isArray(products) && products.length > 0) {
    return (
      <ActionAPIContext.Provider value={ActionAPI}>
        <div>
          <ProductList products={products} />
          <ProductPhotoModal open={modalOpen} image={modalImage} details={modalProductDetails} />
        </div>
      </ActionAPIContext.Provider>
    )
  } else { return <div>Loading Products</div> }
}

export default App;

// Mandatory Requirements

// Make an API call to get a product list (Products data service, subsection "list") - DONE
// Make an API call to get specific details on a given product when its entry is clicked (Products data service - subsection ":productId") - DONE
// Display a list of products as cards with text of description - DONE
// Make each product clickable so that when clicked, it displays an image from the API for that product (Products data service - subsection "styles") - DONE
// Make it so that only one product's photo is visible at a time, and clicking it again closes the photo (NOTE: If a product does not have a viable photo on the API, allow for this eventuality with good conditional rendering). - DONE

// Advanced Content

// Add a nav bar and button that will also close the photo and/or display the product list again. - DONE
// Add miniature thumbnail photo to each product card - DONE
// Add Review score to each product card (Reviews data service)
// Add a display for Question/Answers to each product that is visible only when the photo is enlarged (Questions data service)