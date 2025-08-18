import { axiosInstance } from ".";

//Get All Theatress
export const getAllTheatres = async () => {
  try {
    const response = await axiosInstance.get("api/theatres/get-all-theatres");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

//Get All Theatres by owner
export const getAllTheatresByOwner = async (ownerId) => {
  try {
    const response = await axiosInstance.get(
      `api/theatres/get-all-theatres/${ownerId}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Add a theatre
export const addTheatre = async (values) => {
  try {
    const response = await axiosInstance.post(
      "api/theatres/add-theatre",
      values
    );
    return response.data;    
  } catch (err) {
    console.error(err);
  }
};

//Update a theatre
export const updateTheatre = async (theatreId, payload) => {
  try {
    const response = await axiosInstance.put(
      `api/theatres/update-theatre/${theatreId}`,
      payload
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

//Delete a movie
export const deleteTheatre = async (theatreId) => {
  try {
    const response = await axiosInstance.delete(
      `api/theatres/delete-theatre/${theatreId}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
