function collision({first_object ,second_object}) {
    // console.log(first_object.position.y + first_object.height >= second_object.position.y )//&& // from top
    // console.log(first_object.position.y <= second_object.position.y + second_object.height )//&& //from bottom
    // console.log(first_object.position.x <= second_object.position.x + second_object.widhth )//&&// from right
    // console.log(first_object.position.x + first_object.widhth >= second_object.position.x) // from left)
    return(
        first_object.position.y + first_object.height >= second_object.position.y && // from top
        first_object.position.y <= second_object.position.y + second_object.height && //from bottom
        first_object.position.x <= second_object.position.x + second_object.width &&// from right
        first_object.position.x + first_object.width >= second_object.position.x // from left
    )
}