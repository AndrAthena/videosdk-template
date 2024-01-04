import { Constants, useMeeting } from "@videosdk.live/react-sdk";
import { ParticipantsAudioPlayer } from "./ParticipantsAudioPlayer";
import { ParticipantView } from "./ParticipantView";

export const MeetingContainer = () => {
  const { isMeetingJoined, participants } = useMeeting();

  const remoteSpeakers = [...participants.values()].filter((participant) => {
    return (
      participant.mode === Constants.modes.CONFERENCE && !participant.local
    );
  });

  return isMeetingJoined ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <ParticipantsAudioPlayer />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: remoteSpeakers?.length > 1 ? "1fr 1fr" : "1fr",
          flex: 1,
          maxHeight: `100vh`,
          overflowY: "auto",
          gap: "20px",
          padding: "20px",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        {[...remoteSpeakers].map((participant) => {
          return (
            <ParticipantView
              key={participant.id}
              participantId={participant.id}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div class="loader"></div>
    </div>
  );
};
