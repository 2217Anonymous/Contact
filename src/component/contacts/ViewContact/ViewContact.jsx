import React, { useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import { getContact, getGroup } from '../../../services/ContactService'
import Spinner from '../../Spinner/Spinner'

const ViewContact = () => {
    let {contactId} = useParams()
    const [state,setState] = useState({
        loading : false,
        contact : {},
        errorMessage : '',
        group : {}
    })

    useEffect(()=>{
        setState({
            ...state,
            loading : true
        })
        async function fetchData(){
            let contactResponse = await getContact(contactId)
            let groupResponse = await getGroup(contactResponse.data)
            setState({
                ...state,
                loading:false,
                contact : contactResponse.data,
                group : groupResponse.data
               })
        }
        fetchData()
    },[contactId])

    let {loading,contact,group,errorMessage} = state;

  return (
        <>
        <section className='view-contact-intro p-3'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <p className='h3 text-warning'> View Contact</p>
                        <p className='fs-italic'>Duis sunt sint esse sint id sit anim mollit sunt dolore. Quis commodo anim sunt ex officia eu quis laborum. Id nulla et veniam ea do velit deserunt aute incididunt excepteur labore laborum. Aliquip ex amet culpa mollit eiusmod dolore do. Eu mollit cupidatat tempor deserunt aliquip proident et tempor nulla dolor.</p>
                    </div>
                </div>
            </div>
        </section>
        {
            loading ? <Spinner/> : <>
                {
                    Object.keys(contact).length > 0  && Object.keys(group).length > 0 && 
                        <section className='view-contact mt-3'>
                            <div className='container'>
                                <div className='row align-items-center'>
                                    <div className='col-md-4'>
                                        <img src={`${contact.photo}`} className='contact-img'/>
                                    </div>
                                    <div className='col-md-8'>
                                        <ul className='list-group'>
                                            <li className='list-group-item list-group-item-action'>
                                                Name : <span className='fe-bold'>{contact.name}</span>
                                            </li>
                                            <li className='list-group-item list-group-item-action'>
                                                Mobile : <span className='fe-bold'>{contact.phone}</span>
                                            </li>
                                            <li className='list-group-item list-group-item-action'>
                                                Email : <span className='fe-bold'>{contact.email}</span>
                                            </li>
                                            <li className='list-group-item list-group-item-action'>
                                                Company : <span className='fe-bold'>{contact.company}</span>
                                            </li>
                                            <li className='list-group-item list-group-item-action'>
                                                Title : <span className='fe-bold'>{contact.title}</span>
                                            </li>
                                            <li className='list-group-item list-group-item-action'>
                                                Group : <span className='fe-bold'>{group.name}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <Link to={'/contacts/list'} className="btn btn-sm btn-warning">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                }
            </>
        }
    </>
  )
}

export default ViewContact
