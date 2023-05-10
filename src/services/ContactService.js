import axios from "axios";

const serverURL = "http://localhost:9000";

export const getAllContacts = () => {
    let dataURL = `${serverURL}/contacts`; 
    return axios.get(dataURL)
}

export const getContact=(contactId)=>{
    let dataURL = `${serverURL}/contacts/${contactId}`
    return axios.get(dataURL)
}

export const getAllGroup = () => {
    let dataURL = `${serverURL}/groups/`
    return axios.get(dataURL)
}

export const getGroup=(contact) => {
    let gorupId = contact.groupId 
    let dataURL = `${serverURL}/groups/${gorupId}`
    return axios.get(dataURL)
}

export const setContact = (contact) => {
    let dataURL = `${serverURL}/contacts`
    return axios.post(dataURL,contact)
}

export const updateContact = (contact,contactId) => {
    let dataURL = `${serverURL}/contacts/${contactId}`
    return axios.put(dataURL,contact)
}

export const deleteContact = (contactId) => {
    let dataURL = `${serverURL}/contacts/${contactId}`
    return axios.delete(dataURL)
}

const BASE_URL = "http://localhost:9000/";
export const GET_ALL_URL = BASE_URL + "contacts/";

