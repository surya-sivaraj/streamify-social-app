import { axiosInstance } from "./axios";

export const signup = async (signupData)=>{
     const response = await axiosInstance.post("/auth/signup",signupData);
 return response.data
}
export const logout = async ()=>{
     const response = await axiosInstance.post("/auth/logout");
 return response.data
}



export const getAuthUser = async ()=>{
  try {
        const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:",error);
    return null
    
    
  }
}

export const completeOnboarding = async (userData)=>{
     const response = await axiosInstance.post("/auth/onboarding",userData);
 return response.data
}

export const login = async (loginData)=>{
     const response = await axiosInstance.post("/auth/login",loginData);
 return response.data
}


export const getUserFriends = async ()=>{
     const response = await axiosInstance.get("/users/friends");
 return response.data
}


export const getRecommendedUsers = async ()=>{
     const response = await axiosInstance.get("/users");
 return response.data
}

export const  getOutgoingFriendReq = async ()=>{
     const response = await axiosInstance.get("/users/outgoing-friend-requests");
 return response.data
}


export const sendFriendRequest = async (userId) => {
  try {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
} catch (error) {
  if (error.response) {
    console.error("Backend error response:", error.response.data);
  } else {
    console.error("Request error:", error.message);
  }
  throw error;
}
}


export const  getFriendRequests = async ()=>{
     const response = await axiosInstance.get("/users/friend-requests");
 return response.data
}


export const acceptFriendRequests =async (requestId)=>{
     const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
 return response.data
}


export const getStreamToken = async () => {
  const response = await axiosInstance.get("/chat/token");
  console.log("Stream Token Response:", response.data); // DEBUG LOG
  return response.data; // Make sure it’s { token: 'string' }
};

