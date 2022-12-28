//contatenate and create id

const generateId = (id1, id2) => (id1 > id2 ? id1 + id2 : id2 + id1);

export default generateId;