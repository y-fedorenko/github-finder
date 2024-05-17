import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import githubLogo from '../media/github-logo-inverted.png';

function Home() {
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState(null); 
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${user}`);
      setUserData(response.data); 
      console.log(response.data);
      navigate(`/users/${response.data.login}`, { state: { userData: response.data } });
    } catch (error) {
      console.error('Error making the GET request', error);
      setUserData(null); 
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className='home-wrapper'>
      <div className="home">
        <div>
          <img src={githubLogo} alt='github' />
          <form onSubmit={handleSubmit}>
            <input 
              type='text' 
              placeholder='Enter a username' 
              onChange={(e) => setUser(e.target.value)}
            />
            <input 
              type='submit' 
              value='Search'
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
