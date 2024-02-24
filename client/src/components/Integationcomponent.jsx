import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/IntegrationBox.css'; // Assuming you've created the CSS file

const IntegrationBox = () => {
  const navigate = useNavigate();
  const [isIntegrated, setIsIntegrated] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (based on the presence of a token in local storage)
    const token = localStorage.getItem('userToken');
    if (token) {
      // Additional logic to retrieve integration state if needed
      // For now, let's assume integration state is stored in localStorage as well
      const integrationState = localStorage.getItem('integrationState');
      setIsIntegrated(integrationState === 'integrated');
    }
  }, []);

  const handleButtonClick = () => {
    setIsIntegrated(!isIntegrated);
    // Save integration state in local storage
    localStorage.setItem('integrationState', isIntegrated ? 'disintegrated' : 'integrated');
  };

  const integrationButtonText = isIntegrated ? 'Reply to Messages' : 'Connect Page';
  const disintegrateButtonText = 'Delete Integration';

  return (
    <div className={`integration-box ${isIntegrated ? 'integrated' : ''}`}>
      <p style={{color : 'black'}}>{isIntegrated ? 'Your Facebook pages are integrated.' : 'Facebook page Integration'}</p>
      <br/> 
      {isIntegrated && (
        <button className="disintegrate-button" onClick={handleButtonClick}>
          {disintegrateButtonText}
        </button>
      )}
      <button className={isIntegrated ? 'integrated-button' : ''} onClick={()=> {handleButtonClick();if(isIntegrated){navigate('/fbpage');}}}>
        {integrationButtonText}
      </button>
      
    </div>
  );
};

export default IntegrationBox;
