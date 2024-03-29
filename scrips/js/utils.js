function collision({first_object ,second_object}) {
    return(
        first_object.position.y + first_object.height >= second_object.position.y && // from top
        first_object.position.y <= second_object.position.y + second_object.height && //from bottom
        first_object.position.x <= second_object.position.x + second_object.width &&// from right
        first_object.position.x + first_object.width >= second_object.position.x // from left
    )
}
function platformCollision({first_object ,second_object}) {
    return(
        first_object.position.y + first_object.height >= second_object.position.y && // from top
        first_object.position.y + first_object.height <= second_object.position.y + second_object.height && //from bottom
        first_object.position.x <= second_object.position.x + second_object.width &&// from right
        first_object.position.x + first_object.width >= second_object.position.x // from left
    )
}