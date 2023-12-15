function handleResponseWithPotentialErrors(response :Response) {
    console.log("4")
    console.log("Response: ", response);
    if(!response.ok) {
        console.log("Bad response: ", response);
        throw new Error(`Code: ${response.status}, message: ${response.statusText}`)
    }

    return response.json();
}

export { handleResponseWithPotentialErrors }