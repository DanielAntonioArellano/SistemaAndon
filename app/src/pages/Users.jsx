import UsersPage from "../Components/Users/UsersTable";
import Sidebar from "../Components/Shared/Sidebar";




const PageUsers = () =>{
   
 return(
        <div style={styles.page}> 
           <Sidebar/>
           <div style={styles.content}>
            <UsersPage/>
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

export default PageUsers