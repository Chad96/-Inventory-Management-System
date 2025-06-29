import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import './Profile.css';

function Profile() {
  const [user] = useAuthState(auth);

  if (!user) {
    return <div className="profile-container"><p>You are not logged in.</p></div>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>
    </div>
  );
}

export default Profile;
