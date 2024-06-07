import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const UserCard = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (!imageLoaded) {
        setLoading(false);
      }
    }, 5000);
  }, [imageLoaded]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setLoading(false);
  };
  return (
    <Card elevation={3} style={{ marginBottom: "20px" }} data-user-id={user.id}>
      <CardContent style={{ display: "flex", alignItems: "center" }}>
        {loading && (
          <CircularProgress
            size={40}
            style={{ marginRight: 25, marginLeft: 25 }}
          />
        )}

        <Avatar
          src={user.avatar}
          alt={`${user.profile.firstName} ${user.profile.lastName}`}
          sx={{ width: 80, height: 80, marginRight: 2 }}
          onLoad={handleImageLoad}
          style={{ display: loading ? "none" : "flex", fontSize: 40 }}
        />

        <div>
          <span
            style={{
              fontSize: "small",
              fontWeight: "bold",
              color: "grey",
            }}
          >
            @{user.profile.username}
          </span>
          <Typography variant="h6" gutterBottom>
            {user.profile.firstName} {user.profile.lastName}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Email: {user.profile.email}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Job Title: {user.jobTitle}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Bio: {user.Bio}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
