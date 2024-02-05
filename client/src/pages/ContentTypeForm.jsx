import { Box, useTheme, Button, TextField } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
// import { createProgressInfo } from "../api/progressInfo";

const validations = {
  columnType: (value) => value.length > 0,
  columnName: (value) => value.length > 0,
};

export default function ContentTypeForm() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //   const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [collectionName, setCollectionName] = useState("");

  /**
  
  [
    {
      columnName: {value:"address", error:null},
      columnType:{value:"String", error:null}    
    },
    {
      columnName: {value:"age", error:null},
      columnType:{value:"Integer", error:null}
    }
  ]

   */
  const [columnData, setColumnData] = useState([]);

  const addColumnNamesAndType = () => {
    setColumnData((s) => {
      const newData = [...s];
      newData.push({
        columnName: { value: "", error: null },
        columnType: { value: "", error: null },
      });
      return newData;
    });
  };

  const deleteColumnNamesAndType = (index) => {
    setColumnData((s) => {
      const newData = s.filter((item, i) => i !== index);
      return [...newData];
    });
  };

  const setColumnNames = (name, index) => {
    setColumnData((s) => {
      const newData = [...s];
      newData[index].columnName.value = name;
      newData[index].columnName.error = !validations.columnName(name);
      return newData;
    });
  };

  const setColumnType = (name, index) => {
    setColumnData((s) => {
      const newData = [...s];
      newData[index].columnType.value = name;
      newData[index].columnType.error = !validations.columnType(name);
      return newData;
    });
  };

  const handleValidationColumnName = (i, value) => {
    if (validations.columnName)
      setColumnData((s) => {
        const newData = [...s];
        newData[i].columnName.error = !validations.columnName(value);
        return newData;
      });
  };

  const handleValidationColumnType = (i, value) => {
    if (validations.columnType)
      setColumnData((s) => {
        const newData = [...s];
        newData[i].columnType.error = !validations.columnType(value);
        return newData;
      });
  };

  const formSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const data = JSON.parse(JSON.stringify(columnData));
    for (let i = 0; i < data.length; i++) {
      data[i].columnName.error = !validations.columnName(
        data[i].columnName.value
      );
      if (data[i].columnName.error) isValid = false;

      data[i].columnType.error = !validations.columnType(
        data[i].columnType.value
      );
      if (data[i].columnType.error) isValid = false;
    }

    if (!isValid) {
      setColumnData(data);
      return;
    }

    // const email = user.email;
    const columnDatas = columnData.map((item) => {
      const columnName = item.columnName.value;
      const columnType = item.columnType.value;
      return { columnName, columnType };
    });
    const progress = { collectionName, columnDatas };
    // console.log("email: " + JSON.stringify(email));
    console.log("progress: " + JSON.stringify(progress));
    console.log("columnData:" + JSON.stringify(columnDatas));

    // createProgressInfo(email, progress)
    //   .then((response) => {
    //     console.log(response);
    //     navigate("/view");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <>
      <form onSubmit={formSubmit} style={{ position: "relative" }}>
        <Box m="20px">
          <Header
            display="flex"
            title="Cheers To Another Grind!!!"
            subtitle="Add Your Gains"
          />
        </Box>

        <Box>
          <Box>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
              }}
            >
              <TextField
                required
                id="outlined-required"
                label="Collection Name"
                variant="outlined"
                type="text"
                placeholder="User"
                InputLabelProps={{
                  shrink: true,
                }}
                focused={false}
                value={collectionName}
                onChange={(e) => {
                  setCollectionName(e.target.value);
                }}
              />
            </div>
            {columnData.map((item, i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "1rem",
                    gap: "1rem",
                  }}
                  key={i}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <TextField
                      required
                      type="text"
                      label="Column Name"
                      value={item.columnName.value}
                      placeholder="username"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      focused={false}
                      onChange={(event) =>
                        setColumnNames(event.currentTarget.value, i)
                      }
                      name="columnName"
                      variant="outlined"
                      error={item.columnName.error}
                      onBlur={(event) =>
                        handleValidationColumnName(i, event.currentTarget.value)
                      }
                      helperText={
                        item.columnName.error ? "Column name is required" : ""
                      }
                    />
                    <TextField
                      required
                      type="text"
                      label="Column Type"
                      value={item.columnType.value}
                      placeholder="String"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      focused={false}
                      onChange={(event) =>
                        setColumnType(event.currentTarget.value, i)
                      }
                      name="columnType"
                      variant="outlined"
                      onBlur={(event) =>
                        handleValidationColumnType(i, event.currentTarget.value)
                      }
                      error={item.columnType.error}
                      helperText={
                        item.columnType.error ? "Column Type is required" : ""
                      }
                      //   Number and special characters not allowed
                    />
                    <Button
                      sx={{
                        backgroundColor: colors.redAccent[700],
                        color: colors.grey[100],
                        fontWeight: "bold",
                        padding: "16px",
                      }}
                      onClick={() => deleteColumnNamesAndType(i)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              );
            })}
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                marginLeft: "10px",
              }}
              onClick={addColumnNamesAndType}
            >
              <AddIcon sx={{ mr: "10px" }} />
              Add Column Names
            </Button>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "10px",
              }}
              variant="outlined"
              type="submit"
              onClick={(e) => {
                formSubmit(e);
              }}
            >
              Save
            </Button>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              variant="outlined"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}
