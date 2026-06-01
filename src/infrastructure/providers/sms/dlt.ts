import { env } from "../../../config/envVars";
import { DLTMessagePayload } from "../../../shared/types/notification";

type SendDLTMessageType = (payload: DLTMessagePayload) => Promise<{ success: boolean; error?: any }>;

export const sendDLTMessage: SendDLTMessageType = async function ({
  vars: variables_values,
  numbers,
}: DLTMessagePayload) {
  try {
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

    if (![200, 201].includes(response.status)) return { success: false };
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
