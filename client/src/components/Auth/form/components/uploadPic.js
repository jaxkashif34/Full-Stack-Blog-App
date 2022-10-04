import React from 'react';
import { Box, Avatar } from '@mui/material';
const UploadPic = ({ profile_pic, setProfile_pic }) => {
  const handleChangeProfile = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setProfile_pic({ file, path: reader.result });
    };
  };
  return (
    <Box>
      <Avatar component="label" htmlFor="profile_pic" src={profile_pic.path} alt="profile picture" sx={{ margin: 'auto', width: { xs: 60, md: 80 }, height: { xs: 60, md: 80 } }} />
      <input type="file" hidden id="profile_pic" name="profile_pic" onChange={(e) => handleChangeProfile(e.target.files[0])} />
    </Box>
  );
};

export default UploadPic;
