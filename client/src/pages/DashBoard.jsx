import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export default function DashBoard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Welcome on board"
            subtitle="To discover the powerful features provided by us, we recommend you to create your first Content type!"
          />

          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "10px",
              }}
              onClick={() => {
                navigate("/addContentType");
              }}
            >
              <AddIcon sx={{ mr: "10px" }} />
              Create Content Type
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
