import { env } from "../../../config/envVars";
import { DLTMessagePayload } from "../../../shared/types/notification";

export const sendDLTMessage = async function({
  vars: variables_values,
  numbers,
}: DLTMessagePayload) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return;
    const body = {
      sender_id: env.DLT_SENDER_ID,
      message: env.DLT_MESSAGE_ID,
      route: "dlt",
      variables_values: variables_values,
      numbers: numbers,
    };

    const response = await fetch(env.DLT_BASE_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: env.DLT_AUTHORIZATION_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
