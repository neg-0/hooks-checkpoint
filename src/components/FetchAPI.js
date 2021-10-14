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

export async function fetchProductRatings(productId) {
    let json = await fetchJson(`${url}/reviews/${productId}/meta`)

    let reviews = {}

    let avgRating = 0
    let count = 0

    let ratings = json.ratings

    if (Object.keys(ratings).length === 0) {
        avgRating = 0
    } else {

        for (let i in ratings) {
            avgRating += json.ratings[i] * i
            count += json.ratings[i]
        }

        avgRating /= count
    }

    reviews.rating = avgRating
    reviews.count = count
    reviews.recommended = json.recommended
    reviews.characteristics = json.characteristics

    return reviews
}