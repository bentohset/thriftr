// filters info from cart db. eg. if seller is logged in, it will only show the buyer etc.

const getOppositeUserInfo = (users, userLoggedIn) =>{
    const newUsers = {...users};
    delete newUsers [userLoggedIn];

    const [id, user] = Object.entries(newUsers).flat();

    return {id, ...user}
}


export default getOppositeUserInfo;