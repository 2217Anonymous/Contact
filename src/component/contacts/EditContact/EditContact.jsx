import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getAllGroup, getContact, updateContact } from '../../../services/ContactService'
import Spinner from '../../Spinner/Spinner'

const EditContact = () => {
    const Navigate = useNavigate()
    const {contactId} = useParams()

    const [state,setState] = useState({
        loading:false,
        contact : {
            name    : '',
            phone   : '',
            email   : '',
            photo   : '',
            company : '',
            title   : '',
            groupId : '',
        },
        groups : []
    })

    useEffect(() => {
        setState({
            ...state,
            loading:true,
        })
        let fetchData = async () =>{
            let contactRes = await getContact(contactId)
            let groupRes = await getAllGroup()
            setState({
                ...state,
                loading     : false,
                contact     : contactRes.data, 
                groups      : groupRes.data    
            }) 
        }
        fetchData()
    },[])
    
    let updateInput = (event) => {
        setState({
            ...state,
            contact : {
                ...state.contact,
                [event.target.name] : event.target.value
            }
        })
    }

    let submitForm = async (event) => {
        event.preventDefault()
        let res = await updateContact(state.contact,contactId)
        if(res){ Navigate('/contacts/list',{replace : true}) }

    }


    let {loading,contact,groups} = state
  return (
    <>
        {/* <pre>{JSON.stringify(state.contact)}</pre> */}
        <section className='edit-contact'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <p className='h4 text-primary fw-bold '>Edit Conatct</p>
                        <p className='fst-italic'>Voluptate non consectetur et tempor qui adipisicing. Duis officia laborum ipsum adipisicing irure do esse officia. Minim pariatur occaecat do anim ipsum occaecat enim dolore. Dolor deserunt in laboris sunt excepteur labore.</p>
                    </div>
                </div>
                <div className='row align-items-center'>
                    <div className='col-md-4'>
                        <form onSubmit={submitForm}>
                            <div className='mb-2'>
                                <input type="text" name="name" value={contact.name} onChange={updateInput} required={true} className='form-control' placeholder='name'/>
                            </div>
                            <div className='mb-2'>
                                <input type="url" name="photo" value={contact.photo} onChange={updateInput} required={true} className='form-control' placeholder='Photo Url'/>
                            </div>
                            <div className='mb-2'>
                                <input type="number" name="phone" value={contact.phone} onChange={updateInput} required={true} className='form-control' placeholder='Mobile'/>
                            </div>
                            <div className='mb-2'>
                                <input type="email" name="email" value={contact.email} onChange={updateInput} required={true} className='form-control' placeholder='Email'/>
                            </div>
                            <div className='mb-2'>
                                <input type="text" name="company" value={contact.company} onChange={updateInput} required={true} className='form-control' placeholder='Company'/>
                            </div>
                            <div className='mb-2'>
                                <input type="text" name="title" value={contact.title} onChange={updateInput} required={true} className='form-control' placeholder='Title'/>
                            </div>
                            <div className='mb-2'>
                                <select className='form-control' name="groupId" value={contact.groupId} onChange={updateInput} required={true}>
                                    <option value="">Select Group Name</option>
                                    {
                                        loading ? <Spinner/> : groups.map(res => (
                                            <option key={res.id} value={res.id}>{res.name}</option>
                                        ))  
                                    }
                                </select>
                            </div>
                            <div className='mb-2'>
                                <button type="submit" className='btn btn-success btn-sm'>Update</button>
                                <Link to={'/contacts/list'} className="btn btn-sm btn-danger ms-2">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <div className='col-md-4'>
                        <img src={contact.photo} className='contact-img'/>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default EditContact
