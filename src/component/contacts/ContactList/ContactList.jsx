import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteContact, GET_ALL_URL } from '../../../services/ContactService.js'
import Spinner from '../../Spinner/Spinner.jsx'

const ContactList = () => {
    const [query,setQuery] =useState({
        text : ''
    })
    const [state,setState] = useState({
        loading     : false,
        contacts    : [],
        filterData  : [],
        errorMessage: ""
    })

    function contactList(){
        try {
            setState({
                ...state,
                loading:true
            })
            axios.get(GET_ALL_URL).then(res => {
                setState({
                    ...state,
                    loading  : false,
                    contacts : res.data,
                    filterData : res.data
                })
            })
        } catch (error) {
            setState(
                {
                    ...state,
                    loading:false,
                    errorMessage:error.errorMessage
                }
            )
        }
    }

    useEffect(() => {
        contactList()
    },[])

    let clickDelete = async (contactId) =>{
        let res = await deleteContact(contactId)
        console.log(res);
        if(res){
            contactList()
        }
    }   

    let searchData = (event) => {
        setQuery({
            ...query,
            text:event.target.value,
        })
        let theContacts = state.contacts.filter(contact=>(
            contact.name.toLowerCase().includes(event.target.value.toLowerCase())
        ))
        let theEmail = state.contacts.filter(contact=>(
            contact.email.includes(event.target.value)
        ))
        let thePhone = state.contacts.filter(contact=>(
            contact.phone.includes(event.target.value)
        ))
        setState({
            ...state,
            filterData : theContacts,
            filterData : theEmail,
            filterData : thePhone,
        })
    }


    let {loading,contacts,filterData,errorMessage} = state
  return (
    <>
        <section className='contact-search p-3'>
            <div className='container'>
                <div className='grid'>
                    <div className='row'>
                        <div className='col'>
                            <p className='h3 font-weight-bold'>Contact Manager
                                <Link to={'/contacts/add'} className='btn btn-primary ms-2'>
                                <i className='fa fa-plus-circle me-2'></i> New </Link>
                            </p>
                            <p className='fst-italic'>
                                Reprehenderit consequat ut ullamco occaecat. Minim occaecat cillum occaecat incididunt ut culpa et. Labore cupidatat velit sint eiusmod deserunt eu excepteur ex consectetur amet do. Ullamco et proident voluptate dolor.
                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <form className='row'>
                                <div className='col'>
                                    <div className='mb-2'>
                                        <input type="search" 
                                        name="text"
                                        value={query.text}
                                        onChange={searchData}
                                         className='form-control' placeholder='Search Names' />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='mb-2'>
                                        <button type="submit" className='btn btn-sm btn-outline-dark'>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {
            loading ? <Spinner/> : <>
            <section className='contact-list'>
                <div className='container'>
                    <div className='row mt-3'>
                    {
                        filterData.length > 0 && filterData.map((dt) => {
                            return(
                                <>
                                <div className='col-md-6 col-xs-12 mt-3' key={dt.id}>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='row align-items-center d-flex-justify-content-around'>
                                                <div className='col-md-4 col-xs-4'>
                                                    <img src={`${dt.photo}`} className='contact-img'/>
                                                </div>
                                                <div className='col-md-7 col-xs-7'>
                                                    <ul className='list-group'>
                                                        <li className='list-group-item list-group-item-action'>
                                                            Name : <span className='fe-bold'>{dt.name}</span>
                                                        </li>
                                                        <li className='list-group-item list-group-item-action'>
                                                            Mobile : <span className='fe-bold'>{dt.phone}</span>
                                                        </li>
                                                        <li className='list-group-item list-group-item-action'>
                                                            Email : <span className='fe-bold'>{dt.email}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className='col-md-1 col-xs-1 d-flex flex-column align-items-center'>
                                                    <Link to={`/contacts/view/${dt.id}`} className="btn btn-warning my-1">
                                                        <i className='fa fa-eye'></i>
                                                    </Link> 
                                                    <Link to={`/contacts/edit/${dt.id}`} className="btn btn-primary my-1">
                                                        <i className='fa fa-pen'></i>
                                                    </Link>
                                                    <button className="btn btn-danger my-1" onClick={()=>clickDelete(dt.id)}>
                                                        <i className='fa fa-trash'></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            )
                        })
                    }
                    </div>
                </div>
            </section>
            </>
        }
        
    </>
  )
}

export default ContactList
