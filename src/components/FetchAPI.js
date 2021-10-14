const url = "http://52.26.193.201:3000"

async function fetchJson(url) {
    let res = await fetch(url)
    return await res.json()
}

export async function fetchProducts(count = 10) {
    return await fetchJson(`${url}/products/list?count=${count}`)
}

export async function fetchProductDetails(productId) {
    return await fetchJson(`${url}/products/${productId}`)
}

export async function fetchProductStyles(productId) {
    return await fetchJson(`${url}/products/${productId}/styles`)
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