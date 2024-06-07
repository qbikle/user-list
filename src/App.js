import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Typography,
  MenuItem,
  Select,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import UserCard from "./Components/UserCard";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const rightColumnRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError("Failed to fetch data. Please try again later.");
      });
  }, []);

  const handleUserSelect = (userId) => {
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
    scrollToUser(userId);
  };

  const scrollToUser = (userId) => {
    const rightColumn = rightColumnRef.current;
    if (rightColumn) {
      const userCard = rightColumn.querySelector(`[data-user-id="${userId}"]`);
      if (userCard) {
        userCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const fullName =
      `${user.profile.firstName} ${user.profile.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      )}
      {!loading && !error && (
        <Box display="flex" alignItems="center" flexDirection="column" mt={2}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "15px",
            }}
          >
            <Typography variant="h4" gutterBottom>
              User Directory
            </Typography>
          </div>
          <Grid container spacing={2} justifyContent="center" width="100%">
            <Grid item xs={12} md={3}>
              <Box p={2} bgcolor="#f5f5f5" borderRadius="15px">
                <Typography variant="h6" gutterBottom>
                  Select a user to view
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  fullWidth
                  value={selectedUser ? selectedUser.id : ""}
                  onChange={(event) => handleUserSelect(event.target.value)}
                  placeholder=""
                >
                  <MenuItem value="" disabled>
                    Select a user
                  </MenuItem>
                  {filteredUsers.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.profile.firstName} {user.profile.lastName}
                    </MenuItem>
                  ))}
                </Select>

                <Typography variant="h6" gutterBottom mt={2}>
                  Search users
                </Typography>
                <TextField
                  label="Search users"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box
                p={2}
                bgcolor="#f5f5f5"
                borderRadius="15px"
                ref={rightColumnRef}
                style={{
                  maxHeight: "80vh",
                  overflowY: "auto",
                  cursor: "pointer",
                }}
              >
                {filteredUsers.map((user) => (
                  <UserCard
                    key={`${user.id}-${user.profile.email}`}
                    user={user}
                    data-user-id={user.id}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      {!loading && error && (
        <Typography variant="body1">Error: Failed to fetch data</Typography>
      )}
    </>
  );
}

export default App;
