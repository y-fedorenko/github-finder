import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const { login } = useParams();
  const location = useLocation();
  const [userData, setUserData] = useState(location.state?.userData || null);
  const [errorStatus, setErrorStatus] = useState(false);
  const [repos, setRepos] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData || !repos) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://api.github.com/users/${login}`);

          const responseRepos = await axios.get(`https://api.github.com/users/${login}/repos`);

          setUserData(response.data);
          setRepos(responseRepos.data);
          console.log(responseRepos.data);
          setErrorStatus(false);
        } catch (error) {
          console.error('Error making the GET request', error);
          setErrorStatus(true);
          setUserData(null);
        }
      };
      fetchData();
    }
  }, [login, userData]);

  const gotoGH = () => {
    window.location.href = userData.html_url;
  }

  const goHome = () => navigate('/');

  return (
    <>
      <div className='back-btn flex' onClick={goHome}>
        <p>&lt;</p>
      </div>
      <div className="user-page">
        {userData ? (
          <>
            <Helmet>
              <title>{userData.name}'s GitHub</title>
            </Helmet>
            <div className='user-info'>
              <img src={userData.avatar_url} alt={`${userData.name}'s avatar`} />
              <div className='w-100'>
                <h1>{userData.name}</h1>
                <p>{userData.bio}</p>
                <div className='stats'>
                  <div><p>{userData.followers}</p><p><span>Followers</span></p></div>
                  <div><p>{userData.following}</p><p><span>Following</span></p></div>
                  <div><p>{userData.public_repos}</p><p><span>Repositories</span></p></div>
                </div>
                <div className='flex w-100'>
                    <button onClick={gotoGH}>Go to GitHub</button>
                </div>
              </div>
            </div>
            <div className='repos'>
              {Array.isArray(repos) ? (
                repos.map((repo, index) => (
                  <div key={index} className='flex repo'>
                    <div>
                      <Link to={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</Link>
                      <p>{repo.description}</p>
                    </div>
                    <p className='date'>{new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                  </div>
                ))
              ) : (
                <p>Loading repositories...</p>
              )}
            </div>
          </>
        ) : (
          <p>{errorStatus ? `404: No user found` : `Loading...`}</p>
        )}
      </div>
    </>
  );
}

export default UserPage;
