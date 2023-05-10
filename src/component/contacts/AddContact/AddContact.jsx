import React, { useEffect, useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { getAllGroup, setContact } from '../../../services/ContactService'
import Spinner from '../../Spinner/Spinner'

const AddContact = () => {
    const Navigate = useNavigate()
    const [state,setState] = useState({
        loading : false,
        groups  : [],
        contacts: {
            name    : '',
            phone   : '',
            email   : '',
            photo   : '',
            company : '',
            title   : '',
            groupId : '',
        }
    })

useEffect(() => {
    setState({
        ...state,
        loading:true
    })
    const fetchData = async () => {
        let res = await getAllGroup()
        setState({
            ...state,
            loading : false,
            groups : res.data
        })
    }
    fetchData()
},[])

const updateInput = (event) => {
    setState({
        ...state,
        contacts : {
            ...state.contacts,
            [event.target.name] : event.target.value
        }
    })
}

let submitForm = async (event) => {
    event.preventDefault()
    let res = await setContact(state.contacts)
    res ? Navigate('/contacts/list',{replace : true}) : Navigate('/contacts/add',{replace:false})
} 
    
 let {loading,groups,contacts} = state
  return (
    <>
    <pre>{JSON.stringify(state.contacts)}</pre>
        <section className='add-contact'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <p className='h4 text-success fw-bold '>Create Conatct</p>
                        <p className='fst-italic'>Voluptate non consectetur et tempor qui adipisicing. Duis officia laborum ipsum adipisicing irure do esse officia. Minim pariatur occaecat do anim ipsum occaecat enim dolore. Dolor deserunt in laboris sunt excepteur labore.</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                         <form onSubmit={submitForm}>
                            <div className='mb-2'>
                                <input type="text" name="name" value={contacts.name} onChange={updateInput} required={true} className='form-control' placeholder='name'/>
                            </div>
                            <div className='mb-2'>
                                <input type="url" name="photo" value={contacts.photo} onChange={updateInput} required={true} className='form-control' placeholder='Photo Url'/>
                            </div>
                            <div className='mb-2'>
                                <input type="number" name="phone" value={contacts.phone} onChange={updateInput} required={true} className='form-control' placeholder='Mobile'/>
                            </div>
                            <div className='mb-2'>
                                <input type="email" name="email" value={contacts.email} onChange={updateInput} required={true} className='form-control' placeholder='Email'/>
                            </div>
                            <div className='mb-2'>
                                <input type="text" name="company" value={contacts.company} onChange={updateInput} required={true} className='form-control' placeholder='Company'/>
                            </div>
                            <div className='mb-2'>
                                <input type="text" name="title" value={contacts.title} onChange={updateInput} required={true} className='form-control' placeholder='Title'/>
                            </div>
                            <div className='mb-2'>
                                <select className='form-control' onChange={updateInput} required={true} name="groupId" >
                                    <option value="">Select Group Name</option>
                                    {
                                        loading ? <Spinner/> : groups.map(res => (
                                            <option key={res.id} value={res.id}>{res.name}</option>
                                        ))  
                                    }
                                </select>
                            </div>
                            <div className='mb-2'>
                                <button type="submit" className='btn btn-success btn-sm'>Create</button>
                                <Link to={'/contacts/list'} className="btn btn-sm btn-danger ms-2">Cancel</Link>
                            </div>
                         </form>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default AddContact
