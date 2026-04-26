import { envVars } from "../../config/constants";
import { DLTMessagePayload } from "./types";

export const sendDLTMessage = async function ({
  vars: variables_values,
  numbers
}: DLTMessagePayload) {
  try {
    const body = {
      sender_id: envVars.DLT_SENDER_ID,
      message: envVars.DLT_MESSAGE_ID,
      route: 'dlt',
      variables_values: variables_values,
      numbers: numbers
    };

    const response = await fetch(envVars.DLT_BASE_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: envVars.DLT_AUTHORIZATION_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    console.log(response)
  } catch (error) {
    console.error(error);
  }
}