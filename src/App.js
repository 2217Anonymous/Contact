import './App.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { Route, Routes,Navigate } from 'react-router-dom';
import ContactList from './component/contacts/ContactList/ContactList';
import AddContact from './component/contacts/AddContact/AddContact';
import ViewContact from './component/contacts/ViewContact/ViewContact';
import EditContact from './component/contacts/EditContact/EditContact';
import NavBar from './component/NavBar/NavBar';

function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Navigate to={'contacts/list'} />} />
        <Route path="contacts/list/" element={<ContactList />}/>
        <Route path="contacts/add/" element={<AddContact />} />
        <Route path="contacts/view/:contactId" element={<ViewContact />}/>
        <Route path="contacts/edit/:contactId" element={<EditContact />}/>
      </Routes>
    </>
  );
}

export default App;
