// import { gql, useLazyQuery } from "@apollo/client";
// import { Button, Grid, TextField, Typography, InputAdornment } from "@mui/material"; // Import InputAdornment
// import Autocomplete from "@mui/material/Autocomplete";
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import FlashMessage from "../../FlashMessage";
// import { useLocationContext } from "../../../context/Location";
// import { useLocation } from "../../../hooks";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { SyncLoader } from "react-spinners"; // Import SyncLoader
// import LocationIcon from "@mui/icons-material/LocationOn"; // Import LocationIcon
// import LocationOnIcon from "@mui/icons-material/LocationOn"; // Import LocationOnIcon
// import { parse } from 'parse'; // Import parse

// // Define your GraphQL query here or import it from another file
// const autocompleteService = { current: null };
// const RESTAURANTS = gql`
  
// `;

// // Implement throttle function
// const throttle = (func, delay) => {
//   let timeout;
//   return function (...args) {
//     const context = this;
//     if (!timeout) {
//       timeout = setTimeout(() => {
//         timeout = null;
//         func.apply(context, args);
//       }, delay);
//     }
//   };
// };

// function SearchContainer({ isHome, search: searchProp, setSearch: setSearchProp }) {
//   const { t } = useTranslation();
//   const [inputValue, setInputValue] = useState("");
//   const [options, setOptions] = useState([]);
//   const { getCurrentLocation } = useLocation();
//   const [open] = useState(false);
//   const { location, setLocation } = useLocationContext();
//   const [search, setSearch] = useState("");
//   const navigateTo = useNavigate();
//   const [alertError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const fetchRef = useRef(false);
//   const [value, setValue] = useState(null);

//   const [fetchRestaurants] = useLazyQuery(RESTAURANTS, {
//     fetchPolicy: "network-only",
//   });

//   // const fetch = useCallback(
//   //   throttle((request, callback) => {
//   //     if (autocompleteService.current) {
//   //       autocompleteService.current.getPlacePredictions(request, callback);
//   //     }
//   //   }, 200),
//   //   []
//   // );

//   // const locationCallback = useCallback((error, data) => {
//   //   setLoading(false);
//   //   if (error) {
//   //     setAlertError(error);
//   //     setOpen(true);
//   //     return;
//   //   }
//   //   setSearch(data.deliveryAddress);
//   //   setLocation(data);
//   // }, [setLocation]);
  
  
  

//   useEffect(() => {
//     if (!autocompleteService.current && window.google) {
//       autocompleteService.current =
//         new window.google.maps.places.AutocompleteService();
//     }
//   }, []);

//   useEffect(() => {
//     let active = true;

//     if (!autocompleteService.current) {
//       return;
//     }

//     if (inputValue === "") {
//       setOptions(value ? [value] : []);
//       return;
//     }

//     fetch({ input: inputValue }, (results) => {
//       if (active) {
//         let newOptions = [];
//         if (value) {
//           newOptions = [value];
//         }
//         if (results) {
//           newOptions = [...newOptions, ...results];
//         }
//         setOptions(newOptions);
//       }
//     });

//     return () => {
//       active = false;
//     };
//   }, [inputValue, value, fetch]);

//   useEffect(() => {
//     if (!location) return;
//     if (fetchRef.current) return;
//     const variables = {
//       longitude: parseFloat(location.longitude) || null,
//       latitude: parseFloat(location.latitude) || null,
//     };
//     fetchRestaurants({ variables });
//     fetchRef.current = true;
//   }, [location, fetchRestaurants]);

//   // const handleLocationButtonClick = () => {
//   //   setLoading(true);
//   //   getCurrentLocation(locationCallback);
//   // };

//   return (
//     <div style={{ position: "relative", width: "100%" }}>
//       <Grid container>
//         <FlashMessage
//           severity={loading ? "info" : "error"}
//           alertMessage={alertError}
//           open={open}
//           // handleClose={handleClose}
//         />
//         <Grid item xs={12}>
//           <Grid container item xs={12}>
//             <Grid item xs={12} sm={isHome ? 9 : 12}>
//               {isHome ? (
//                 <Autocomplete
//                   id="google-map-demo"
//                   getOptionLabel={(option) =>
//                     typeof option === "string" ? option : option.description
//                   }
//                   filterOptions={(x) => x}
//                   options={options}
//                   autoComplete
//                   includeInputInList
//                   filterSelectedOptions
//                   value={
//                     loading
//                       ? "Loading ..."
//                       : search
//                       ? search
//                       : location
//                       ? location.deliveryAddress
//                       : ""
//                   }
//                   onChange={(event, newValue) => {
//                     if (newValue) {
//                       const b = new window.google.maps.Geocoder();
//                       b.geocode({ placeId: newValue.place_id }, (res) => {
//                         const location = res[0].geometry.location;
//                         setLocation({
//                           label: "Home",
//                           deliveryAddress: newValue.description,
//                           latitude: location.lat(),
//                           longitude: location.lng(),
//                         });
//                       });
//                     } else {
//                       setSearch("");
//                     }
//                     setOptions(newValue ? [...options] : options);
//                     setValue(newValue);
//                   }}
//                   onInputChange={(event, newInputValue) => {
//                     setInputValue(newInputValue);
//                   }}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       variant="outlined"
//                       placeholder="Enter your full address"
//                       fullWidth
//                       InputProps={{
//                         ...params.InputProps,
//                         endAdornment: (
//                           <>
//                             {params.InputProps.endAdornment}
//                             <InputAdornment
//                               position="end"
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 setValue(search?.deliveryAddress ?? "");
//                                 setSearch(location?.deliveryAddress ?? "");
//                               }}
//                             >
//                               {loading ? (
//                                 <SyncLoader
//                                   size={5}
//                                   speedMultiplier={0.7}
//                                   margin={1}
//                                 />
//                               ) : (
//                                 <LocationIcon
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     setLoading(true);
//                                     getCurrentLocation();
//                                   }}
//                                 />
//                               )}
//                             </InputAdornment>
//                           </>
//                         ),
//                       }}
//                     />
//                   )}
//                   renderOption={(props, option) => {
//                     const matches =
//                       option.structured_formatting
//                         ?.main_text_matched_substrings;
//                     let parts = null;
//                     if (matches) {
//                       parts = parse(
//                         option.structured_formatting.main_text,
//                         matches.map((match) => [
//                           match.offset,
//                           match.offset + match.length,
//                         ])
//                       );
//                     }
//                     return (
//                       <Grid {...props} container alignItems="center">
//                         <Grid item>
//                           <LocationOnIcon />
//                         </Grid>
//                         <Grid item xs>
//                           {parts &&
//                             parts.map((part, index) => (
//                               <span
//                                 key={index}
//                                 style={{
//                                   fontWeight: part.highlight ? 700 : 400,
//                                   color: "black",
//                                 }}
//                               >
//                                 {part.text}
//                               </span>
//                             ))}
//                           <Typography variant="body2" color="textSecondary">
//                             {option.structured_formatting?.secondary_text}
//                           </Typography>
//                         </Grid>
//                       </Grid>
//                     );
//                   }}
//                 />
//               ) : (
//                 <Grid>
//                   <Grid>
//                     {/* Uncomment to use SearchRestaurant component */}
//                     {/* <SearchRestaurant
//                       search={searchProp}
//                       setSearch={setSearchProp}
//                     /> */}
//                   </Grid>
//                 </Grid>
//               )}
//             </Grid>
//             {isHome ? (
//               <Grid
//                 item
//                 xs={12}
//                 sm={3}
//                 style={{ paddingLeft: "10px", textAlign: "center" }}
//               >
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   disableElevation
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (location) {
//                       navigateTo("/restaurant-list");
//                     }
//                   }}
//                 >
//                   {t("findRestaurants")}
//                 </Button>
//               </Grid>
//             ) : null}
//           </Grid>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default React.memo(SearchContainer);
