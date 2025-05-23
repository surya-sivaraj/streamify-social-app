import {StreamChat} from 'stream-chat';
import "dotenv/config";

const apikey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;


if(!apikey || !apiSecret) {
  console.log("Please set the STREAM_API_KEY and STREAM_API_SECRET environment variables.");
}


const streamClient = StreamChat.getInstance(apikey, apiSecret);


export const upsertStreamUser = async (userdata) => {
    try {
        await streamClient.upsertUsers([userdata]);
        return userdata;

    } catch (error) {
        console.error("Error upserting user to Stream: ", error);
        
        
    }

}
// do it later
export const generateStreamToken = async (userId) => {
    try {
        //ensure  userId is string
            const userIdStr = userId.toString();
            return streamClient.createToken(userIdStr)

    } catch (error) {
        console.log("error generating Stream token",error);
        
        
    }
}