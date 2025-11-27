import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../hooks/useAuth"; 

const NavbarUser = () => {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const [profilePic, setProfilePic] = useState(null);

  // Validar user desde contexto o localStorage
  const safeUser = authUser || user; 
  // Subida de foto temporal
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file || !safeUser) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
      localStorage.setItem(`profilePic_${safeUser.userName}`, reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (safeUser?.userName) {
      const storedPic = localStorage.getItem(`profilePic_${safeUser.userName}`);
      if (storedPic) setProfilePic(storedPic);
    }
  }, [safeUser]);

  // Logout
  const handleLogout = () => {
    logout(); // ✅ usa el método del AuthContext
    navigate("/");
  };

  return (
    <NavbarWrapper>
      <div className="brand" onClick={() => navigate("/")}>
        Sistema OEE
      </div>

      {safeUser ? (
        <div className="popup">
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="burger">
            {profilePic ? (
              <img src={profilePic} alt="profile" className="profile-img" />
            ) : (
              <i className="bi bi-person-circle profile-icon"></i>
            )}
            <span className="username">{safeUser.userName}</span>
          </label>

          <nav className="popup-window">
            <div className="menu-header">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="profile"
                  className="popup-profile-img"
                />
              ) : (
                <i className="bi bi-person-circle popup-profile-icon"></i>
              )}
              <h3>{safeUser.userName}</h3>
              <p>{safeUser.rol}</p>
            </div>

            <ul className="menu-actions">
              <li>
                <label className="upload-btn">
                  Cambiar foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: "none" }}
                  />
                </label>
              </li>
            </ul>

            <div className="menu-footer">
              <button onClick={handleLogout} className="logout-btn">
                <BiLogOut className="marginIcon" />
                <span />
                Cerrar sesión
              </button>
            </div>
          </nav>
        </div>
      ) : (
        <button className="login-btn" onClick={() => navigate("/login")}>
          Iniciar sesión
        </button>
      )}
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div`
  background-color: #2c3e50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  color: white;
  font-family: "Poppins", sans-serif;

  .brand {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }

  .marginIcon {
  margin-right: 8px;
  vertical-align: middle;
  margin-top: 0;
}


  .login-btn {
    background: #00bf63;
    border: none;
    padding: 6px 14px;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    transition: 0.2s;
  }

  .login-btn:hover {
    background: #019653;
  }

  .popup {
    position: relative;
    display: inline-block;
  }

  .popup input {
    display: none;
  }

  .burger {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #00bf63;
    padding: 6px 12px;
    border-radius: 20px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, background 0.2s;
  }

  .burger:hover {
    transform: scale(1.05);
    background: #019653;
  }

  .profile-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .profile-icon {
    font-size: 28px;
  }

  .username {
    font-size: 14px;
    font-weight: 500;
    color: white;
  }

  .popup-window {
    position: absolute;
    right: 0;
    top: 55px;
    background: white;
    color: #2c3e50;
    border-radius: 12px;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.15);
    padding: 20px;
    min-width: 240px;
    transform: scale(0.9);
    opacity: 0;
    visibility: hidden;
    transition: 0.25s ease;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input:checked ~ .popup-window {
    transform: scale(1);
    opacity: 1;
    visibility: visible;
  }

  .menu-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
  }

  .popup-profile-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
    border: 3px solid #2c3e50;
  }

  .popup-profile-icon {
    font-size: 64px;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .menu-header h3 {
    margin: 5px 0 2px;
    font-size: 18px;
    color: #2c3e50;
  }

  .menu-header p {
    margin: 0;
    font-size: 14px;
    color: #7f8c8d;
  }

  .menu-actions {
    width: 100%;
    margin-bottom: 20px;
    list-style: none;
    padding: 0;
  }

  .menu-actions li {
    text-align: center;
  }

  .upload-btn {
    cursor: pointer;
    color: #00bf63;
    font-size: 14px;
    font-weight: 500;
  }

  .menu-footer {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .logout-btn {
  background: #e74c3c;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 0;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;
  transition: all 0.25s ease;
  width: 100%;
}

.logout-btn:hover {
  background: #c0392b;
  transform: translateY(-1px);
}

  .logout-btn:hover {
    background: #c0392b;
  }
`;

export default NavbarUser;
