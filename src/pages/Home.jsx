import NavBar from "../components/NavBar"

function Home() {
  return (
    <>
      <NavBar />
      <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>Welcome Corn Holders</h1>
      
     
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        marginTop: '20px' 
      }}>
        <img 
          src="images/corn.jpeg"
          alt="Corn Holder" 
          style={{ 
            width: '100%', 
            height: 'auto', 
            borderRadius: '8px' 
          }} 
        />
      </div>
    </div>
    </>
  );
}

export default Home;