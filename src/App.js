import { useMemo } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { MeetingContainer } from "./MeetingContainer";

const App = () => {
  const { meetingId, token, participantId } = useMemo(() => {
    const location = window.location;

    const urlParams = new URLSearchParams(location.search);

    const paramKeys = {
      meetingId: "meetingId",
      token: "token",
      participantId: "participantId",
    };

    Object.keys(paramKeys).forEach((key) => {
      paramKeys[key] = urlParams.get(key)
        ? decodeURIComponent(urlParams.get(key))
        : null;
    });

    return paramKeys;
  }, []);

  return meetingId && token && participantId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: false,
        webcamEnabled: false,
        name: "recorder",
        participantId,
      }}
      token={token}
      joinWithoutUserInteraction
    >
      <MeetingContainer />
    </MeetingProvider>
  ) : null;
};

export default App;
