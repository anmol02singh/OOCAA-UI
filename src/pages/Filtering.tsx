// import React, { useState } from "react";
// import {
//     Box,
//     Typography,
//     TextField,
//     Button,
//     InputAdornment,
//     MenuItem,
//     Select,
//     SelectChangeEvent,
//     Slider,
//     IconButton,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//   } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// const Filtering: React.FC = () => {
//   const [searchBars, setSearchBars] = useState<number>(1);
//   const [searchTypes, setSearchTypes] = useState<string[]>(["Object Name"]);
//   const [tcaRange, setTcaRange] = useState<number[]>([0, 24]); 
//   const [cdms, setCdms] = useState<any[]>([
//     {
//       messageId: "1965_conj7_1492",
//       creationDate: "2024-11-14T22:48:30.077",
//       tca: "2024-11-20T04:14:40.000",
//       missDistance: 7882,
//       collisionProbability: 3.779e-8,
//     },
//     {
//       messageId: "1306_conj184_1803",
//       creationDate: "2024-11-16T13:41:30.972",
//       tca: "2024-11-20T18:54:31.000",
//       missDistance: 1832,
//       collisionProbability: 1.472e-20,
//     },
//   ]); 

//   const addSearchBar = () => {
//     if (searchBars < 2) {
//       setSearchBars(searchBars + 1);
//       setSearchTypes([...searchTypes, "Object Name"]);
//     }
//   };

//   const handleSearchTypeChange = (index: number, value: string) => {
//     const updatedTypes = [...searchTypes];
//     updatedTypes[index] = value;
//     setSearchTypes(updatedTypes);
//   };

//   const handleSliderChange = (event: Event, newValue: number | number[]) => {
//     setTcaRange(newValue as number[]);
//   };

//   return (
//     <Box
//       sx={{
//         bgcolor: "#1E1E1E",
//         height: "700vh",
//         width: "90.3vw",
//         padding: "20px",
//         overflow: "hidden",
//       }}
//     >
//       <Box sx={{ p: 6 }}>
//         {/* Header */}
//         <Box mb={4}>
//           <Typography
//             variant="body2"
//             sx={{
//               color: "#B0B0B0",
//               fontFamily: "Arial, sans-serif",
//             }}
//           >
//             62,998 searchable objects
//           </Typography>
//           <Typography
//             variant="h4"
//             sx={{
//               color: "#e6e6e6",
//               mt: 2,
//             }}
//           >
//             OOCAA - On Orbit Collision Avoidance Assistant
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{
//               color: "#B0B0B0",
//               mt: 3,
//             }}
//           >
//             OOCAA helps prevent satellite collisions by organizing Conjunction
//             Data Messages (CDMs) into clear, easy-to-read formats. With advanced
//             search and filtering tools, users can quickly explore and analyze
//             data. Developed with the Canadian Space Agency, OOCAA promotes
//             safer and more informed spaceflight.
//           </Typography>
//           <Typography 
//             variant="body1" 
//             sx={{ 
//                 color: "#B0B0B0", 
//                 mt: 3,
//                 fontFamily: "Arial, sans-serif"
//             }}
//             >  
//           Simply filter by object type, object name or object designator to visualize all of its
//           corresponding CDM data. Add a second search bar to filter all available CDMs between the two
//           specified objects. Adjust the slider to visualize all CDMs within a specified TCA (time of closest approach) range.
//           </Typography>
//         </Box>

//         {/* Search Bars */}
//         {[...Array(searchBars)].map((_, index) => (
//           <Box key={index} sx={{ mb: 2 }}>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: "#B0B0B0",
//                 mb: 1,
//               }}
//             >
//               {index === 0 ? "Object 1" : "Object 2"}
//             </Typography>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//                 bgcolor: "#2A2A2A",
//                 p: 1.5,
//                 borderRadius: "5px",
//               }}
//             >
//               <Select
//                 value={searchTypes[index]}
//                 onChange={(event: SelectChangeEvent) =>
//                   handleSearchTypeChange(index, event.target.value)
//                 }
//                 sx={{
//                   color: "#b0b0b0",
//                   bgcolor: "#3A3A3A",
//                   ".MuiSelect-icon": { color: "#b0b0b0" },
//                   borderRadius: "5px",
//                   minWidth: "fit-content",
//                 }}
//                 MenuProps={{
//                   PaperProps: {
//                     sx: {
//                       bgcolor: "#2A2A2A",
//                       color: "#B0B0B0",
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem value="Object Name">Object Name</MenuItem>
//                 <MenuItem value="Object Type">Object Type</MenuItem>
//                 <MenuItem value="Object Designator">Object Designator</MenuItem>
//               </Select>
//               <TextField
//                 placeholder={`Search for ${index === 0 ? "Object 1" : "Object 2"}`}
//                 variant="outlined"
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon sx={{ color: "#B0B0B0" }} />
//                     </InputAdornment>
//                   ),
//                   sx: {
//                     bgcolor: "#3A3A3A",
//                     borderRadius: "8px",
//                     color: "#FFFFFF",
//                   },
//                 }}
//                 sx={{
//                   flexGrow: 1,
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 sx={{
//                   bgcolor: "#2979FF",
//                   color: "#FFFFFF",
//                   "&:hover": { bgcolor: "#1E63D9" },
//                   textTransform: "none",
//                   borderRadius: "8px",
//                   width: "7rem",
//                 }}
//               >
//                 Search
//               </Button>
//             </Box>
//           </Box>
//         ))}

//         {/* TCA Slider */}
//         <Box sx={{ mt: searchBars === 1 ? 4 : 6, px: 1, }}>
//           <Typography
//             sx={{
//               color: "#B0B0B0",
//               mb: 1,
//               fontSize: "1.1rem",
//             }}
//           >
//             Filter by TCA
//           </Typography>
//           <Slider
//             value={tcaRange}
//             onChange={handleSliderChange}
//             valueLabelDisplay="auto"
//             min={0}
//             max={24}
//             sx={{
//               color: "#2979FF",
//             }}
//           />
//           <Typography
//             variant="body2"
//             sx={{
//               color: "#B0B0B0",
//               mt: 1,
//             }}
//           >
//             Range: {tcaRange[0]} - {tcaRange[1]} hours
//           </Typography>
//         </Box>

//         {/* Add Button */}
//         {searchBars < 2 && (
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
//             <IconButton
//               onClick={addSearchBar}
//               sx={{
//                 color: "#2979FF",
//                 "&:hover": { color: "#1E63D9" },
//               }}
//             >
//               <AddCircleOutlineIcon fontSize="large" />
//             </IconButton>
//           </Box>
//         )}

//         {/* CDM Table */}
//         <Box sx={{ mt: 3 }}>
//           <Typography
//             variant="h6"
//             sx={{
//               color: "#B0B0B0",
//               mb: 2,
//             }}
//           >
//             CDMs
//           </Typography>
//           <TableContainer component={Paper} sx={{ bgcolor: "#2A2A2A" }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ color: "#B0B0B0" }}>Message ID</TableCell>
//                   <TableCell sx={{ color: "#B0B0B0" }}>Creation Date</TableCell>
//                   <TableCell sx={{ color: "#B0B0B0" }}>TCA</TableCell>
//                   <TableCell sx={{ color: "#B0B0B0" }}>Miss Distance</TableCell>
//                   <TableCell sx={{ color: "#B0B0B0" }}>Collision Probability</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {cdms.map((cdm, index) => (
//                   <TableRow key={index}>
//                     <TableCell sx={{ color: "#B0B0B0" }}>{cdm.messageId}</TableCell>
//                     <TableCell sx={{ color: "#B0B0B0" }}>{cdm.creationDate}</TableCell>
//                     <TableCell sx={{ color: "#B0B0B0" }}>{cdm.tca}</TableCell>
//                     <TableCell sx={{ color: "#B0B0B0" }}>{cdm.missDistance}</TableCell>
//                     <TableCell sx={{ color: "#B0B0B0" }}>{cdm.collisionProbability}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Filtering;
import React, { useState } from "react";
import { Box, IconButton, Typography,  } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SearchBar from "../components/searchBar.tsx"
import TcaSlider from "../components/TCASlider.tsx";
import CdmTable from "../components/CDMTable.tsx";
import CesiumViewer from "../components/CesiumViewer.tsx";

const Filtering: React.FC = () => {
  const [searchBars, setSearchBars] = useState<number>(1);
  const [searchTypes, setSearchTypes] = useState<string[]>(["Object Name"]);
  const [tcaRange, setTcaRange] = useState<number[]>([0, 24]);
  const [cdms, setCdms] = useState<any[]>([
    {
      messageId: "1965_conj7_1492",
      creationDate: "2024-11-14T22:48:30.077",
      tca: "2024-11-20T04:14:40.000",
      missDistance: 7882,
      collisionProbability: 3.779e-8,
    },
    {
      messageId: "1306_conj184_1803",
      creationDate: "2024-11-16T13:41:30.972",
      tca: "2024-11-20T18:54:31.000",
      missDistance: 1832,
      collisionProbability: 1.472e-20,
    },
  ]);

  const addSearchBar = () => {
    if (searchBars < 2) {
      setSearchBars(searchBars + 1);
      setSearchTypes([...searchTypes, "Object Name"]);
    }
  };

  const removeSearchBar = () => {
    if (searchBars > 1) {
      setSearchBars(searchBars - 1);
      setSearchTypes(searchTypes.slice(0, -1)); // Remove the last search type
    }
  };

  const handleSearchTypeChange = (index: number, value: string) => {
    const updatedTypes = [...searchTypes];
    updatedTypes[index] = value;
    setSearchTypes(updatedTypes);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setTcaRange(newValue as number[]);
  };

  return (
    <Box
      sx={{
        bgcolor: "#1E1E1E",
        height: "700vh",
        width: "93vw",
        overflow: "hidden",
      }}
    >
        <Box sx={{ p: 6 }}>
         {/* Header */}
         <Box mb={4}>
           <Typography
            variant="body2"
            sx={{
              color: "#B0B0B0",
              fontFamily: "Arial, sans-serif",
            }}
          >
            62,998 searchable objects
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#e6e6e6",
              mt: 2,
            }}
          >
            OOCAA - On Orbit Collision Avoidance Assistant
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#B0B0B0",
              mt: 3,
            }}
          >
            OOCAA helps prevent satellite collisions by organizing Conjunction
            Data Messages (CDMs) into clear, easy-to-read formats. With advanced
            search and filtering tools, users can quickly explore and analyze
            data. Developed with the Canadian Space Agency, OOCAA promotes
            safer and more informed spaceflight.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
                color: "#B0B0B0", 
                mt: 3,
                fontFamily: "Arial, sans-serif"
            }}
            >  
          Simply filter by object type, object name or object designator to visualize all of its
          corresponding CDM data. Add a second search bar to filter all available CDMs between the two
          specified objects. Adjust the slider to visualize all CDMs within a specified TCA (time of closest approach) range.
          </Typography>
        </Box>
      <Box>
        {[...Array(searchBars)].map((_, index) => (
          <SearchBar
            key={index}
            label={`Object ${index + 1}`}
            searchType={searchTypes[index]}
            onSearchTypeChange={(value) =>
              handleSearchTypeChange(index, value)
            }
            placeholder={`Search for Object ${index + 1}`}
          />
        ))}

        <TcaSlider tcaRange={tcaRange} onSliderChange={handleSliderChange} />

        {/* Add/Remove Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 1,
            gap: 2,
          }}
        >
          {searchBars < 2 && (
            <IconButton
              onClick={addSearchBar}
              sx={{
                color: "#2979FF",
                "&:hover": { color: "#1E63D9" },
              }}
            >
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
          )}

          {searchBars > 1 && (
            <IconButton
              onClick={removeSearchBar}
              sx={{
                color: "#2979FF",
                "&:hover": { color: "#1E63D9" },
              }}
            >
              <RemoveCircleOutlineIcon fontSize="large" />
            </IconButton>
          )}
        </Box>

        <CdmTable cdms={cdms} />
        
        {/* Cesium Viewer */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#B0B0B0",
              mb: 2,
            }}
          >
            Orbital Visualization
          </Typography>
          <CesiumViewer />
      </Box>
    </Box>
    </Box>
    </Box>
  );
};

export default Filtering;
