import Dashboard from "../Components/Production/Events";
import ProductionPage from "../Components/Production/ProductionTable"; "../Components/Production/ProductionTable"
import Sidebar from "../Components/Shared/Sidebar";



const Eventos =()=> {

   
 return(
        <div style={styles.page}> 
           <Sidebar/>
           <div style={styles.content}>
           <Dashboard/>
           </div>
        </div>

    )
}
const styles ={
    page:{
 display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    flex: 1,
    padding: '30px',
    overflowY: 'auto',
  },
    }

export default Eventos;
