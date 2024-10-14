
import { Client, Databases} from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") 
  .setProject("670c98d4003ae582e8dd");     

export const databases = new Databases(client);

