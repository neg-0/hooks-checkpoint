const url = "http://52.26.193.201:3000"

export async function fetchProducts(count = 10) {
    let res = await fetch(`${url}/products/list?count=${count}`)
    let json = await res.json()
    return json
}

export async function fetchProductDetails(productId) {
    let res = await fetch(`${url}/products/${productId}`)
    let json = await res.json()
    return json
}

export async function fetchProductStyles(productId) {
    let res = await fetch(`${url}/products/${productId}/styles`)
    let json = await res.json()
    return json
}

export async function fetchProductThumbnail(productId) {
    let styles = await fetchProductStyles(productId)
    return styles?.results[0]?.photos[0]?.thumbnail_url
}

export async function fetchProductImage(productId) {
    let styles = await fetchProductStyles(productId)
    return styles?.results[0]?.photos[0]?.url
}

export async function fetchProductRating(productId) {
    let res = await fetch(`${url}/reviews/${productId}/meta`)
    let reviews = await res.json()
    let rating = 0
    let count = 0

    let ratings = reviews.ratings

    if (Object.keys(ratings).length === 0) {
        return 0
    }

    for (let i in ratings) {
        rating += reviews.ratings[i] * i
        count += reviews.ratings[i]
    }

    rating /= count

    return rating
}